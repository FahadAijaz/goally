import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Behaviour, BehaviourDocument} from "../schemas/behaviour.schema";
import {CreateBehaviourDto, BehaviourRating} from "./dto/createBehaviourDto";
import moment from "moment";


@Injectable()
export class BehaviourService {
    constructor(@InjectModel(Behaviour.name) private behaviourModel: Model<BehaviourDocument>) {
    }

    async createBehaviour(behaviour: CreateBehaviourDto) {
        let b = new Behaviour();
        console.error(behaviour);
        b.dateTime = behaviour.datetime;
        b.name = behaviour.name;
        b.imageURL = behaviour.imageURL;
        b.ratingPoints = behaviour.ratingPoints;
        b.rating = behaviour.rating;

        await this.behaviourModel.create(b);
    }

    getBehaviours = async (from: number, limit: number, schedule: string) => {
        let startTime, endTime
        if (schedule == "TODAY") {
            startTime = new Date();
            startTime.setUTCHours(0, 0, 0, 0);

        } else if (schedule == "WEEK") {
            startTime = moment().subtract(1, 'weeks');
        } else if (schedule == "MONTH") {
            startTime = moment().subtract(1, 'month');
        }
        endTime = new Date();
        return this.behaviourModel.find({dateTime: {$lte: startTime, $gte: endTime}})
            .skip(from).limit(limit).lean()
    }

    async deleteBehaviour(behaviourId: string) {
        return this.behaviourModel.deleteOne({_id: behaviourId})
    }

    async updateBehaviour(behaviourId: string, behaviour: CreateBehaviourDto) {
        return this.behaviourModel.updateOne({_id: behaviourId}, {...behaviour})
    }
}
