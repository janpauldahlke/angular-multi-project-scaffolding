import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopicFilterComponent } from './topic-filter.component';
import { IconPipe } from '../../shared/pipes/icon.pipe';
import { AssociatedTopic } from '../../shared/models/associated-topic';


describe('TopicFilterComponent', () => {
  let component: TopicFilterComponent;
  let fixture: ComponentFixture<TopicFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TopicFilterComponent, IconPipe ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopicFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle item correctly', () => {
    component.toggleItem(AssociatedTopic.Labor);
    expect(component.selectedItems).toHaveLength(1);
    expect(component.selectedItems[0]).toEqual(AssociatedTopic.Labor);

    component.toggleItem(AssociatedTopic.Termine);
    expect(component.selectedItems).toHaveLength(2);
    expect(component.selectedItems[1]).toEqual(AssociatedTopic.Termine);

    component.toggleItem(AssociatedTopic.Labor);
    expect(component.selectedItems).toHaveLength(1);
    expect(component.selectedItems[0]).toEqual(AssociatedTopic.Termine);
  });

  it('should reset selection', () => {
    component.selectedItems = [AssociatedTopic.Termine, AssociatedTopic.Formulare, AssociatedTopic.Labor];
    component.resetSelection();
    expect(component.selectedItems).toHaveLength(0);
  });
});
