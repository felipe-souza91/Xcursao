import { Subscription } from 'rxjs';
import { Participar } from './../../interfaces/participar';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ParticiparService } from './../../services/participar.service';

@Component({
  selector: 'app-detail-participar',
  templateUrl: './detail-participar.page.html',
  styleUrls: ['./detail-participar.page.scss'],
})
export class DetailParticiparPage implements OnInit {
  private participarem = new Array<Participar>();
private id: string= null;
private participar: Participar={};
private participarSubscription: Subscription;

  constructor( private router: Router,
     private activeRoute: ActivatedRoute,
     private participarService: ParticiparService
     ) { 

    this.id = this.activeRoute.snapshot.params['id'];

    if(this.id) this.loadparticipar();
  }

  ngOnInit() {
  }

  loadparticipar(){
    this.participarSubscription = this.participarService.getParticiparId(this.id).subscribe(data => {
      this.participar = data;
    });
  }

  voltar(){
    this.router.navigate(['/participar', {locs: this.participar.email}]);
  }
  
}
