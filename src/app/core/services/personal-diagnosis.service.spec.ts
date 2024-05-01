import { TestBed } from '@angular/core/testing';

import { PersonalDiagnosisServiceService } from './personal-diagnosis.service';

describe('PersonalDiagnosisServiceService', () => {
  let service: PersonalDiagnosisServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalDiagnosisServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
