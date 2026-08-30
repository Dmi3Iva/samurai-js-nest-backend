import { INestApplication } from '@nestjs/common';

// TODO:: move to env
export const GLOBAL_PREFIX = 'api';

export const globalPrefixSetup = (app: INestApplication<unknown>) => {
  app.setGlobalPrefix(GLOBAL_PREFIX);
};
