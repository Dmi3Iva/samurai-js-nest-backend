import { Controller, Delete, HttpCode } from '@nestjs/common';
import { TestingService } from './testing.service.js';

@Controller('testing')
export class TestingController {
  constructor(private testingService: TestingService) {}

  @HttpCode(204)
  @Delete('all-data')
  async removeAll() {
    await this.testingService.removeAll();
  }
}
