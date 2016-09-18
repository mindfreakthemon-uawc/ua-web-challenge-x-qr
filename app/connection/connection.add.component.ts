import { Component } from '@angular/core';
import { MapComponent } from '../maps/map.component';
import { Connection } from './connection.model';
import { GeoPoint } from '../geopoint/geopoint.model';
import { GeoPointService } from '../geopoint/geopoint.service';
import { ConnectionService } from './connection.service';

@Component({
	selector: 'connection-add',
	templateUrl: 'build/templates/connection/connection.add.html',
	directives: [MapComponent]
})
export class ConnectionAddComponent {
	model = new Connection();

	geoPoints: GeoPoint[];
	connections: Connection[];

	constructor(public connectionService: ConnectionService,
	            public geoPointService: GeoPointService) {
		let geoPointPromise = this.geoPointService.getAll();
		let connectionPromise = this.connectionService.getAll();

		Promise.all([geoPointPromise, connectionPromise])
			.then((results) => {
				this.geoPoints = results[0];
				this.connections = results[1];
			});
	}

	onSubmit() {
		this.model.id = Math.floor(Math.random() * 1000000);

		this.connections.push(this.model);
		this.connectionService.triggerUpdate();

		this.model = new Connection();
	}

	isExistingConnection(geoPointId: number): boolean {
		return this.connections.find((connection) => connection.geoPointId === geoPointId) !== undefined;
	}
}

