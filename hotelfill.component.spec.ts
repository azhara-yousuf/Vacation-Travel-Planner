import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelfillComponent } from './hotelfill.component';

describe('HotelfillComponent', () => {
  let component: HotelfillComponent;
  let fixture: ComponentFixture<HotelfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HotelfillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HotelfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
