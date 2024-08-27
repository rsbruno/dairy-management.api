import { HttpStatus, Controller, HttpCode, Delete, Body, Post, Put } from '@nestjs/common';
import { ApiDocMethodDelete } from '@/decorators/swagger/api-doc-method-delete.decorator';
import { IAuthLogoutParamDto, IAuthRefreshTokenParamDto } from './dto/params/model.dto';
import { ApiDocMethodPost } from '@/decorators/swagger/api-doc-method-post.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IAuthAccessGetDto, IAuthRefreshGetDto } from './dto/get/model.dto';
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
    responseModel: IAuthRefreshGetDto,
    description: 'Autualiza token do usuário já logado',
    isPublic: true,
  })
  refreshToken(@Body() { refresh_token }: IAuthRefreshTokenParamDto) {
    return this.authService.resfreshKeycloakToken(refresh_token);
  }

  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDocMethodDelete({
    description: 'Faz logout do usuário',
    isPublic: true,
  })
  logout(@Body() { refresh_token }: IAuthLogoutParamDto) {
    return this.authService.logoutToken(refresh_token);
  }
}
