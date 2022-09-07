import { Test, TestingModule } from '@nestjs/testing';
import { RindegastosService } from './rindegastos.service';

describe('RindegastosService', () => {
  let service: RindegastosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RindegastosService],
    }).compile();

    service = module.get<RindegastosService>(RindegastosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
