import {Injectable, NestMiddleware} from '@nestjs/common';

@Injectable()
export class PagerMiddleware implements NestMiddleware {
    use(req: any, res: any, next: () => void) {
        req.query.page = +req.query.page || 0;
        req.query.limit = +req.query.limit || 10;
        req.query.from = (req.query.page - 1) * req.query.limit;
        next();
    }
}
