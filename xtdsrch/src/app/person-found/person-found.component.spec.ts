import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonFoundComponent } from './person-found.component';

describe('PersonFoundComponent', () => {
  let component: PersonFoundComponent;
  let fixture: ComponentFixture<PersonFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
