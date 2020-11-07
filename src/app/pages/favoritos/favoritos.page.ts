import { DetailscursionPage } from './../detailscursion/detailscursion.page';
import { Favoritos } from './../../interfaces/favoritos';
import { FavoritoService } from './../../services/favorito.service';
import { Xcursion } from './../../interfaces/xcursion';
import { XcursionService } from './../../services/xcursion.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  private xcursions = new Array<Xcursion>();
  private favoritos = new Array<Favoritos>();
  favoritaSubscription: Subscription;
  private xcursionId: string = null;
  private email: string = null;
  private favorito: DetailscursionPage;
    public search: string = '';

  constructor(
    private activeRoute: ActivatedRoute,
    private favoritaService: FavoritoService,
    private router: Router


  ) {
    this.xcursionId = this.activeRoute.snapshot.params['id'];
    this.email = this.activeRoute.snapshot.params['locs'];

    if (this.xcursionId) {

      this.loadXvision();
    }
    this.favoritaSubscription = this.favoritaService.getFavoritos(this.email).subscribe(data => {
      this.favoritos = data;
    });
    if(this.search == ''){
    this.favoritaSubscription = this.favoritaService.getFavoritos(this.email).subscribe(data => {
      this.favoritos = data;
    });
  }
    }

  voltar(){
    this.router.navigate(['/home', {locs: this.email}]);
  }

  searchChanged(){
    if(this.search == ''){
      this.favoritaSubscription = this.favoritaService.getFavoritos(this.email).subscribe(data => {
        this.favoritos = data;
      });
    }else{
      this.favoritaSubscription = this.favoritaService.getFavoritoLocal(this.email, this.search).subscribe(data => {
        this.favoritos = data;
      });
    }
  }

  loadXvision() {
  }


  ngOnInit() {
  }



  deletar(id: string) {
    this.favoritaService.deleteFavorito(id);
    console.log('deletado');
  }

}
