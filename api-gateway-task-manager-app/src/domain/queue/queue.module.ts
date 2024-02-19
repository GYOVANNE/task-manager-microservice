import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ClientsRMQProxy } from './client.rmq.proxy';
import { clientQueueConfig } from './queue';
import { QueueService } from './queue.service';

@Module({
  imports: [ClientsModule.register(clientQueueConfig())],
  providers: [QueueService, ClientsRMQProxy],
  exports: [QueueService],
})
export class WintQueueModule {}
