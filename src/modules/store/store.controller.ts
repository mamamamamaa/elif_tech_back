import { Controller, Get } from '@nestjs/common';

@Controller('store')
export class StoreController {
  @Get()
  helloStore() {
    return 'Hello store';
  }
}
