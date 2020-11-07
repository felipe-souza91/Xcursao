import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailParticiparPage } from './detail-participar.page';

describe('DetailParticiparPage', () => {
  let component: DetailParticiparPage;
  let fixture: ComponentFixture<DetailParticiparPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailParticiparPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailParticiparPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
