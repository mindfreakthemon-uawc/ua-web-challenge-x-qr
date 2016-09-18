import { Connection } from './connection.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ConnectionService {
	update = new EventEmitter<Connection[]>();

	cache: Connection[];

	constructor(public http: Http) {
	}

	getAll() {
		if (this.cache) {
			return Promise.resolve(this.cache);
		}

		return this.http.get('/build/statics/json/connection.json')
			.toPromise()
			.then((response) => response.json())
			.then((array) => {
				return this.cache = array.map((data) => {
					let connection = new Connection();

					Object.assign(connection, data);

					return connection;
				});
			});
	}

	triggerUpdate() {
		this.update.emit();
	}
}
