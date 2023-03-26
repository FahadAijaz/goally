import {Injectable} from '@nestjs/common';
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {S3Client, PutObjectCommand,} from "@aws-sdk/client-s3";
import {S3} from "aws-sdk";
import * as process from "process";


@Injectable()
export class UploaderService {
    private readonly client: S3;
    constructor() {
        let credentials = {
            accessKeyId: process.env.ACCESS_KEY_ID,
            secretAccessKey: process.env.SECRET_ACCESS_KEY
        };
        this.client = new S3(credentials);
    }

    async upload(file: Express.Multer.File) {
        const params =
            {
                Bucket: process.env.BUCKET,
                Key: String(file.originalname),
                Body: file.buffer,
                ContentType: file.mimetype,
                ContentDisposition: "inline",
                CreateBucketConfiguration:
                    {
                        LocationConstraint: process.env.REGION
                    }
            };
        try {
            let s3Response = await this.client.upload(params).promise();
            return s3Response.Location;
        } catch (e) {
            console.log(e);
        }
    }
}
