import { TestBed } from '@angular/core/testing';

import { PetServicoService } from './pet-servico.service';

describe('PetServicoService', () => {
  let service: PetServicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServicoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
