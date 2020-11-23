import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Platform, LoadingController } from '@ionic/angular';
import { Component, OnInit, ViewChild, Input, NgZone } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { google } from 'google-maps';
import { Environment, GoogleMap, GoogleMaps, GoogleMapOptions, GoogleMapsEvent, MyLocation, GoogleMapsAnimation, Marker, Geocoder } from '@ionic-native/google-maps';

declare var google: any;
@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {
  @ViewChild('map', { static: true }) mapElement: any;
  private map: GoogleMap;
  private loading: any;
  public search: string = '';
  private googleAutoComplete = new google.maps.places.AutocompleteService();
  public searchResults = new Array<any>();
  private originMaker: Marker;
  public destination: any;
  private googleDirectionsServe = new google.maps.DirectionsService();

  constructor(
    private loadingCtrl: LoadingController,
    public platform: Platform,
    private ngZone: NgZone
  ) {

  }
  ngOnInit() {

    this.mapElement = this.mapElement.nativeElement;

    this.mapElement.style.width = this.platform.width() + 'px';
    this.mapElement.style.height = this.platform.height() + 'px';
    this.loadMap();
  }

  async loadMap() {
    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    await this.loading.present();
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyB03i_muQ2AxjZRRKKlzm75atFCqhVABS4',
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyB03i_muQ2AxjZRRKKlzm75atFCqhVABS4'
    });

    const mapOptions: GoogleMapOptions = {


      controls: {

      }
    };

    this.map = GoogleMaps.create(this.mapElement, mapOptions);

    try {
      await this.map.one(GoogleMapsEvent.MAP_READY);
      this.addOriginMarker();
    } catch (error) {
      console.log(error);

    }
  }
  async addOriginMarker() {
    try {
      const myLocation: MyLocation = await this.map.getMyLocation();
      await this.map.moveCamera({
        target: myLocation.latLng,
        zoom: 18
      });

     this.originMaker = this.map.addMarkerSync({
        title: 'Origem',
        icon: '#000',
        animation: GoogleMapsAnimation.DROP,
        position: myLocation.latLng
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loading.dismiss();
    }
  }

  searchChanged() {
   
    if(!this.search.trim().length) return;

    this.googleAutoComplete.getPlacePredictions({ input: this.search }, predictions => {
      this.ngZone.run(() => {
        this.searchResults = predictions;
      });
    });

    console.log(this.searchResults);
  }

  async calcRoute(item: any) {
    this.search = '';
    this.destination = item;
    console.log(item);
    const info:any = await Geocoder.geocode({address: this.destination.description});
    
    let markerDestination: Marker = this.map.addMarkerSync({
title: this.destination.description,
icon: '#000',
animation: GoogleMapsAnimation.DROP,
position:  info[0].position,
    });
    this.googleDirectionsServe.Router({
      origin: this.originMaker.getPosition(),
      destination: markerDestination.getPosition(),
      travelMode: 'DRIVING'

    }, results =>{
      console.log(results);
    })

    this.map.addPolygon({
      points: [this.originMaker.getPosition(), markerDestination.getPosition()],
      color:'#000',
      width: 3
    });
  }

}
