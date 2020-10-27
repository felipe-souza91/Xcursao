import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddphotoPage } from './addphoto.page';

describe('AddphotoPage', () => {
  let component: AddphotoPage;
  let fixture: ComponentFixture<AddphotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddphotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddphotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
