import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearcherService } from './search/searcher.service';
import { GeoPointService } from './geopoint/geopoint.service';
import { ConnectionService } from './connection/connection.service';
import { routing, appRoutingProviders } from './app.routing';
import 'google-maps';
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
		AppComponent
	],

	bootstrap: [
		AppComponent
	]
})
export class AppModule {
}
