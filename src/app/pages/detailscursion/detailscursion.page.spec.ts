import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailscursionPage } from './detailscursion.page';

describe('DetailscursionPage', () => {
  let component: DetailscursionPage;
  let fixture: ComponentFixture<DetailscursionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscursionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailscursionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
