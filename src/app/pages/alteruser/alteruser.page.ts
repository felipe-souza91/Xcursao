import { async } from '@angular/core/testing';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { User } from './../../interfaces/user_old';
import { Xcursion } from './../../interfaces/xcursion';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, NavController, Platform } from '@ionic/angular';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from './../../services/auth.service_org';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-alteruser',
  templateUrl: './alteruser.page.html',
  styleUrls: ['./alteruser.page.scss'],
})
export class AlteruserPage implements OnInit {
  private user: User = {};
  private loading: any;
  private userId: string = null;
  private UserSubscription: Subscription;
  

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private xcursionService: XcursionService,
    private navCtrl: NavController,
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    private camera: Camera, 
    private plataform: Platform
  

  ) { 
    this.userId = this.activeRoute.snapshot.params['id'];
   } 

  ngOnInit() {
  }
 
 async alteraUser(){
    try{
      await this.authService.updateUser(this.userId, this.user);
      await this.loading.dismiss();

    }catch(error){
      this.presentToast("Erro ao alterar");
    }
   
  
}

async deleteUser() {
  try {
    await this.authService.deleteUser(this.user.id);
  } catch (error) {
   this.presentToast("Erro ao deletar");
  }
}
async presentToast(message: string) {
  const toast = await this.loadingCtrl.create({ message, duration: 2000 });
  toast.present();

}
}
