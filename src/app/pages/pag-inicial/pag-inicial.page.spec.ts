import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PagInicialPage } from './pag-inicial.page';

describe('PagInicialPage', () => {
  let component: PagInicialPage;
  let fixture: ComponentFixture<PagInicialPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagInicialPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PagInicialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
