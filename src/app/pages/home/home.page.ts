import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private xcursions = new Array<Xcursion>();
  private xcursionsSubscription:Subscription;

  constructor(private xcursionsService : XcursionService,
    private authService:AuthService) {
    this.xcursionsSubscription = this.xcursionsService.getXcursions().subscribe(data => {
      this.xcursions = data;
    });
   }

  ngOnInit() {
  }

  ngOnDestroy(){
    this.xcursionsSubscription.unsubscribe();
  }

  async logout(){
    try{
      await this.authService.logout();
    }catch(error){
      console.error(error);
    }
  }

}
