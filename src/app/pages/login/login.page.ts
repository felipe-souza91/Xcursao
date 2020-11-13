import { Xcursion } from './../../interfaces/xcursion';
import { HomePage } from './../home/home.page';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';



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

  constructor(
    private afa: AngularFireAuth,
    private afs: AngularFirestore,
    public keyboard: Keyboard,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.keyboard;
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
      await this.router.navigate(['/home', { locs: this.userLogin.email }]);
      this.loading.dismiss();
    } catch (error) {
      let message: string;
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email já cadastrado!';
          break;
        case 'auth/invalid-email':
          message = 'Email Invalido';
          break;
        case 'auth/user-not-found':
          message = 'Email não cadastrado!';
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
      delete newUserObject.password;
      const newUser = await this.afa.auth.createUserWithEmailAndPassword(this.userRegister.email, this.userRegister.password);
      await this.afs.collection('Users').doc(newUser.user.uid).set(newUserObject);
      await this.afa.auth.signInWithEmailLink(this.userRegister.email);
      await this.router.navigate(['/home']);
    } catch (error) {
      let message: string;
      console.error(error.code);
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email ja Cadastrado';
          break;
        case 'auth/invalid-email':
          message = 'Email Invalido';
          break;
      }

      this.presentToast(message);
    } finally {
      this.loading.dismiss();
    }
  }
  async redefenirPassword() {
    if (this.userLogin.email == '') {
      let message = 'Digite o seu e-mail acima!';
      this.presentToast(message);
    } else {

      try {
        this.afa.auth.sendPasswordResetEmail(this.userLogin.email);
        let message = 'Link enviado para seu email!';
        this.presentToast(message);
      } catch (error) {
        let message = "Link não enviado!";
        this.presentToast(message);
      }
    }
  }

  async presentLoading() {
    this.loading = await this.loadingCtrl.create({
      message: 'Aguarde...',
    });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
