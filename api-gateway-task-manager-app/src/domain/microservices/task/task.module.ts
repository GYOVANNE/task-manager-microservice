import { CircuitBreakerModule } from '@config/circuitbreaker/circuitBreaker.module';
import { Module } from '@nestjs/common';
import { TaskMicroservice } from './task.service';

@Module({
  imports: [CircuitBreakerModule],
  providers: [TaskMicroservice],
  exports: [TaskMicroservice],
})
export class TaskMicroserviceModule {}

