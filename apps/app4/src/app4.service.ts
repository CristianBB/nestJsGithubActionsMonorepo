import { Injectable } from '@nestjs/common';

@Injectable()
export class App4Service {
  getHello(): string {
    return 'Hello World!';
  }
}
