import {
    Body,
    Query,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param, Patch,
    Post,
    UseInterceptors,
    UsePipes,
    ValidationPipe, UploadedFile
} from '@nestjs/common';

import {BehaviourService} from "./behaviour.service";
import {CreateBehaviourDto} from "./dto/createBehaviourDto";
import {FileInterceptor} from "@nestjs/platform-express";


@Controller('behaviours')
export class BehaviourController {
    constructor(private readonly behaviourService: BehaviourService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async createBehaviour(@Body() createBehaviourDto: CreateBehaviourDto) {
        let behaviour = await this.behaviourService.createBehaviour(createBehaviourDto);
        return behaviour;
    }

    @Get()
    async getBehaviours(@Query() {page, from, limit, schedule = 'TODAY'}) {
        const behaviours = await this.behaviourService.getBehaviours({page, from, limit, schedule});
        return behaviours;
    }

    @Delete(':id')
    async deleteBehaviour(@Param('id') behaviourId: string) {
        await this.behaviourService.deleteBehaviour(behaviourId)
    }

    @Patch(':id')
    async updateBehaviour(@Param('id') behaviourId: string, @Body() behaviourDto: CreateBehaviourDto) {
        await this.behaviourService.updateBehaviour(behaviourId, behaviourDto)
    }

    @Post(':id/image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@Param('id') behaviourId: string, @UploadedFile() file: Express.Multer.File) {
        const imageUrl = await this.behaviourService.uploadImage(behaviourId, file);
        return {imageURL: imageUrl}
    }
}
