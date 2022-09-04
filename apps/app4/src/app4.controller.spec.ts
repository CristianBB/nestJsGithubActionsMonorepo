import { Test, TestingModule } from '@nestjs/testing';
import { App4Controller } from './app4.controller';
import { App4Service } from './app4.service';

describe('App4Controller', () => {
  let app4Controller: App4Controller;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [App4Controller],
      providers: [App4Service],
    }).compile();

    app4Controller = app.get<App4Controller>(App4Controller);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(app4Controller.getHello()).toBe('Hello World!');
    });
  });
});
