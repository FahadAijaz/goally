import {Module} from '@nestjs/common';
import {LoggingInterceptor} from "./interceptors/logging.interceptor";
import {APP_INTERCEPTOR} from "@nestjs/core";
import {UploaderService} from './providers/uploader/uploader.service';

@Module({
    providers: [
        {provide: APP_INTERCEPTOR, useClass: LoggingInterceptor},
        UploaderService
    ],
    exports: [UploaderService]
})
export class CommonModule {
}
