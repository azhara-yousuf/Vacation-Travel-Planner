import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesfillComponent } from './packagesfill.component';

describe('PackagesfillComponent', () => {
  let component: PackagesfillComponent;
  let fixture: ComponentFixture<PackagesfillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackagesfillComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PackagesfillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
