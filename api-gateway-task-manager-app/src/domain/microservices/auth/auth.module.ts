import { CircuitBreakerModule } from '@config/circuitbreaker/circuitBreaker.module';
import { Module } from '@nestjs/common';
import { AuthMicroservice } from './auth.service';

@Module({
  imports: [CircuitBreakerModule],
  providers: [AuthMicroservice],
  exports: [AuthMicroservice],
})
export class AuthMicroserviceModule {}
