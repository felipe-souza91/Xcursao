import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { Keyboard } from '@ionic-native/keyboard/ngx';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {Camera} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import { NgCalendarModule  } from 'ionic2-calendar';
import {Geolocation} from '@ionic-native/geolocation/ngx';


@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        NgCalendarModule,
        
       
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
        Keyboard,
        Camera,
         File,
         Geolocation,
        
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
