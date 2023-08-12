import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  APP_PORT: z.coerce.number().default(3000),
  APP_NAME: z.string().default('Api Gateway'),
  AUTH_MICROSERVICE_HOST: z
    .string()
    .default('http://auth-service-task-manager-app-nginx'),
  AUTH_MICROSERVICE_PORT: z.coerce.number().default(80),
  TASK_MICROSERVICE_HOST: z
    .string()
    .default('http://task-service-task-manager-app'),
  TASK_MICROSERVICE_PORT: z.coerce.number().default(4001),
  RATE_LIMIT_TTL: z.coerce.number().default(60),
  RATE_LIMIT_LIMIT: z.coerce.number().default(30),
  REDIS_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error('Ivalid environment variables', _env.error.format());

  throw new Error('Invalid environment variables.');
}

export const env = _env.data;
