import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSearchFormComponent } from './person-search-form.component';

describe('PersonSearchFormComponent', () => {
  let component: PersonSearchFormComponent;
  let fixture: ComponentFixture<PersonSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
