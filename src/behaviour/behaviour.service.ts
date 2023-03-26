import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Behaviour, BehaviourDocument} from "../schemas/behaviour.schema";
import {CreateBehaviourDto, BehaviourRating} from "./dto/createBehaviourDto";
import * as moment from "moment";


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
        let startTime = this.getStartDateForSchedule(schedule);
        return this.behaviourModel.find({dateTime: {$gte: startTime}})
            .skip(from).limit(limit)
            .sort({dateTime: 1})
            .lean()
    }

    async deleteBehaviour(behaviourId: string) {
        return this.behaviourModel.deleteOne({_id: behaviourId})
    }

    async updateBehaviour(behaviourId: string, behaviour: CreateBehaviourDto) {
        return this.behaviourModel.updateOne({_id: behaviourId}, {...behaviour})
    }

    private getStartDateForSchedule(schedule: string) {
        let startTime = new Date();
        if (schedule == "TODAY") {
            startTime.setUTCHours(0, 0, 0, 0);
        } else if (schedule == "WEEK") {
            startTime = moment(startTime).subtract(1, 'weeks').toDate();
        } else if (schedule == "MONTH") {
            startTime = moment(startTime).subtract(1, 'month').toDate();
        }
        return startTime;
    }
}
