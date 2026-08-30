import { INestApplication } from '@nestjs/common';

export const corsSetup = (app: INestApplication<unknown>) => {
  app.enableCors();
};
