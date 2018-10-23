import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSearchFormComponent } from './work-search-form.component';

describe('WorkSearchFormComponent', () => {
  let component: WorkSearchFormComponent;
  let fixture: ComponentFixture<WorkSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
