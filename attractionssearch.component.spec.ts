import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttractionssearchComponent } from './attractionssearch.component';

describe('AttractionssearchComponent', () => {
  let component: AttractionssearchComponent;
  let fixture: ComponentFixture<AttractionssearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttractionssearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttractionssearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
