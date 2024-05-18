import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('webhook')
  async webhook(@Body() reqBody: any): Promise<string> {
    await this.appService.handleReply(reqBody);
    return 'Success';
  }
}
