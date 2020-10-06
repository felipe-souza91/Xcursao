import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AlteruserPage } from './alteruser.page';

describe('AlteruserPage', () => {
  let component: AlteruserPage;
  let fixture: ComponentFixture<AlteruserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlteruserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AlteruserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
