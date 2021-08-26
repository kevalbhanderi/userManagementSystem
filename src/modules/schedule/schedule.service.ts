import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  @Cron(CronExpression.EVERY_DAY_AT_10AM)
  handleCron() {
    this.logger.debug("Let's go for Coffee");
  }

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  handleNewCron() {
    console.log('Good Morning !');
  }
}
