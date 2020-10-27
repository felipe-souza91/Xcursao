import { GaleryPhotosService } from './../../services/galery-photos.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import {Galyphoto} from 'src/app/interfaces/galyphoto';

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.page.html',
  styleUrls: ['./galeria-fotos.page.scss'],
})
export class GaleriaFotosPage implements OnInit {
  private galeryphotos = new Array<Galyphoto>();
  private galeryphotoSubscription: Subscription;
  

  constructor(private galeryphotoService: GaleryPhotosService) {

    this.galeryphotoSubscription = this.galeryphotoService.getgaleryPhoto().subscribe(data => {
      //this.galeryphotos = data;
      });
   }

  ngOnInit() {
  }
}
