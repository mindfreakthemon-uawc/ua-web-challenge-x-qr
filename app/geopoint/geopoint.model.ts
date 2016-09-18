export const EARTH_RADIUS = 6371e3;

export interface Point {
	lat: number;

	lng: number;
}

export class GeoPoint implements Point {
	public id: number;

	public name: string;

	public lat: number;

	public lng: number;

	/**
	 * Returns distance in meters.
	 */
	distanceTo(gp: Point): number {
		let lng1 = GeoPoint.toRadians(this.lng);
		let lng2 = GeoPoint.toRadians(gp.lng);
		let dLat = GeoPoint.toRadians(gp.lat - this.lat);
		let dLng = GeoPoint.toRadians(gp.lng - this.lng);

		let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lng1) * Math.cos(lng2) *
			Math.sin(dLng / 2) * Math.sin(dLng / 2);

		let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return EARTH_RADIUS * c;
	}

	toJSON(): any {
		let names = Object.getOwnPropertyNames(this);
		let data = {};

		names.forEach((name) => data[name] = this[name]);

		return data;
	}

	static toRadians(deg: number): number {
		return deg * Math.PI / 180;
	}
}
