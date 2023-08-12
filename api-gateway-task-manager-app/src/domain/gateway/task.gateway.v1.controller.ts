import { ICreateTaskDTO } from '@domain/microservices/task/dto/task';
import { TaskMicroservice } from '@domain/microservices/task/task.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller({ version: '1', path: 'api' })
@UseGuards(ThrottlerGuard)
export class TaskGatewayV1Controller {
  constructor(private readonly service: TaskMicroservice) {}

  @Get('/tasks')
  getAll(@Req() req: any) {
    return this.service.getAll(req);
  }

  @Get('/tasks/:id')
  show(@Req() req: any, @Param() param: any) {
    return this.service.show(req, param);
  }

  @Post('/tasks')
  create(@Req() req: any, @Body() body: ICreateTaskDTO) {
    return this.service.create(req, body);
  }

  @Put('/tasks/:id')
  update(@Req() req: any, @Param() param: any, @Body() body: ICreateTaskDTO) {
    return this.service.update(req, param, body);
  }

  @Delete('/tasks/:id')
  delete(@Req() req: any, @Param() param: any) {
    return this.service.delete(req, param);
  }
}
