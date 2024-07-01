import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpackagesComponent } from './adminpackages.component';

describe('AdminpackagesComponent', () => {
  let component: AdminpackagesComponent;
  let fixture: ComponentFixture<AdminpackagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminpackagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminpackagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
