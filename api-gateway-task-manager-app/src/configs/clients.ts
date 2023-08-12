import { env } from 'env';

export enum ClientEnum {
  AUTH = 'AUTH',
}

function concatUrl(host: string, port: number, extra?: string): string {
  return host + ':' + port + (extra ? '/' + extra : '');
}

export function getBaseUrl(client: ClientEnum): string {
  return {
    AUTH: concatUrl(
      env.AUTH_MICROSERVICE_HOST,
      env.AUTH_MICROSERVICE_PORT,
      'v1/api',
    ),
  }[client];
}
