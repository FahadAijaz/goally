import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {Behaviour, BehaviourDocument} from "../schemas/behaviour.schema";
import {CreateBehaviourDto} from "./dto/createBehaviourDto";
import * as moment from "moment";
import {UploaderService} from '../common';


@Injectable()
export class BehaviourService {
    constructor(@InjectModel(Behaviour.name) private behaviourModel: Model<BehaviourDocument>,
                private readonly uploaderService: UploaderService) {
    }

    async createBehaviour(behaviour: CreateBehaviourDto) {
        let b = new this.behaviourModel(behaviour);
        await b.save()
        return {_id: b._id.toString(), ...behaviour };
    }

    async getBehaviours({page, from, limit, schedule}: {page: number, from: number, limit: number, schedule: string}) {
        let startTime = this.getStartDateForSchedule(schedule);
        let behaviours = await this.behaviourModel.find({dateTime: {$gte: startTime}})
            .skip(from).limit(limit)
            .sort({dateTime: 1})
            .lean()
            .select({__v: 0});

        return {behaviours: behaviours, page: page, pageSize: behaviours.length };
    }

    async deleteBehaviour(behaviourId: string) {
        return this.behaviourModel.deleteOne({_id: behaviourId})
    }

    async updateBehaviour(behaviourId: string, behaviour: CreateBehaviourDto) {
        return this.behaviourModel.updateOne({_id: behaviourId}, {...behaviour})
    }

    async uploadImage(behaviourId: string, file: Express.Multer.File) {
        let imageURL = await this.uploaderService.upload(file);
        await this.behaviourModel.updateOne({_id: behaviourId}, {imageURL: imageURL});
        return imageURL;
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
