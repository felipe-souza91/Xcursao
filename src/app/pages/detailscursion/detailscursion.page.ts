import { FavoritosPage } from './../favoritos/favoritos.page';
import { Favoritos } from './../../interfaces/favoritos';
import { Participar } from './../../interfaces/participar';
import { ParticiparService } from './../../services/participar.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user';
import { async } from '@angular/core/testing';
import { FavoritoService } from './../../services/favorito.service';
import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detailscursion',
  templateUrl: './detailscursion.page.html',
  styleUrls: ['./detailscursion.page.scss'],
})
export class DetailscursionPage implements OnInit {
  private xcursions = new Array<Xcursion>();
  private xcursionSubscription: Subscription;
  private loading: any;
  private xcursion: Xcursion = {};
  private xcursionId: string = null;
  public email: string = null;
  public favorito: FavoritosPage;

  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private favoritoService: FavoritoService,
    private participarService: ParticiparService,
    private router: Router,
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,


  ) {
    this.xcursionId = this.activeRoute.snapshot.params['id'];

    if (this.xcursionId == null) {
      this.authService.logout();
    } else {
      this.loadXvision();
    }

  }

  ngOnInit() { }

  ngOndestroy() {
  }
  
  
  loadXvision() {
    this.xcursionSubscription = this.xcursionsService.getXcursion(this.xcursionId).subscribe(data => {
      this.xcursion = data;
    });
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

