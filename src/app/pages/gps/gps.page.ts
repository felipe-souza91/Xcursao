import { map } from 'rxjs/operators';
import { Platform, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import { google } from 'google-maps';

declare var google: any;
@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {
  search: string="";
  map: any;
  marker: any;
  latitude: any="";
  longitude: any="";
  timestamp: any = "";

  constructor(
     public geolocation: Geolocation,
     public platform: Platform
      ) {
        this.platform.ready().then(()=>{
          var mapOptions = {
            center: {lat:23.2366, lng:79.3822},
            zoom:7
          };
          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        });
      }
  ngOnInit() {
  }

  GetLocation(){
    var ref = this;
   this.geolocation.getCurrentPosition().then((position) =>{
var gps = new google.maps.LatLng(position.coords.altitude, position.coords.longitude);
if(ref.marker== null){

  ref.map = new google.maps.Maker({
    position: gps,
    map: ref.map,
    title: 'Minha posição atual'
  })
}else{
  ref.marker.setPosition(gps);
}
ref.map.panTo(gps);
ref.latitude = position.coords.latitude.toString();
ref.longitude= position.coords.longitude.toString();
ref.timestamp = (new Date(this.timestamp)).toString();
    })
  }
  searchChanged(){}
}
