import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxCommonLibComponent } from './ngx-common-lib.component';

describe('NgxCommonLibComponent', () => {
  let component: NgxCommonLibComponent;
  let fixture: ComponentFixture<NgxCommonLibComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCommonLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCommonLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
