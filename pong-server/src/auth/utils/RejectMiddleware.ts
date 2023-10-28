import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RejectMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.query.error === 'access_denied') {
      res.redirect('http://e1r9p3.1337.ma:3001/');
    }
    next();
  }
}
