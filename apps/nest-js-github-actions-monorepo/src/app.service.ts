import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World from NEST-JS-GITHUB-ACTIONS-MONOREPO!';
  }
}
