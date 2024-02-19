import { MICROSERVICES_QUEUES, RABBITMQ_URL } from '@config/queue.config';
import { INestApplication } from '@nestjs/common';
import {
  ClientsModuleOptions,
  RmqContext,
  Transport,
} from '@nestjs/microservices';


export type QueuePayload = {
  client: string;
  pattern: { cmd: string; pass: string };
  payload?: any;
};

export type QueueResponse = {
  route: string;
  payload: any;
};

export const clientQueueConfig = (): ClientsModuleOptions => {
  return MICROSERVICES_QUEUES.map((queue: string) => {
    return {
      name: queue,
      transport: Transport.RMQ,
      options: {
        urls: [RABBITMQ_URL],
        queue: queue,
        noAck: false,
        queueOptions: {
          durable: true,
        },
      },
    };
  });
};

export function startQueueListener(app: INestApplication): void {
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [RABBITMQ_URL],
      queue: MICROSERVICES_QUEUES.at(0),
      noAck: false,
      queueOptions: {
        durable: true,
      },
    },
  });
}

export function closeChannel(context: RmqContext): void {
  const channel = context.getChannelRef();
  const originalMsg = context.getMessage();
  channel.ack(originalMsg);
}
