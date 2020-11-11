import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
private email: string = null;
  constructor( private router: Router,
    private activeRoute: ActivatedRoute,
     private authService: AuthService
    ) { 

    this.email = this.activeRoute.snapshot.params['locs'];
  }

  ngOnInit() {
  }

  avaliacao(){
    this.router.navigate(['/avaliacao', { locs: this.email }]);
  }

  contato(){
    this.router.navigate(['/contato', { locs: this.email }]);
  }
  

  voltar(){
    this.router.navigate(['/home', { locs: this.email }]);
  }

  sair(){
this.authService.logout();
  }
  
  

}
