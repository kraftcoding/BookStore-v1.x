import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBooksComponent } from './listBooks.component';

describe('RegisterComponent', () => {
  let component: ListBooksComponent;
  let fixture: ComponentFixture<ListBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
