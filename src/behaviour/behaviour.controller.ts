import {
    Body,
    Query,
    ClassSerializerInterceptor,
    Controller, Delete,
    Get, Param, Patch,
    Post,
    UseInterceptors,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';

import {BehaviourService} from "./behaviour.service";
import {CreateBehaviourDto} from "./dto/createBehaviourDto";
import {Behaviour} from "../schemas/behaviour.schema";
import {serialize} from "class-transformer";

@Controller('behaviours')
export class BehaviourController {
    constructor(private readonly behaviourService: BehaviourService) {
    }

    @Post()
    @UsePipes(ValidationPipe)
    @UseInterceptors(ClassSerializerInterceptor)
    async createBehaviour(@Body() createBehaviourDto: CreateBehaviourDto) {
        await this.behaviourService.createBehaviour(createBehaviourDto)
        return createBehaviourDto;
    }
    @Get()
    async getBehaviours(@Query() { from, limit, schedule= 'TODAY' }): Promise<CreateBehaviourDto[]> {
        const behaviours = await this.behaviourService.getBehaviours(from, limit, schedule);
        let bDtos: CreateBehaviourDto[] = []
        for (let b of behaviours) {
            let bDto = new CreateBehaviourDto();
            bDto.datetime = b.dateTime;
            bDto.name = b.name;
            bDto.imageURL = b.imageURL;
            bDto.ratingPoints = b.ratingPoints;
            bDto.rating = b.rating;
            bDtos.push(bDto);
        }
        return bDtos;
    }
    @Delete(':id')
    async deleteBehaviour(@Param('id') behaviourId: string){
        await this.behaviourService.deleteBehaviour(behaviourId)
    }
    @Patch(':id')
    async updateBehaviour(@Param('id') behaviourId: string, @Body() behaviourDto: CreateBehaviourDto){
        await this.behaviourService.updateBehaviour(behaviourId, behaviourDto)
    }
}
