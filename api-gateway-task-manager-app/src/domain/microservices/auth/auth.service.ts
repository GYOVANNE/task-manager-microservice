import { CircuitBreakerService } from '@config/circuitbreaker/circuitBreaker.service';
import { ClientEnum } from '@config/clients';
import { Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { firstValueFrom } from 'rxjs';
import { ICreateUserDTO, ILoginDTO } from './dto/user.dto';

@Injectable()
export class AuthMicroservice {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}

  async healthCheck() {
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.GET,
        'health-check',
      ),
    );
  }

  async signup(req: any, body: ICreateUserDTO) {
    const { headers } = req;
    const payload = { headers, ...body };
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.POST,
        'register',
        headers,
        payload,
      ),
    );
  }

  async signin(req: any, body: ILoginDTO) {
    const { headers } = req;
    const payload = { headers, deviceId: headers.deviceid, ...body };
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.POST,
        'login',
        headers,
        payload,
      ),
    );
  }

  async userMe(req: any) {
    const { headers } = req;
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.GET,
        '/me',
        headers,
      ),
    );
  }

  async logout(req: any) {
    const { headers } = req;
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.POST,
        '/logout',
        headers,
      ),
    );
  }

  async refresh(req: any) {
    const { headers } = req;
    return await firstValueFrom(
      await this.circuitbreaker.send(
        ClientEnum.AUTH,
        HttpMethodEnum.POST,
        '/refresh',
        headers,
      ),
    );
  }
}
