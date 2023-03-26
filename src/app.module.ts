import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {BehaviourModule} from './behaviour/behaviour.module';
import {MongooseModule} from "@nestjs/mongoose";
import { CommonModule } from './common/common.module';

@Module({
    imports: [
        BehaviourModule,
        MongooseModule.forRoot('mongodb://localhost/goally'),
        CommonModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
