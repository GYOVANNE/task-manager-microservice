import { CircuitBreakerService } from '@config/circuitbreaker/circuitBreaker.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskMicroservice {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}
}
