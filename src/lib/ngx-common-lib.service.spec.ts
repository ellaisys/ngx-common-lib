import { TestBed } from '@angular/core/testing';

import { EllaisysLibService } from './ngx-common-lib.service';

describe('EllaisysLibService', () => {
  let service: EllaisysLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EllaisysLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
