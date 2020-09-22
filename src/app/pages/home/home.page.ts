import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private xcursions = new Array<Xcursion>();
  private xcursionsSubscription: Subscription;
  private loading: any;

  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
    
    
    ) {
    this.xcursionsSubscription = this.xcursionsService.getXcursions().subscribe(data => {
      this.xcursions = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.xcursionsSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
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
