import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSearchBooksComponent } from './listsearch-books.component';

describe('RegisterComponent', () => {
  let component: ListSearchBooksComponent;
  let fixture: ComponentFixture<ListSearchBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSearchBooksComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListSearchBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
