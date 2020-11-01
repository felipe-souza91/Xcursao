
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Favoritos } from './../../interfaces/favoritos';
import { Component, OnInit } from '@angular/core';
import { FavoritoService } from './../../services/favorito.service';


@Component({
  selector: 'app-detailscursion-favorito',
  templateUrl: './detailscursion-favorito.page.html',
  styleUrls: ['./detailscursion-favorito.page.scss'],
})
export class DetailscursionFavoritoPage implements OnInit {
  private favorito: Favoritos = {};
  private favoritoId: string = null;
  private favoritoSubscription:Subscription;

  constructor( private activeRoute: ActivatedRoute, 
    private favoritoService: FavoritoService) {
    this.favoritoId = this.activeRoute.snapshot.params['id'];
    if (this.favoritoId) this.loadXvision();
    
   }

  ngOnInit() {
  }

  loadXvision(){
 this.favoritoSubscription = this.favoritoService.getfavorito(this.favoritoId).subscribe(data => {
      this.favorito = data;
    });
  }

}
