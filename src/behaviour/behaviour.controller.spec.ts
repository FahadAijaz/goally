import { Test, TestingModule } from '@nestjs/testing';
import { BehaviourController } from './behaviour.controller';

describe('BehaviourController', () => {
  let controller: BehaviourController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BehaviourController],
    }).compile();

    controller = module.get<BehaviourController>(BehaviourController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
