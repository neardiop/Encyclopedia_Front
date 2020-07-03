import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatablesMissionsComponent } from './datatables-missions.component';

describe('DatatablesMissionsComponent', () => {
  let component: DatatablesMissionsComponent;
  let fixture: ComponentFixture<DatatablesMissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatablesMissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatablesMissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
