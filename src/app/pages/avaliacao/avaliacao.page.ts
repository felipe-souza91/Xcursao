import { Router, ActivatedRoute } from '@angular/router';
import { AvaliacaoService } from './../../services/avaliacao.service';
import { Subscription } from 'rxjs';
import { Avaliacao } from 'src/app/interfaces/avaliacao';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avaliacao',
  templateUrl: './avaliacao.page.html',
  styleUrls: ['./avaliacao.page.scss'],
})
export class AvaliacaoPage implements OnInit {
public search: string = '';
private avaliacoes = new Array<Avaliacao>();
private avaliacaoSubscription: Subscription;
private email:string = null;
  constructor(
    private avaliacaoService: AvaliacaoService,
    private router: Router,
    private  activeRoute: ActivatedRoute
  ) { 
    this.email = this.activeRoute.snapshot.params['locs'];
    this.avaliacaoSubscription = this.avaliacaoService.getoutrasXcursions().subscribe(data => {
      this.avaliacoes  = data;
    });
  }

  ngOnInit() {
  }
  searchChanged(){

  }
  voltar(){
     this.router.navigate(['/menu', { locs: this.email }]);
  }
}
