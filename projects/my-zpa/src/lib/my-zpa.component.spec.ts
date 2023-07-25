import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyZpaComponent } from './my-zpa.component';

describe('MyZpaComponent', () => {
  let component: MyZpaComponent;
  let fixture: ComponentFixture<MyZpaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyZpaComponent]
    });
    fixture = TestBed.createComponent(MyZpaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
