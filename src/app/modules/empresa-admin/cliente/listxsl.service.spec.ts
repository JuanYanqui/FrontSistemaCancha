import { TestBed } from '@angular/core/testing';

import { ListxslService } from './listxsl.service';

describe('ListxslService', () => {
  let service: ListxslService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListxslService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
