import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BehaviourModule} from './behaviour/behaviour.module';
import {MongooseModule} from "@nestjs/mongoose";
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';
import * as process from "process";


@Module({
    imports: [
        BehaviourModule,
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_URI),
        CommonModule,

    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
