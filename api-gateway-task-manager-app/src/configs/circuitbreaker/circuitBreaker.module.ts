import { CacheManagerModule } from '@domain/cache/cache.module';
import { QueueModule } from '@domain/queue/queue.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CircuitBreakerService } from './circuitBreaker.service';

@Module({
  imports: [HttpModule, CacheManagerModule, QueueModule],
  providers: [CircuitBreakerService],
  exports: [CircuitBreakerService],
})
export class CircuitBreakerModule {}
