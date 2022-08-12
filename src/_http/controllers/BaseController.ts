import { Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class BaseController {
  notFound(res: Response): void {
    res.status(404).send('Not found');
  }

  unauthorized(res: Response): void {
    res.status(401).send('Not found');
  }

  notCreated(res: Response): void {
    res.status(400).send('Not created');
  }

  ok(res: Response, content?: any): void {
    if (!content) {
      res.sendStatus(200);
    } else {
      res.status(200).json(content);
    }
  }

  created(res: Response, content: any): void {
    res.status(201).send(content);
  }

  updated(res: Response, content: any): void {
    res.status(200).json({ msg: 'Updated successfully', data: content });
  }

  deleted(res: Response, content: any): void {
    res.status(201).json({ msg: 'Deleted successfully', data: content });
  }
}
