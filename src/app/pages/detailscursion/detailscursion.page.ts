import { Component, OnInit } from '@angular/core';
import { Xcursion } from 'src/app/interfaces/xcursion';
import { Subscription } from 'rxjs';
import { XcursionService } from 'src/app/services/xcursion.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-detailscursion',
  templateUrl: './detailscursion.page.html',
  styleUrls: ['./detailscursion.page.scss'],
})
export class DetailscursionPage implements OnInit {
  private xcursions = new Array<Xcursion>();
  private xcursionSubscription: Subscription;
  private loading: any;
  private xcursion: Xcursion = {};
  private xcursionId: string = null;

  constructor(
    private xcursionsService: XcursionService,
    private authService: AuthService,
    private activeRoute: ActivatedRoute
    
  ) {  this.xcursionId = this.activeRoute.snapshot.params['id'];
    
  if (this.xcursionId) this.loadXvision(); }

  ngOnInit(){}
  ngOndestroy() {

    if (this.xcursionSubscription) this.xcursionsService.getXcursions().subscribe();
  }

  loadXvision() {
    this.xcursionSubscription= this.xcursionsService.getXcursion(this.xcursionId).subscribe(data => {
      this.xcursion = data;
    });

  }
  
}


