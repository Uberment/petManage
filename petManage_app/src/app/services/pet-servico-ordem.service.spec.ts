import { TestBed } from '@angular/core/testing';

import { PetServicoOrdemService } from './pet-servico-ordem.service';

describe('PetServicoOrdemService', () => {
  let service: PetServicoOrdemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetServicoOrdemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
