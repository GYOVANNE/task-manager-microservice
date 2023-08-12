import { AuthMicroservice } from '@domain/microservices/auth/auth.service';
import { TaskMicroservice } from '@domain/microservices/task/task.service';
import { Controller, Get } from '@nestjs/common';
import { env } from 'env';
import { map, zip } from 'rxjs';

@Controller()
export class HealthCheckController {
  constructor(
    private readonly authMicroservice: AuthMicroservice,
    private readonly taskMicroservice: TaskMicroservice,
  ) {}

  @Get()
  getApi() {
    return 'Welcome to ' + env.APP_NAME;
  }
  sucess = () => 200;
  error = () => 404;

  @Get('health-check')
  async healthCheck() {
    return zip(
      this.authMicroservice.healthCheck().then(this.sucess).catch(this.error),
    ).pipe(map(([authMicroservice]) => ({ authMicroservice })));
  }
}
