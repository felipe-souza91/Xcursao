import { Xcursionlista } from './../../interfaces/xcursionlista';
import { FavoritoService } from './../../services/favorito.service';

import { Alterlogin } from 'src/app/interfaces/alterlogin';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service_org';
import { __await } from 'tslib';
import { User } from 'src/app/interfaces/user';
import { ParticiparService } from 'src/app/services/participar.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private xcursions = new Array<Xcursion>();
  private alterlogins = new Array<Alterlogin>();
  private users = new Array<User>();
  private xcursionsSubscription: Subscription;
  private userSubscription: Subscription;
  private alterSubscription: Subscription;
  private favoritoSubscription: Subscription;
  private loading: any;
  private user: User = {};
  private search: string;
  public email: string;
  public outrasViagens = false;
  private bloq: boolean;

  private xcursion: Xcursion = {};
  private xcursionlista: Xcursionlista = {};



  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private favoritoService: FavoritoService,
    private alerloginServices: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private participarService: ParticiparService
  ) {
    this.email = this.activeRoute.snapshot.params['locs'];

    if (this.email == null) {
      this.logout();
    } else {

      this.userSubscription = this.authService.getUsers(this.email).subscribe(data => {
        this.users = data;

      });
      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
        this.xcursions = data;

      });
    }
  }
async galeryPhoto(){
  await this.router.navigate(['/addphoto', { locs: this.email }]);
}
  loadxcursion(xcursionId) {
    this.xcursionsSubscription = this.xcursionsService.getXcursion(xcursionId).subscribe(data => {
      this.xcursionlista = data;
    });
  }
  adicionarFavorito(xcursionId: string, xcursionNome: string) {

    this.loadxcursion(xcursionId);

    if (xcursionId == null) {
      console.log('Não há Id');
    } else {
      if (this.xcursionlista.nome == xcursionNome) {
        this.xcursionlista.nome = xcursionNome;
        try {
          this.xcursionlista.email = this.email;
          this.favoritoService.addFavorito(this.xcursionlista);
          this.router.navigate(['/favoritos', { locs: this.email }]);
        } catch (error) {
          console.log('Erro ao adicionar!');
        }
      }
    }
  }
  async participarXcursion(xcursionId: string, xcursionNome: string) {
   
    this.loadxcursion(xcursionId);
    if (this.xcursionlista == null) {
      console.log("resultado null");
    } else {
      this.xcursionlista.email = this.email;
      if (this.xcursionlista.nome == xcursionNome) {
        this.xcursionlista.nome = xcursionNome;
        try {
          this.participarService.addParticipacao(this.xcursionlista);
          this.router.navigate(['/participar', { locs: this.email }]);
        } catch (error) {
          console.log("Erro ao parcicipar");
        }
      }
    }
  }

  acionar() {
    if (this.outrasViagens) {
      this.outrasViagens = false;
      this.bloq = true;
      this.xcursionsSubscription = this.xcursionsService.getoutrasXcursions().subscribe(data => {
        this.xcursions = data;
      });
    } else {
      this.outrasViagens = true;
      this.bloq = false;
      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
        this.xcursions = data;
      });
    }
  }
  ngOnInit() {
  }

  async participar() {
    await this.router.navigate(['/participar', { locs: this.email }]);
  }
  async home() {
    await this.router.navigate(['/home', { locs: this.email }]);
  }
  async alterlogin() {
    await this.router.navigate(['/alterar-login', { locs: this.email }]);
  }

  async detailcursion() {
    await this.router.navigate(['/detailscursion', { locs: this.email }]);
  }
  searchChanged() {

    if (this.bloq == true) {
      this.xcursionsSubscription = this.xcursionsService.getListaxcursion(this.search).subscribe(data => {
        this.xcursions = data;
      });
    } else {



      if (this.search.length > 0) {
        this.xcursionsSubscription = this.xcursionsService.getXcursions(this.search, this.email).subscribe(data => {
          this.xcursions = data;
        });
      } else {

        this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
          this.xcursions = data;
        });
      }
    }
  }

  ngOnDestroy() {
    this.xcursionsSubscription.unsubscribe();
  }

  async detail() {
    await this.router.navigate(['/detail', { locs: this.email }]);
  }
  async favoritos() {
    await this.router.navigate(['/favoritos', { locs: this.email }]);
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
