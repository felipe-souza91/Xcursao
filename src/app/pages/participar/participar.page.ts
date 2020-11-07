import { ActivatedRoute, Router } from '@angular/router';
import { Participar } from './../../interfaces/participar';
import { Subscription } from 'rxjs';
import { ParticiparService } from './../../services/participar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-participar',
  templateUrl: './participar.page.html',
  styleUrls: ['./participar.page.scss'],
})
export class ParticiparPage implements OnInit {
  private participarem = new Array<Participar>();
  private participarSubscription: Subscription;
  private email: string = null;
   public search: string = '';

  constructor(
    private participarService: ParticiparService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {

    this.email = this.activeRoute.snapshot.params['locs'];
    this.participarSubscription = this.participarService.getParticipar(this.email).subscribe(data => {
      this.participarem = data;
    });
    if(this.search == ''){
    this.participarSubscription = this.participarService.getParticipar(this.email).subscribe(data => {
      this.participarem = data;
    });
  }
  }

  ngOnInit() {
  }
  voltar() {
    this.router.navigate(['/home', { locs: this.email }]);
  }

  searchChanged() {
    if (this.search == '') {
      this.participarSubscription = this.participarService.getParticipar(this.email).subscribe(data => {
        this.participarem = data;
      });
    } else {
      this.participarSubscription = this.participarService.getParticiparSeach(this.email, this.search).subscribe(data => {
        this.participarem = data;
      });
    }
   
  }

  async deletar(id: string) {
    try {
      this.participarService.deletarParticipacao(id);
    } catch (error) {
      console.log("Erro!");
    }
  }
  async detalParcicipacao() {
    this.router.navigate(['/detail-participar', { locs: this.email }]);
  }

}
