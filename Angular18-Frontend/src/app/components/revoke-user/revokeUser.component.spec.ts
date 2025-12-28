import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevokeUserComponent } from './revokeUser.component';

describe('RegisterComponent', () => {
  let component: RevokeUserComponent;
  let fixture: ComponentFixture<RevokeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RevokeUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RevokeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
