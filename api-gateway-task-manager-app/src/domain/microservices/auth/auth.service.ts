import { CircuitBreakerService } from '@config/circuitbreaker/circuitBreaker.service';
import { ClientEnum } from '@config/clients';
import { Injectable } from '@nestjs/common';
import { HttpMethodEnum } from '@shared/enums/enums';
import { ICreateUserDTO, ILoginDTO } from './dto/user.dto';

@Injectable()
export class AuthMicroservice {
  constructor(private readonly circuitbreaker: CircuitBreakerService) {}

  async healthCheck() {
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.GET, 'health-check')
      .toPromise();
  }

  async signup(req: any, body: ICreateUserDTO) {
    const { headers } = req;
    const payload = { headers, ...body };
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.POST, 'register', headers, payload)
      .toPromise();
  }

  async signin(req: any, body: ILoginDTO) {
    const { headers } = req;
    const payload = { headers, deviceId: headers.deviceid, ...body };
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.POST, 'login', headers, payload)
      .toPromise();
  }

  async userMe(req: any) {
    const { headers } = req;
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.GET, '/me', headers)
      .toPromise();
  }

  async logout(req: any) {
    const { headers } = req;
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.POST, '/logout', headers)
      .toPromise();
  }

  async refresh(req: any) {
    const { headers } = req;
    return this.circuitbreaker
      .send(ClientEnum.AUTH, HttpMethodEnum.POST, '/refresh', headers)
      .toPromise();
  }
}
