import { CircuitBreakerService } from '@config/circuitbreaker/circuitBreaker.service';
import { ClientEnum } from '@config/clients';
import { Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { firstValueFrom } from 'rxjs';
import { ICreateTaskDTO } from './dto/task';

@Injectable()
export class TaskMicroservice {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}

  async healthCheck() {
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.GET,
        'health-check',
      ),
    );
  }

  async getAll(req: any) {
    const { headers } = req;

    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.GET,
        'tasks',
        headers,
      ),
    );
  }

  async create(req: any, body: ICreateTaskDTO) {
    const { headers } = req;
    const payload = { ...body };
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.POST,
        '/tasks',
        headers,
        payload,
      ),
    );
  }

  async show(req: any, body: any) {
    const { headers } = req;
    const id = body.id;
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.GET,
        `tasks/${id}`,
        headers,
      ),
    );
  }

  async update(req: any, param: any, body: any) {
    const { headers } = req;
    const id = param.id;
    const payload = { ...body };
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.PUT,
        `tasks/${id}`,
        headers,
        payload,
      ),
    );
  }

  async delete(req: any, param: any) {
    const { headers } = req;
    const id = param.id;
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.TASK,
        HttpMethodEnum.DELETE,
        `tasks/${id}`,
        headers,
      ),
    );
  }
}
