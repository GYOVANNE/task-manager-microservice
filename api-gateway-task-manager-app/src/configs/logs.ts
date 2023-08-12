// import winston from 'winston';
import { createLogger, transports } from 'winston';
export const logger = createLogger({
  level: 'info',
  transports: [new transports.Console()],
});
export const createScopedLogger = (scope: string) => {
  return {
    error: (message: string, meta: any = {}) =>
      logger.error(message, { ...meta, scope }),
    warn: (message: string, meta: any = {}) =>
      logger.warn(message, { ...meta, scope }),
    info: (message: string, meta: any = {}) =>
      logger.info(message, { ...meta, scope }),
  };
};
