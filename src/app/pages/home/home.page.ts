import { AvaliacaoService } from './../../services/avaliacao.service';
import { Xcursionlista } from './../../interfaces/xcursionlista';
import { FavoritoService } from './../../services/favorito.service';

import { Alterlogin } from 'src/app/interfaces/alterlogin';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

import { ToastController, LoadingController } from '@ionic/angular';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
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
  public mensagemqtd: string = '';
  private xcursion: Xcursion = {};
  private xcursionlista: Xcursionlista = {};
  public avaliacao: string = '';
  public id: string;
  private avaliacaolista: Avaliacao = {};
  stars: string[] = [];
  progress = 0;
  @Input() numStars: number = 4;
  @Input() value: number = 4;
  @Output() ionClick: EventEmitter<number> = new EventEmitter<number>();


  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private favoritoService: FavoritoService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private afs: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private participarService: ParticiparService,
    private avaliacaoService: AvaliacaoService

  ) {

    this.email = this.activeRoute.snapshot.params['locs'];

    if (this.email == null) {
      setInterval(() => {

        this.progress += .1;
        if (this.progress == 0.6) {
          this.authService.logout();
        }
      }, 1200);

    } else {

      this.userSubscription = this.authService.getUsers(this.email).subscribe(data => {
        this.users = data;
      });
      this.xcursionsSubscription = this.xcursionsService.getoutrasXcursions().subscribe(data => {
        this.xcursions = data;
      });
      this.bloq = true;
    }
    this.visualavaliação();
  }

  async galeryPhoto() {
    await this.router.navigate(['/addphoto', { locs: this.email }]);
  }
  loadxcursion(xcursionId) {
    this.xcursionsSubscription = this.xcursionsService.getXcursion(xcursionId).subscribe(data => {
      this.xcursionlista = data;
    });



  }
  visualavaliação() {
    this.stars.push("star");
    this.stars.push("star");
    this.stars.push("star");
    this.stars.push("star");
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

  startClicked(index, nome: string) {

    this.avaliacao = index;
    this.value = index + 1;
    this.ionClick.emit(this.value);
    this.calc();
    this.xcursionsSubscription = this.xcursionsService.getselecionaXcursions(nome).subscribe(data => {
      this.xcursions = data;
    });
  }


  enviaAvaliacao(local: string, email: string, nome_criador: string) {
    try {

      //Recebe os dados para enviar no firebase
      this.avaliacaolista.data = new Date();
      this.avaliacaolista.local = local;
      this.avaliacaolista.nome_criador = nome_criador;
      this.avaliacaolista.email = email;
      this.avaliacaolista.avaliador = this.email;
      this.avaliacaolista.avaliacao = this.avaliacao;
      this.avaliacaoService.addXAvaliacao(this.avaliacaolista);
     
      this.presentToast('Avaliado com sucesso!');

      this.xcursionsSubscription = this.xcursionsService.getoutrasXcursions().subscribe(data => {
        this.xcursions = data;
      });
      this.outrasViagens = false;
    } catch (error) {
      console.log("erro");
    }
  }
  //Fim da avaliação


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
  async participarXcursion(xcursionId: string, xcursionNome: string, qt_vagas: number) {
    this.loadxcursion(xcursionId);
    if (this.xcursionlista == null) {
      this.mensagemqtd = 'Vagas exedidas!';
    } else {
      this.xcursionlista.email = this.email;
      if (this.xcursionlista.nome == xcursionNome) {
        this.xcursionlista.nome = xcursionNome;
        let vaga: number = (qt_vagas - 1);
        this.xcursion.qt_vagas = vaga;

        if (this.xcursion.qt_vagas >= 0) {
          this.mensagemqtd = '';
          try {
            this.xcursionsService.updateXcursion(xcursionId, this.xcursion);
            this.participarService.addParticipacao(this.xcursionlista);
            this.router.navigate(['/participar', { locs: this.email }]);
          } catch (error) {
            console.log("Erro ao parcicipar!");
          }
        } else {
          this.mensagemqtd = 'Não há vagas!';
        }
      }
    }
  }

  acionar() {
    if (this.outrasViagens) {
      this.outrasViagens = false;
      this.bloq = false;
      this.xcursionsSubscription = this.xcursionsService.getXcursionsTotal(this.email).subscribe(data => {
        this.xcursions = data;
      });

    } else {
      this.outrasViagens = true;
      this.bloq = true;

      this.xcursionsSubscription = this.xcursionsService.getoutrasXcursions().subscribe(data => {
        this.xcursions = data;

      });
    }
  }
  ngOnInit() {
  }

  async MinhasParticipacoes() {
    await this.router.navigate(['/participar', { locs: this.email }]);
  }

  async home() {
    await this.router.navigate(['/home', { locs: this.email }]);
  }

  async more() {
    await this.router.navigate(['/menu', { locs: this.email }]);
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
  contato() {
    this.router.navigate(['/contato', { locs: this.email }]);
  }

  async deleteXcursion(id: string) {
    try {
      await this.xcursionsService.deleteXcursion(id);
    } catch (error) {
      this.presentToast("Erro ao deletar");
    }
  }


  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
}

