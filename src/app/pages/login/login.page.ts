import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides, LoadingController, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { User } from 'src/app/interfaces/user';
import { AuthService } from 'src/app/services/auth.service';
import { Routes, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides,{static:true}) slides :IonSlides;
  public roadPosition:number=0;
  public roadDifference:number=80;
  public userLogin: User = {};
  public userRegister: User = {};
  private loading : any;

  constructor(public keyboard:Keyboard,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private authService: AuthService,
              private router:Router) { }
              

  ngOnInit() {  
    this.keyboard
  }

  segmentChanged(event:any){
    if (event.detail.value === "login"){
      this.slides.slidePrev();
      this.roadPosition += this.roadDifference;
    }else {
      this.slides.slideNext();
      this.roadPosition -= this.roadDifference;
    }
    
  }

  async login(){
    await this.presentLoading();

    try{
      await this.authService.login(this.userLogin);
      //await this.router.navigate(['home']);
    }catch(error){
     let message:string;
      switch(error.code){
        case 'auth/email-already-in-use':
        message = 'Email ja Cadastrado';
        break;

        case 'auth/invalid-email':
        message = 'Email Invalido';
        break;
      }
    
      this.presentToast(error.message);
    }finally{
      this.loading.dismiss();
    }


  }

  async register(){
    await this.presentLoading();
    
    try{
      await this.authService.register(this.userRegister);
    }catch(error){
      let message:string;

      console.error(error.code);

      switch(error.code){
        case 'auth/email-already-in-use':
        message = 'Email ja Cadastrado';
        break;

        case 'auth/invalid-email':
        message = 'Email Invalido';
        break;
      }

      this.presentToast(message);
    }finally{
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

  async presentToast(message : string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000
    });
    toast.present();
  }
}
