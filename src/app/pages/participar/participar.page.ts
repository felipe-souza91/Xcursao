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
 
  constructor(
    private participarService: ParticiparService,
    private activeRoute: ActivatedRoute, 
    private router: Router
    ) 
    { 

      this.email = this.activeRoute.snapshot.params['locs']; 
    this.participarSubscription = this.participarService.getParticipar(this.email).subscribe(data => {
      this.participarem = data;
    });
    console.log(this.email);
  }

  ngOnInit() {
  }
  
  async deletar(id: string){
    try{
this.participarService.deletarParticipacao(id);
    }catch(error){
      console.log("Erro!");
    }
  }

}
