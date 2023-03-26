
import {IsEnum, IsNumber, IsString} from 'class-validator';

/**
 * https://github.com/typestack/class-validator#validation-decorators
 * https://docs.nestjs.com/techniques/serialization
 */
export enum BehaviourRating {
    Positive = 0,
    Negative = 1,
    Neutral = 2
}


export class CreateBehaviourDto {
    @IsString()
    public name!: string;

    @IsString()
    public imageURL: string;


    public datetime!: Date;

    @IsEnum(BehaviourRating)
    public rating!: BehaviourRating;

    @IsNumber()
    public ratingPoints!: number;
}
