import { ClientEnum, getBaseUrl } from '@config/clients';
import { CacheManagerService } from '@domain/cache/cache.service';
import { QueueService } from '@domain/queue/queue.service';
import { HttpService } from '@nestjs/axios';
import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { AppError } from '@shared/errors/app-errors';
import { stringToMiliseconds } from '@shared/helpers/helper';
import { AxiosRequestConfig } from 'axios';
import {
  Observable,
  catchError,
  map,
  retry,
  take,
  throwError,
  timer,
} from 'rxjs';

@Injectable()
export class CircuitBreakerService {
  private readonly MAX_RETRIES = 3; // retry 3 times
  private readonly RETRY_DELAY_MS = 1000;
  private readonly ERROR_MESSAGE = 'Serviço indisponível no momento';

  constructor(
    private readonly httpService: HttpService,
    private readonly queueService: QueueService,
    private readonly cache: CacheManagerService,
  ) {}

  async send(
    service: ClientEnum,
    method: HttpMethodEnum,
    url: string,
    headers?: any,
    payload?: any,
  ): Promise<Observable<any>> {
    await this._checkIfStateIsOpen(service);
    if (headers && 'content-length' in headers) {
      delete headers['content-length'];
    }

    const axiosConfig: AxiosRequestConfig = {
      baseURL: getBaseUrl(service),
      method,
      url,
      headers,
      timeout: 5000,
      data: payload,
    };
    return this.httpService.request(axiosConfig).pipe(
      retry({
        delay: (err) => this._handleRetry(err),
        count: this.MAX_RETRIES,
      }),
      catchError(async (error) => {
        if (this._isCommunicationError(error)) {
          await this._setStateToOpen(service);
        }
        throw new AppError(
          JSON.stringify(error.response.data),
          error.response.status,
        );
      }),
      take(this.MAX_RETRIES),
      map((message) => ({ response: message.data })),
    );
  }

  sendToQueue(pattern: string, payload: any, clientService: ClientEnum) {
    return this.queueService.handleEmit({
      pattern,
      client: clientService,
      payload,
    });
  }

  private async _checkIfStateIsOpen(service: string) {
    const result = (await this.cache.get(
      `${service.toLocaleLowerCase()}_cb`,
    )) as { state: boolean };
    if (result?.state) {
      throw new AppError(this.ERROR_MESSAGE, HttpStatus.BAD_GATEWAY);
    }
  }

  private async _setStateToOpen(service: string): Promise<void> {
    await this.cache.save(
      `${service.toLocaleLowerCase()}_cb`,
      { state: true },
      stringToMiliseconds('60s'),
    );
    throw new AppError(this.ERROR_MESSAGE, HttpStatus.BAD_GATEWAY);
  }

  private _handleRetry(err: Error, retry = true): Observable<unknown> {
    if (!retry) {
      return;
    }
    const isServerError =
      err.message.includes('connect ECONNREFUSED') ||
      err.message.includes('EAI_AGAIN');
    return isServerError ? timer(this.RETRY_DELAY_MS) : throwError(() => err);
  }

  private _isCommunicationError(error: any): boolean {
    return error.code === 'ECONNREFUSED' || error.code === 'EAI_AGAIN';
  }
}
