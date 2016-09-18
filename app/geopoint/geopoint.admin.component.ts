import { Component, Output, EventEmitter } from '@angular/core';
import { GeoPoint } from './geopoint.model';
import { MapComponent } from '../maps/map.component';
import { GeoPointAddComponent } from './geopoint.add.component';
import { GeoPointService } from './geopoint.service';
import { download } from '../utils/download.util';

@Component({
	selector: 'geo-point-admin',
	templateUrl: 'build/templates/geopoint/geopoint.admin.html'
})
export class GeoPointAdminComponent {
	@Output()
	update = new EventEmitter();

	geoPoints: GeoPoint[];

	constructor(public geoPointService: GeoPointService) {
		geoPointService.getAll()
			.then((geoPoints) => this.geoPoints = geoPoints);
	}

	deleteGeoPoint(geoPoint: GeoPoint) {
		let index = this.geoPoints.findIndex((_geoPoint) => _geoPoint.id == geoPoint.id);

		this.geoPoints.splice(index, 1);
		this.update.emit();
	}

	/**
	 * Method lets easily update json files.
	 */
	exportArray(): void {
		let jsonArray = this.geoPoints.map((geoPoint) => geoPoint.toJSON());
		let text = JSON.stringify(jsonArray, null, '\t');

		download(text, 'geopoint.json', 'text/json');
	}
}

