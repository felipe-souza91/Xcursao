import { Platform, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gps',
  templateUrl: './gps.page.html',
  styleUrls: ['./gps.page.scss'],
})
export class GpsPage implements OnInit {

  private loading: any;
 // private map: GoogleMap;
 private search: any;

  constructor(
    private plataform: Platform,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
  }
  searchChanged(){

  }
}
