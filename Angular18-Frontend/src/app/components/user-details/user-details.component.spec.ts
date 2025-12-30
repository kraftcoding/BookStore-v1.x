import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersDetailsComponent } from './user-details.component';

describe('EditUserComponent', () => {
  let component: UsersDetailsComponent;
  let fixture: ComponentFixture<UsersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
