import { Router, ActivatedRoute } from '@angular/router';
import { ContatoService } from './../../services/contato.service';
import { Contato } from './../../interfaces/contato';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.page.html',
  styleUrls: ['./contato.page.scss'],
})
export class ContatoPage implements OnInit {
  private contato: Contato = {};
  private contatos = new Array<Contato>();
  private loading: any;
  private email: string = null;

  constructor(private ContatoService: ContatoService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastCtrl: ToastController,
  ) {

    this.email = this.activeRoute.snapshot.params['locs'];
    this.contato.data = new Date();
  } 

  ngOnInit() {
  }

  async enviaContato() {
    //this.presentLoading();
    try {
      this.ContatoService.addContato(this.contato);
      await this.presentToast('Contato enciado');
      await this.router.navigate(['/home', { locs: this.email }]);

    } catch (error) {
      console.log("erro", this.contato);
    } finally {
      this.loading.dismiss();
    }
  }
  async voltar() {
    await this.router.navigate(['/menu', { locs: this.email }]);
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
