import { Component, OnInit } from '@angular/core';
import {Galyphoto} from 'src/app/interfaces/galyphoto';

@Component({
  selector: 'app-galeria-fotos',
  templateUrl: './galeria-fotos.page.html',
  styleUrls: ['./galeria-fotos.page.scss'],
})
export class GaleriaFotosPage implements OnInit {

  galeriafoto: Galyphoto;

  constructor() { }

  ngOnInit() {
  }
}
