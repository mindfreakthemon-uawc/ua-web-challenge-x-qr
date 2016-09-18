import { Component } from '@angular/core';
import { NgModel } from '@angular/common';
import { Connection } from './connection.model';
import { ConnectionService } from './connection.service';
import { GeoPointService } from '../geopoint/geopoint.service';
import { GeoPoint } from '../geopoint/geopoint.model';
import { ConnectionAddComponent } from './connection.add.component';
import { download } from '../utils/download.util';

@Component({
	selector: 'connection-admin',
	templateUrl: 'build/templates/connection/connection.admin.html'
})
export class ConnectionAdminComponent {
	connections: Connection[];
	geoPoints: GeoPoint[];

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

	deleteConnection(connection: Connection) {
		let index = this.connections.findIndex((_connection) => _connection.id == connection.id);

		this.connections.splice(index, 1);
		this.connectionService.triggerUpdate();
	}

	/**
	 * Removed GeoPoint id from connection sink.
	 * @param connection
	 * @param id
	 */
	deleteGeoPointFrom(connection: Connection, id: number) {
		let index = connection.connections.indexOf(id);

		connection.connections.splice(index, 1);
	}

	/**
	 * Adds GeoPoint id to connection sink
	 * @param connection
	 * @param ngModel
	 */
	addGeoPointTo(connection: Connection, ngModel: NgModel) {
		let geoPoint = ngModel.value as GeoPoint;

		connection.connections.push(geoPoint.id);
	}

	findGeoPoint(id: number): GeoPoint {
		return this.geoPoints.find((geoPoint) => geoPoint.id === id);
	}

	/**
	 * Method lets easily update json files.
	 */
	exportArray() {
		let jsonArray = this.connections.map((connection) => connection.toJSON());
		let text = JSON.stringify(jsonArray, null, '\t');

		download(text, 'connection.json', 'text/json');
	}
}

