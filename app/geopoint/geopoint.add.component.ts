import { Component, ViewChild } from '@angular/core';
import { GeoPoint } from './geopoint.model';
import { MapComponent } from '../maps/map.component';
import { GeoPointService } from './geopoint.service';

@Component({
	selector: 'geo-point-add',
	templateUrl: 'build/templates/geopoint/geopoint.add.html',
	directives: [MapComponent]
})
export class GeoPointAddComponent {
	model = new GeoPoint();

	geoPoints: GeoPoint[];

	@ViewChild(MapComponent) map;

	constructor(public geoPointService: GeoPointService) {
		this.geoPointService.getAll()
			.then((geoPoints) => this.geoPoints = geoPoints);
	}

	updateGeoPointCoordinates(e: google.maps.MouseEvent) {
		this.model.lat = e.latLng.lat();
		this.model.lng = e.latLng.lng();

		this.map.drawMarkers(this.model, null);
	}

	onSubmit() {
		this.model.id = Math.floor(Math.random() * 1000000);

		this.geoPoints.push(this.model);
		this.geoPointService.triggerUpdate(this.geoPoints);

		this.model = new GeoPoint();
	}
}

