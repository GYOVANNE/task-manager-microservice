import { MICROSERVICES_QUEUES } from '@config/queue.config';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ClientsRMQProxy {
  constructor(
    @Inject(MICROSERVICES_QUEUES.at(0))
    private readonly authService: ClientProxy,
    @Inject(MICROSERVICES_QUEUES.at(1))
    private readonly taskService: ClientProxy,
  ) {}

  getInstance(service: string) {
    return {
      AUTH_SERVICE_TASK_MANAGER_APP_QUEUE: this.authService,
      TASK_SERVICE_TASK_MANAGER_APP_QUEUE: this.taskService,
    }[service];
  }
}
