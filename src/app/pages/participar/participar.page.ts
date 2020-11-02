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
 private participar: Participar={};
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
   
  }

  ngOnInit() {
  }
   async voltar(){
    await this.router.navigate(['/home', { locs: this.email }]);
  }

  deletar(id: any){
    try{
      this.participarService.deletarParticipacao(id);
      console.log("deletado");
    }catch(error){
console.log(error);

    }
  }
}
