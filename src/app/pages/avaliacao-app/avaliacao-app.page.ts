import { ActivatedRoute, Router  } from '@angular/router';
import { AvaliacaoApp } from './../../interfaces/avaliacao-app';
import { AuthService } from 'src/app/services/auth.service_org'
import { AvaliacaoAppService } from './../../services/avaliacao-app.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToastController} from '@ionic/angular';

@Component({
  selector: 'app-avaliacao-app',
  templateUrl: './avaliacao-app.page.html',
  styleUrls: ['./avaliacao-app.page.scss'],
})

export class AvaliacaoAppPage implements OnInit {
  private email: string = null;
  public avaliacao: string = '';
  private avaliacaoApps = new Array<AvaliacaoApp>();
  private avaliacaoApp: AvaliacaoApp = {};
  stars: string[] = [];
  @Input() numStars: number = 4;
  @Input() value: number = 4;
  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();


  constructor( private authService: AuthService,
    private avaliacaoAppService: AvaliacaoAppService,
     private activeRoute: ActivatedRoute,
     private toastCtrl: ToastController,
     private router: Router
    
    ) {
      this.email = this.activeRoute.snapshot.params['locs'];
    this.visualavaliação();
    this.avaliacaoApp.sugestao = '';
    this.avaliacaoApp.avaliacao = '';
  }

  ngOnInit() {
  }


  visualavaliação() {
    this.stars.push("star-outline");
    this.stars.push("star-outline");
    this.stars.push("star-outline");
    this.stars.push("star-outline");
  }

  //Sistema de avaliação

  calc() {
    this.stars = [];
    let tmb = this.value;
    for (let i = 0; i < this.numStars; i++, tmb--) {
      if (tmb >= 1)
        this.stars.push("star");
      else if (tmb > 0 && tmb < 1)
        this.stars.push('star-half');
      else this.stars.push("star-outline");
    }
  }

  startClicked(index) {
    this.avaliacao = index;
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
    this.avaliacaoApp.avaliacao = index;
    
  }

  enviaAvaliacao() {
      
try{
this.avaliacaoApp.datacriacao = new Date();
this.avaliacaoApp.email = this.email;
this.avaliacaoAppService.addAvaliacaoApp(this.avaliacaoApp);
this.authService.logout();
this.presentToast("Avaliacão enviada! Obrigado!");

}catch(error){
  this.presentToast("Erro ao enviar!");
}
  }

  voltar(){
    this.router.navigate(['/menu', { locs: this.email }]);
  }

   async sair() {
     console.log('sair');
  await this.authService.logout();
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}
