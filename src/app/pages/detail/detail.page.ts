import { XcursionService } from 'src/app/services/xcursion.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../services/auth.service_org';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Xcursion } from './../../interfaces/xcursion';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { database } from 'firebase';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  
  private xcursion: Xcursion = {};
  private loading: any;
  private xcursionId: string = null;
  private xcursionSubscription: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private xcursionService: XcursionService,
    private navCtrl: NavController

  ) { this.xcursionId = this.activeRoute.snapshot.params['id'];

  if (this.xcursionId) this.loadXvision(); }

  ngOnInit() {}

  ngOndestroy() {
    if (this.xcursionSubscription) this.xcursionService.getXcursions().subscribe();
  }
  loadXvision() {
    this.xcursionSubscription= this.xcursionService.getXcursion(this.xcursionId).subscribe(data => {
      this.xcursion = data;
    });

  }
  async saveXcursion() {
    await this.presentLoading();
    

    if (this.xcursionId) {

      try {
        await this.xcursionService.updateXcursion(this.xcursionId,this.xcursion);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (erro) {

        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }

    } else {
      this.xcursion.data = new Date().getTime();

      try {
        await this.xcursionService.addXcursion(this.xcursion);
        await this.loading.dismiss();

        this.navCtrl.navigateBack('/home');
      } catch (erro) {

        this.presentToast("Erro ao tentar salvar");
        this.loading.dismiss();
      }

    }
  }

  async presentLoading() {

    this.loading = await this.loadingCtrl.create({ message: 'Por favor, aguarde...' });
    return this.loading.present();
  }

  async presentToast(message: string) {
    const toast = await this.loadingCtrl.create({ message, duration: 2000 });
    toast.present();

  }


}
//Página programado por thiago, foi adicionad rotas e metodos para funcionar o formulario detail.