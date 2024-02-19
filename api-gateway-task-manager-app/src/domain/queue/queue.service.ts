import { Injectable } from '@nestjs/common';
import { ClientsRMQProxy } from './client.rmq.proxy';
import { QueuePayload } from './queue';

@Injectable()
export class QueueService {
  constructor(private readonly clients: ClientsRMQProxy) {}

  handleEmit(params: QueuePayload): { response: string } {
    try {
      this.clients
        .getInstance(`${params.client}_QUEUE`)
        .emit(params.pattern, params.payload);
      return { response: 'Dados enviados com sucesso' };
    } catch (error) {
      console.error('Error to publish in queue', error);
    }
  }
}
