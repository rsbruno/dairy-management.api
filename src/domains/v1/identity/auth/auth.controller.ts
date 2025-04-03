import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { Controller, Body, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { IAuthRefreshGetDTO, IAuthAccessGetDTO } from './dto/get/model.dto';
import { IAuthRefreshTokenParamDto } from './dto/params/model.dto';
import { IAuthSigninBodyDTO } from './dto/body/model.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Put()
  @ApiDocMethodGet({
    description: 'Autualiza token do usuário já logado',
    responseModel: IAuthRefreshGetDTO,
    isPublic: true,
  })
  async refreshToken(@Body() { refresh_token }: IAuthRefreshTokenParamDto) {
    return this.authService.refreshKeycloakToken(refresh_token);
  }

  @Post()
  @ApiDocMethodPost({
    description: 'Autentica o usuário',
    responseModel: IAuthAccessGetDTO,
    isPublic: true,
  })
  async signin(@Body() { username, password }: IAuthSigninBodyDTO) {
    return this.authService.signinWithKeycloakCredentials(username, password);
  }
}
