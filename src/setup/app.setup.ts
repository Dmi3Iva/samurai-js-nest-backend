import { INestApplication } from '@nestjs/common';
import { corsSetup } from './cors.setup.js';
import { globalPrefixSetup } from './global-prefix.setup.js';
import { pipesSetup } from './pipes.setup.js';
import { swaggerSetup } from './swagger.setup.js';

export const appSetup = (app: INestApplication<unknown>) => {
  pipesSetup(app);
  globalPrefixSetup(app);
  swaggerSetup(app);
  corsSetup(app);
};
