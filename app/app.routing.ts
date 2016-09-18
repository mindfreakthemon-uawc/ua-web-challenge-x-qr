import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeoPointAdminComponent } from './geopoint/geopoint.admin.component';
import { MainComponent } from './main/main.component';
import { ConnectionAdminComponent } from './connection/connection.admin.component';
import { ConnectionAddComponent } from './connection/connection.add.component';
import { GeoPointAddComponent } from './geopoint/geopoint.add.component';

const appRoutes: Routes = [
	{ path: 'admin/connection', component: ConnectionAdminComponent },
	{ path: 'admin/connection/add', component: ConnectionAddComponent },
	{ path: 'admin/geo-point', component: GeoPointAdminComponent },
	{ path: 'admin/geo-point/add', component: GeoPointAddComponent },
	{ path: '', component: MainComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
	useHash: true
});
