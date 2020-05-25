import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EllaisysLibComponent } from './ellaisys-lib.component';

describe('EllaisysLibComponent', () => {
  let component: EllaisysLibComponent;
  let fixture: ComponentFixture<EllaisysLibComponent>;

  beforeEach(async(() => {
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
