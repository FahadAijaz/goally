import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import { BehaviourController } from './behaviour.controller';
import { BehaviourService } from './behaviour.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Behaviour, BehaviourSchema} from "../schemas/behaviour.schema";
import {PagerMiddleware} from "../common/middleware/pager.middleware";
import {CommonModule} from "../common/common.module";

@Module({
  imports: [MongooseModule.forFeature([{ name: Behaviour.name, schema: BehaviourSchema }]), CommonModule],
  controllers: [BehaviourController],
  providers: [BehaviourService]
})
export class BehaviourModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PagerMiddleware)
        .forRoutes({ path: 'behaviours', method: RequestMethod.GET })
  }
}
