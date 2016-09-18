import { Component, ViewChild } from '@angular/core';
import { MapComponent } from '../maps/map.component';
import { GeoPoint } from '../geopoint/geopoint.model';
import { Connection } from '../connection/connection.model';
import { SearcherService } from '../search/searcher.service';
import { GeoPointService } from '../geopoint/geopoint.service';
import { ConnectionService } from '../connection/connection.service';
import { createMatrix } from '../utils/creators.util';

@Component({
	selector: 'main-component',
	templateUrl: 'build/templates/main/main.html',
	directives: [MapComponent]
})
export class MainComponent {
	@ViewChild(MapComponent) map;

	point = 'A';

	impossible: boolean = false;
	path: GeoPoint[];
	geoPoints: GeoPoint[];
	connections: Connection[];

	geoPointA: GeoPoint;
	geoPointB: GeoPoint;

	matrix: number[][];

	constructor(public searcherService: SearcherService,
	            public geoPointService: GeoPointService,
	            public connectionService: ConnectionService) {
	}

	ngAfterViewInit() {
		let geoPointPromise = this.geoPointService.getAll();
		let connectionPromise = this.connectionService.getAll();

		Promise.all([geoPointPromise, connectionPromise])
			.then((results) => {
				this.geoPoints = results[0];
				this.connections = results[1];

				this.computeMatrix();
				this.map.drawDebugMarkers(this.geoPoints);
				// this.map.drawDebugRoutes(this.geoPoints, this.matrix);
			});
	}

	onClick(e: google.maps.MouseEvent) {
		let point = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng()
		};

		let minGeoPoint: GeoPoint = null;
		let excludedGeoPoint: GeoPoint = null;
		let minValue = Number.POSITIVE_INFINITY;

		if (this.point === 'A') {
			excludedGeoPoint = this.geoPointB;
		} else {
			excludedGeoPoint = this.geoPointA;
		}

		this.geoPoints
			.forEach((geoPoint) => {
				if (excludedGeoPoint && geoPoint.id == excludedGeoPoint.id) {
					return;
				}

				let distance = geoPoint.distanceTo(point);

				if (minValue > distance) {
					minValue = distance;
					minGeoPoint = geoPoint;
				}
			});

		if (this.point === 'A') {
			this.geoPointA = minGeoPoint;
		} else {
			this.geoPointB = minGeoPoint;
		}

		this.redraw();
	}

	onGeoPointChange() {
		this.redraw();
	}

	searchRoutes() {
		this.redraw();

		let fromIndex = this.geoPoints.findIndex((geoPoint) => geoPoint.id === this.geoPointA.id);
		let toIndex = this.geoPoints.findIndex((geoPoint) => geoPoint.id === this.geoPointB.id);

		let searchResult = this.searcherService.search(this.matrix, fromIndex);

		let path = searchResult.getPath(toIndex);

		if (path) {
			this.path = path.map((i) => this.geoPoints[i]);
			this.map.drawRoutes(this.path);
		} else {
			this.impossible = true;
		}
	}

	computeMatrix() {
		let geoPoints = this.geoPoints;
		let connections = this.connections;

		this.matrix = createMatrix(geoPoints.length, (i, j) => {
			if (i === j) {
				return 0;
			}

			let geoPointA = geoPoints[i];
			let geoPointB = geoPoints[j];

			let connection = connections.find((connection) => connection.geoPointId === geoPointA.id);

			if (connection && connection.connections.includes(geoPointB.id)) {
				return geoPoints[i].distanceTo(geoPoints[j]);
			}

			return Number.POSITIVE_INFINITY;
		});
	}

	redraw() {
		this.impossible = false;
		this.path = null;
		this.map.cleanRoutes();
		this.map.drawMarkers(this.geoPointA, this.geoPointB);
	}
}
