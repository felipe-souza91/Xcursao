import { Xcursion } from './../../interfaces/xcursion';
import { HomePage } from './../home/home.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { XcursionService} from 'src/app/services/xcursion.service';
import { Routes, RouterModule, Router } from '@angular/router';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public user: any = {};

  @ViewChild(IonSlides, { static: true }) slides: IonSlides;
  public roadPosition: number = 0;
  public roadDifference: number = 80;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading: any;
  private home: HomePage;

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    public keyboard: Keyboard,

    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private xcursionService: XcursionService,
    private router: Router) { }
    
  ngOnInit() {
    this.keyboard
  }

  segmentChanged(event: any) {
    if (event.detail.value === "login") {
      this.slides.slidePrev();
      this.roadPosition += this.roadDifference;
    } else {
      this.slides.slideNext();
      this.roadPosition -= this.roadDifference;
    }
  }
  async login() {
    await this.presentLoading();
    try {
      await this.authService.login(this.userLogin);
      await this.router.navigate(['/home', {locs: this.userLogin.email}]);
      this.loading.dismiss();
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email já Cadastrado!';
          break;
        case 'auth/invalid-email':
          message = 'Email Invalido!';
          break;
      }
      this.presentToast(error.message);
    } finally {
      this.loading.dismiss();
    }
  }
  async register() {
    await this.presentLoading();
    try {
      const newUserObject = Object.assign({}, this.userRegister);
      const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.userRegister.email, this.userRegister.password);
      await this.afs.collection('Users').doc(newUser.user.uid).set(newUserObject);
      await this.router.navigate(['/login']);
    } catch (error) {
      let message: string;
      console.error(error.code);
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email já Cadastrado!';
          break;
        case 'auth/invalid-email':
          message = 'Email Invalido!';
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
      //duration: 2000
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
