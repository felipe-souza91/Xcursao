import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlide, IonSlides } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild(IonSlides) slides :IonSlides;
  public roadPosition:number=0;
  public roadDifference:number=80;

  constructor(public keyboard:Keyboard) { }

  ngOnInit() {  
    this.keyboard
  }

  segmentChanged(event:any){
    if (event.detail.value === "login"){
      this.slides.slidePrev();
      this.roadPosition += this.roadDifference;
    }else {
      this.slides.slideNext();
      this.roadPosition -= this.roadDifference;
    }
    
  }

}
