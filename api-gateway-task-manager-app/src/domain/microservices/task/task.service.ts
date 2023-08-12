import { CircuitBreakerService } from '@config/circuitbreaker/circuitBreaker.service';
import { ClientEnum } from '@config/clients';
import { Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { ICreateTaskDTO } from './dto/task';

@Injectable()
export class TaskMicroservice {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}

  async healthCheck() {
    return this.circuitbreaker
      .send(ClientEnum.TASK, HttpMethodEnum.GET, 'health-check')
      .toPromise();
  }

  async getAll(req: any) {
    const { headers } = req;

    return this.circuitbreaker
      .send(ClientEnum.TASK, HttpMethodEnum.GET, 'tasks', headers)
      .toPromise();
  }

  async create(req: any, body: ICreateTaskDTO) {
    const { headers } = req;
    const payload = { ...body };
    return this.circuitbreaker
      .send(ClientEnum.TASK, HttpMethodEnum.POST, '/tasks', headers, payload)
      .toPromise();
  }

  async show(req: any, body: any) {
    const { headers } = req;
    const id = body.id;
    return this.circuitbreaker
      .send(ClientEnum.TASK, HttpMethodEnum.GET, `tasks/${id}`, headers)
      .toPromise();
  }

  async update(req: any, param: any, body: any) {
    const { headers } = req;
    const id = param.id;
    const payload = { ...body };
    return this.circuitbreaker
      .send(
        ClientEnum.TASK,
        HttpMethodEnum.PUT,
        `tasks/${id}`,
        headers,
        payload,
      )
      .toPromise();
  }

  async delete(req: any, param: any) {
    const { headers } = req;
    const id = param.id;
    return this.circuitbreaker
      .send(ClientEnum.TASK, HttpMethodEnum.DELETE, `tasks/${id}`, headers)
      .toPromise();
  }
}
