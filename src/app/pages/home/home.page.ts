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
  private loading: any;
  private user: User = {};
  private search: string;
  public email: string;




  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private alerloginServices: AuthService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router

  ) {
    this.email = this.activeRoute.snapshot.params['locs'];

    if(this.email == null){
      this.logout();
    }else{
      this.userSubscription = this.authService.getUsers(this.email).subscribe(data => {
        this.users = data;
      });
      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
        this.xcursions = data;
      });
    }
    
   
  }
  ngOnInit() {
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

    if (this.search.length > 0) {
      this.xcursionsSubscription = this.xcursionsService.getXcursions(this.search).subscribe(data => {
        this.xcursions = data;
      });
    } else {

      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
        this.xcursions = data;
      });
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
