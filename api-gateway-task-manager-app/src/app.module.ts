import { AuthGatewayV1Controller } from '@domain/gateway/auth.gateway.v1.controller';
import { TaskGatewayV1Controller } from '@domain/gateway/task.gateway.v1.controller';
import { HealthCheckController } from '@domain/health-check/health.check.controller';
import { AuthMicroserviceModule } from '@domain/microservices/auth/auth.module';
import { TaskMicroserviceModule } from '@domain/microservices/task/task.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ThrottlerModule } from '@nestjs/throttler';
import { redisStore } from 'cache-manager-redis-yet';
import { env } from 'env';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      ttl: env.RATE_LIMIT_TTL,
      limit: env.RATE_LIMIT_LIMIT,
    }),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      isGlobal: false,
      useFactory: async () => ({
        store: await redisStore({
          url: env.REDIS_URL,
          ttl: 1000 * 60,
        }),
      }),
    }),
    AuthMicroserviceModule,
    TaskMicroserviceModule,
  ],
  controllers: [
    HealthCheckController,
    AuthGatewayV1Controller,
    TaskGatewayV1Controller,
  ],
  providers: [JwtService],
})
export class AppModule {}
