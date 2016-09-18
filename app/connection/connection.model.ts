export class Connection {
	public id: number;

	public geoPointId: number;

	public connections: number[] = [];

	toJSON(): any {
		let names = Object.getOwnPropertyNames(this);
		let data = {};

		names.forEach((name) => data[name] = this[name]);

		return data;
	}
}
