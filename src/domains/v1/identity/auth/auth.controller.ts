import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
import { IAuthRefreshTokenParamDto } from './dto/params/model.dto';
import { Controller, Body, Post, Put } from '@nestjs/common';
import { IAuthSigninBodyDto } from './dto/body/model.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('v1/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @ApiDocMethodPost({
    responseModel: IAuthAccessGetDto,
    description: 'Autentica o usuário',
    isPublic: true,
  })
  signin(@Body() { username, password }: IAuthSigninBodyDto) {
    return this.authService.siginWithKeycloakCredentials(username, password);
  }

  @Put()
  @ApiDocMethodGet({
    description: 'Autualiza token do usuário já logado',
    responseModel: IAuthRefreshGetDto,
    isPublic: true,
  })
  refreshToken(@Body() { refresh_token }: IAuthRefreshTokenParamDto) {
    return this.authService.resfreshKeycloakToken(refresh_token);
  }
}
