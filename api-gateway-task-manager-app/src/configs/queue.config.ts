import { env } from 'env';

/**
 * Microservice name
 */
export const QUEUE_SERVICE = '';

/**
 * RabbitMQ url
 */
export const RABBITMQ_URL = env.TASK_MANAGER_QUEUE_URL;

export const MICROSERVICES_QUEUES = [
  'AUTH_SERVICE_TASK_MANAGER_APP_QUEUE',
  'TASK_SERVICE_TASK_MANAGER_APP_QUEUE'
];
