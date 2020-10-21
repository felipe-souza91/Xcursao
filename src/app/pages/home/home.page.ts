import { AngularFirestore } from '@angular/fire/firestore';


import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service_org';
import { __await } from 'tslib';
import { User } from 'src/app/interfaces/user';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private xcursions = new Array<Xcursion>();
  private users = new Array<User>();
  private xcursionsSubscription: Subscription;
  private userSubscription: Subscription;
  private loading: any;
  private xcursion: Xcursion = {};
  private user: User = {};
  private sampleArr = [];
  private rresultArr = [];

  private search: string;


  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afs: AngularFirestore

  ) {

    this.userSubscription = this.authService.getUsers().subscribe(data => {
      this.users = data;
    });
    
    this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal().subscribe(data => {
      this.xcursions = data;
      });
    
  }
  ngOnInit() {
  }

  searchChanged(){
    if(this.search.length > 0){
      this.xcursionsSubscription = this.xcursionsService.getXcursions(this.search).subscribe(data => {
        this.xcursions = data;
        });
    }else{
      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal().subscribe(data => {
        this.xcursions = data;
        });
    }
  }
  
  ngOnDestroy() {
    this.xcursionsSubscription.unsubscribe();
  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);

    }
  }

  async deleteXcursion(id: string) {
    try {
      await this.xcursionsService.deleteXcursion(id);
    } catch (error) {
      this.presentToast("Erro ao deletar");
    }
  }



  async presentToast(message: string) {
    const toast = await this.loadingCtrl.create({ message, duration: 2000 });
    toast.present();

  }







}
