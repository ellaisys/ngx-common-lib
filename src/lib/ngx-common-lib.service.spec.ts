import { TestBed } from '@angular/core/testing';

import { NgxCommonLibService } from './ngx-common-lib.service';

describe('NgxCommonLibService', () => {
  let service: NgxCommonLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxCommonLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
