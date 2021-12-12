import { ValidationError } from 'express-validator';

export class ResponseError {
  msg: string;

  constructor(msg:string) {
    this.msg = msg;
  }
}
