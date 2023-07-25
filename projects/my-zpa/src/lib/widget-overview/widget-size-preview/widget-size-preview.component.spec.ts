import {ComponentFixture, TestBed} from "@angular/core/testing";
import { WidgetSizePreviewComponent } from './widget-size-preview.component';


describe('WidgetSizePreviewComponent', () => {
  let component: WidgetSizePreviewComponent;
  let fixture: ComponentFixture<WidgetSizePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetSizePreviewComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetSizePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create empty array', function () {
    component.optimalHeight = 0;
    component.optimalWidth = 0;
    component.ngOnInit();
    let expected = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false]
    ]
    expect(component.cells).toEqual(expected);
  });

  it('should create full array', function () {
    component.optimalHeight = 10;
    component.optimalWidth = 10;
    component.ngOnInit();
    let expected = [
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true],
      [true, true, true, true, true, true]
    ]
    expect(component.cells).toEqual(expected);
  });

  it('should create correct array', function () {
    component.optimalHeight = 2;
    component.optimalWidth = 4;
    component.ngOnInit();
    let expected = [
      [true, true, true, true, false, false],
      [true, true, true, true, false, false],
      [false, false, false, false, false, false]
    ]
    expect(component.cells).toEqual(expected);
  });
});
