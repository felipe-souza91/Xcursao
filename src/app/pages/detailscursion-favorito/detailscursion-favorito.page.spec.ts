import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailscursionFavoritoPage } from './detailscursion-favorito.page';

describe('DetailscursionFavoritoPage', () => {
  let component: DetailscursionFavoritoPage;
  let fixture: ComponentFixture<DetailscursionFavoritoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailscursionFavoritoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailscursionFavoritoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
