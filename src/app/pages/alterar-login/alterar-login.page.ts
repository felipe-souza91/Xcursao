import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Alterlogin } from 'src/app/interfaces/alterlogin';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AuthService} from 'src/app/services/auth.service_org';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-alterar-login',
  templateUrl: './alterar-login.page.html',
  styleUrls: ['./alterar-login.page.scss'],
})
export class AlterarLoginPage implements OnInit {
private alterlogin: Alterlogin = {};
private alterlogins = new Array<Alterlogin>();
private alterloginSubscription: Subscription;
private userId: string;
public message: string = '';
public message2: string = '';

  constructor( private authService: AuthService,
    private activeRoute: ActivatedRoute, 
    private router: Router,
    private alterloginService: AuthService,
    private afa:AngularFireAuth,
    private afs: AngularFirestore
     ) { 
  this.userId = this.activeRoute.snapshot.params['id'];
       this.loadLogin();
       this.message2 = "";
       this.message = "";
  }

  loadLogin(){
    this.alterloginSubscription = this.alterloginService.getUser(this.userId).subscribe(data => {
      this.alterlogin = data;
    });
    
  }

  ngOnInit() {
  }
   async redefinirSenha(){

     if(this.alterlogin.email == ""){
      this.message = "";
       this.message2 = "Digite o seu e-mail:";

     }else{

try{

  this.afa.auth.sendPasswordResetEmail(this.alterlogin.email);
  this.message = "Link enviado para seu email!";
  this.message2 = "";
}catch{
  this.message2 = "Não há registro nesse e-mail!";
  this.message = "";
}
     }
  }
  contato(){
    this.router.navigate(['/contato', {locs: this.alterlogin.email}]);
  }

  voltar(){
    this.router.navigate(['/home', {locs: this.alterlogin.email}]);
  }

  async alterarlogin(){
    try{
      
  
        this.authService.updateUser(this.userId, this.alterlogin);
        this.router.navigate(['/home', {locs: this.alterlogin.email}]);
    } catch(error){
      console.log("Erro!", this.alterlogin);
    }
    
  }

}
