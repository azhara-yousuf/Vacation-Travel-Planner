import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Puhotelimg1Component } from './puhotelimg1.component';

describe('Puhotelimg1Component', () => {
  let component: Puhotelimg1Component;
  let fixture: ComponentFixture<Puhotelimg1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Puhotelimg1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Puhotelimg1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
