import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GpsPage } from './gps.page';

describe('GpsPage', () => {
  let component: GpsPage;
  let fixture: ComponentFixture<GpsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GpsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
