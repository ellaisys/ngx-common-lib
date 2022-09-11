import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EllaisysLibComponent } from './ngx-common-lib.component';

describe('EllaisysLibComponent', () => {
  let component: EllaisysLibComponent;
  let fixture: ComponentFixture<EllaisysLibComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EllaisysLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EllaisysLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
