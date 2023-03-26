import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {HydratedDocument} from 'mongoose';
import {Expose} from "class-transformer";

export type BehaviourDocument = HydratedDocument<Behaviour>;

enum BehaviourRating {
    Positive,
    Negative,
    Neutral
}

@Schema()
export class Behaviour {
    @Prop()
    @Expose()
    name: string;

    @Prop()
    @Expose()
    imageURL: string;

    @Expose()
    @Prop({
        type: String,
        required: true,
        enum: BehaviourRating
    })
    @Expose()
    rating: BehaviourRating;

    @Expose()
    @Prop()
    dateTime: Date;

    @Expose()
    @Prop()
    ratingPoints: number;

}

export const BehaviourSchema = SchemaFactory.createForClass(Behaviour);
