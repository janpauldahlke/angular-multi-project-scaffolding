import { TestBed } from '@angular/core/testing';

import { MyZpaService } from './my-zpa.service';

describe('MyZpaService', () => {
  let service: MyZpaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyZpaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
