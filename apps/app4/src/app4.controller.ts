import { Controller, Get } from '@nestjs/common';
import { App4Service } from './app4.service';

@Controller()
export class App4Controller {
  constructor(private readonly app4Service: App4Service) {}

  @Get()
  getHello(): string {
    return this.app4Service.getHello();
  }
}
