import { Module } from '@nestjs/common';
import { App4Controller } from './app4.controller';
import { App4Service } from './app4.service';

@Module({
  imports: [],
  controllers: [App4Controller],
  providers: [App4Service],
})
export class App4Module {}
