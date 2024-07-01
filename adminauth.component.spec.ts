import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminauthComponent } from './adminauth.component';

describe('AdminauthComponent', () => {
  let component: AdminauthComponent;
  let fixture: ComponentFixture<AdminauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminauthComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
