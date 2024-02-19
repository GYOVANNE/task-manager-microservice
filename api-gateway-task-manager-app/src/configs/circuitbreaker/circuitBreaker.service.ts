import { ClientEnum, getBaseUrl } from '@config/clients';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { AppError } from '@shared/errors/app-errors';
import { AxiosRequestConfig, HttpStatusCode } from 'axios';
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

  constructor(private httpService: HttpService) {}

  send(
    service: ClientEnum,
    method: HttpMethodEnum,
    url: string,
    headers?: any,
    payload?: any,
  ): Observable<any> {
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
          throw new AppError(
            'Erro na comunicação com o microserviço',
            HttpStatusCode.BadGateway,
          );
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

  private _handleRetry(err: Error): Observable<unknown> {
    const isServerError =
      err.message.includes('connect ECONNREFUSED') ||
      err.message.includes('EAI_AGAIN');
    return isServerError ? timer(this.RETRY_DELAY_MS) : throwError(() => err);
  }

  private _isCommunicationError(error: any): boolean {
    return error.code === 'ECONNREFUSED' || error.code === 'EAI_AGAIN';
  }
}
