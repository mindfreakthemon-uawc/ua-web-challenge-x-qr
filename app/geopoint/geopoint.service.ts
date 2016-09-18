import { GeoPoint } from './geopoint.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class GeoPointService {
	update = new EventEmitter<GeoPoint[]>();

	cache: GeoPoint[];

	constructor(public http: Http) {
	}

	getAll() {
		if (this.cache) {
			return Promise.resolve(this.cache);
		}

		return this.http.get('/build/statics/json/geopoint.json')
			.toPromise()
			.then((response) => response.json())
			.then((array) => {
				return this.cache = array.map((data) => {
					let geoPoint = new GeoPoint();

					Object.assign(geoPoint, data);

					return geoPoint;
				});
			});
	}

	triggerUpdate(geoPoints: GeoPoint[]) {
		this.update.emit(this.cache = geoPoints);
	}
}
