import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkFoundComponent } from './work-found.component';

describe('WorkFoundComponent', () => {
  let component: WorkFoundComponent;
  let fixture: ComponentFixture<WorkFoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkFoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
