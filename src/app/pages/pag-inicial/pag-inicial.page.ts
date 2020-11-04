import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pag-inicial',
  templateUrl: './pag-inicial.page.html',
  styleUrls: ['./pag-inicial.page.scss'],
})
export class PagInicialPage implements OnInit {
  progress = 0;

  constructor(private router: Router) {
    setInterval(() => {

      this.progress += .1;
      if (this.progress == 1.0999999999999999) {
        this.login();
      }
    }, 1200);
  }

  ngOnInit() {
  }
  async login() {
    await this.router.navigate(['/login']);
  }
}
