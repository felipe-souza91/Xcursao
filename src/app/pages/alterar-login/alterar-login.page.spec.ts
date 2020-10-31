import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlterarLoginPage } from './alterar-login.page';

describe('AlterarLoginPage', () => {
  let component: AlterarLoginPage;
  let fixture: ComponentFixture<AlterarLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlterarLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
