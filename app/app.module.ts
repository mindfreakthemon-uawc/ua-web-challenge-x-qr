import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { SearcherService } from './search/searcher.service';
import { GeoPointService } from './geopoint/geopoint.service';
import { ConnectionService } from './connection/connection.service';

import { AppComponent } from './app.component';
import { ConnectionAdminComponent } from './connection/connection.admin.component';
import { ConnectionAddComponent } from './connection/connection.add.component';
import { GeoPointAdminComponent } from './geopoint/geopoint.admin.component';
import { GeoPointAddComponent } from './geopoint/geopoint.add.component';
import { MainComponent } from './main/main.component';
import { MapComponent } from './maps/map.component';

import { routing, appRoutingProviders } from './app.routing';

import 'rxjs/add/operator/toPromise';

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing
	],

	providers: [
		SearcherService,
		GeoPointService,
		ConnectionService,
		appRoutingProviders
	],

	declarations: [
		AppComponent,
		ConnectionAdminComponent,
		ConnectionAddComponent,
		GeoPointAdminComponent,
		GeoPointAddComponent,
		MainComponent,
		MapComponent
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
