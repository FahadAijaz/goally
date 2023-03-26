import { Test, TestingModule } from '@nestjs/testing';
import { BehaviourService } from './behaviour.service';

describe('BehaviourService', () => {
  let service: BehaviourService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BehaviourService],
    }).compile();

    service = module.get<BehaviourService>(BehaviourService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
