import { TaskMicroservice } from '@domain/microservices/task/task.service';
import { Controller, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller({ version: '1', path: 'api' })
@UseGuards(ThrottlerGuard)
export class TaskGatewayV1Controller {
  constructor(private readonly service: TaskMicroservice) {}
}
