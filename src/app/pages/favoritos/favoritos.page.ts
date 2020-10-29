import { Favoritos } from './../../interfaces/favoritos';
import { FavoritoService } from './../../services/favorito.service';
import { Xcursion } from './../../interfaces/xcursion';
import { XcursionService } from './../../services/xcursion.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  private favorito: Favoritos = {};
   
  constructor(
    private activeRoute: ActivatedRoute,
    private favoritaService: FavoritoService,
    
  ) {
    this.xcursionId = this.activeRoute.snapshot.params['id'];

    if (this.xcursionId) {

      this.loadXvision();
    } 
    this.favoritaSubscription = this.favoritaService.getFavoritos().subscribe(data => {
      this.favoritos = data;
      });
  }
  loadXvision() {
  }

  ngOnInit() {
  }

deletar(id:string){
this.favoritaService.deleteFavorito(id);
console.log('deletado');
}

}
