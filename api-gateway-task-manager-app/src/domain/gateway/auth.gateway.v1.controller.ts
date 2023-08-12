import { AuthMicroservice } from '@domain/microservices/auth/auth.service';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import {
  Body,
  CacheTTL,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ICreateUserDTO, ILoginDTO } from '../microservices/auth/dto/user.dto';

@Controller({ version: '1', path: 'api' })
@UseGuards(ThrottlerGuard)
export class AuthGatewayV1Controller {
  constructor(private readonly auth: AuthMicroservice) {}

  @Post('/auth/token')
  signin(@Req() req: any, @Body() body: ILoginDTO) {
    return this.auth.signin(req, body);
  }

  @Post('/auth/register')
  signup(@Req() req: any, @Body() body: ICreateUserDTO) {
    return this.auth.signup(req, body);
  }

  @Get('/users/me')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('')
  @CacheTTL(60000)
  userMe(@Req() req: any) {
    return this.auth.userMe(req);
  }

  @Post('/auth/logout')
  logout(@Req() req: any) {
    return this.auth.logout(req);
  }

  @Post('/auth/refresh')
  refresh(@Req() req: any) {
    return this.auth.refresh(req);
  }
}
