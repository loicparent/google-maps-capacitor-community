import { Component, ElementRef, ViewChild } from '@angular/core';
import { CapacitorGoogleMaps } from "@capacitor-community/google-maps";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

	@ViewChild('map') mapView: ElementRef;

	constructor() {
		CapacitorGoogleMaps.initialize({
			key: "MY-API-KEY",
			devicePixelRatio: window.devicePixelRatio, // this line is very important
		});
	}

	ionViewDidEnter() {
		this.createMap();
	}

	async createMap() {
		const element = this.mapView.nativeElement;
		const boundingRect = element.getBoundingClientRect() as DOMRect;

		let result = await CapacitorGoogleMaps.createMap({
			element: element,
			boundingRect: boundingRect,
			cameraPosition: {
				target: {
					latitude: 33.6,
					longitude: -117.9
				}
			}
		});

		element.style.background = "";
		element.setAttribute("map", result.googleMap.mapId);
	}

}
