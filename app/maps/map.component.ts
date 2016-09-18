import { Directive, ElementRef, Output, EventEmitter, Input, NgZone } from '@angular/core';
import 'google-maps';

@Directive({
	selector: 'map'
})
export class MapComponent {
	map: google.maps.Map;

	@Output()
	select = new EventEmitter();

	@Input()
	zoom = 14;

	routes: google.maps.Polyline[] = [];

	// for debug only
	lines: google.maps.Polyline[] = [];
	debugMarkers: google.maps.Marker[] = [];

	markerA: google.maps.Marker;
	markerB: google.maps.Marker;

	constructor(public elementRef: ElementRef,
	            public zone: NgZone) {
	}

	ngAfterViewInit() {
		let center = new google.maps.LatLng(50.44241983384863, 30.514183044433594);

		this.map = new google.maps.Map(this.elementRef.nativeElement, {
			center,
			zoom: this.zoom,
			clickableIcons: false
		});

		google.maps.event.addListener(this.map, 'click', (e) => this.zone.run(() => this.select.emit(e)));
	}


	cleanRoutes() {
		this.routes.forEach((polyLine) => polyLine.setMap(null));
		this.routes = [];
	}

	drawRoutes(path: google.maps.LatLngLiteral[]) {
		let polyLine = new google.maps.Polyline({
			path: path,
			geodesic: true,
			strokeColor: '#FF0000',
			strokeOpacity: 1,
			strokeWeight: 2,
			map: this.map
		});

		this.routes.push(polyLine);
	}

	drawDebugRoutes(points: google.maps.LatLngLiteral[], matrix: number[][]) {
		matrix.forEach((row, i) => {
			row.forEach((distance, j) => {
				if (i === j || !Number.isFinite(distance)) {
					return;
				}

				let polyLine = new google.maps.Polyline({
					path: [
						points[i],
						points[j]
					],
					icons: [{
						icon: {
							path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
						}
					}],
					geodesic: true,
					strokeColor: '#0000FF',
					strokeOpacity: 0.8,
					strokeWeight: 2,
					map: this.map
				});

				this.lines.push(polyLine);
			});
		});
	}

	drawDebugMarkers(points: google.maps.LatLngLiteral[]) {
		points.forEach((point) => {
			let marker = new google.maps.Marker({
				position: point,
				map: this.map,
				clickable: false,
				icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
			});

			this.debugMarkers.push(marker);
		});
	}

	drawMarkers(pointA: google.maps.LatLngLiteral, pointB: google.maps.LatLngLiteral) {
		if (this.markerA) {
			this.markerA.setMap(null);
		}

		if (this.markerB) {
			this.markerB.setMap(null);
		}

		if (pointA) {
			this.markerA = new google.maps.Marker({
				position: pointA,
				map: this.map,
				label: 'A'
			});
		}

		if (pointB) {
			this.markerB = new google.maps.Marker({
				position: pointB,
				map: this.map,
				label: 'B'
			});
		}
	}
}

