import { async } from '@angular/core/testing';
import { FavoritoService } from './../../services/favorito.service';
import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { computeStackId } from '@ionic/angular/dist/directives/navigation/stack-utils';



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
  

  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute,
    private favoritoService: FavoritoService, 
    private router: Router
    
  ) {  
  this.xcursionId = this.activeRoute.snapshot.params['id'];
    
  if (this.xcursionId) this.loadXvision(); }

  ngOnInit(){}
  
  ngOndestroy() {
  }

   async voltar(){

   await  this.router.navigate(['/home', {locs: this.xcursion.email}]);
  }

  loadXvision() {
    this.xcursionSubscription= this.xcursionsService.getXcursion(this.xcursionId).subscribe(data => {
      this.xcursion = data;
    });
  }

  async saveFavoritos() {

    try {
    await this.favoritoService.addFavorito(this.xcursion);
    await  this.router.navigate(['/favoritos', {locs: this.xcursion.email}]);

console.log("Adicionado");

    } catch (erro) {
      console.log('Erro');
      
    }

  } 
}

