import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterBookComponent } from './registerBook.component';

describe('RegisterComponent', () => {
  let component: RegisterBookComponent;
  let fixture: ComponentFixture<RegisterBookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterBookComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
