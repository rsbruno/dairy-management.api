import { ApiDocMethodPaginated } from '@/decorators/swagger/api-doc-method-paginated.decorator';
import { ApiDocMethodGet } from '@/decorators/swagger/api-doc-method-get.decorator';
import { IUsersFindAllDto, IUsersFindByIdDto } from './dto/param/model.dto';
import { Controller, Param, Query, Get, UseGuards } from '@nestjs/common';
import { AuthenticationGuard } from '@/guards/auth/authentication.guard';
import { IUsersGetDataDto } from './dto/get/model.dto';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('v1/users')
@UseGuards(AuthenticationGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiDocMethodPaginated({
    description: '',
    responseModel: IUsersGetDataDto,
    isArray: true,
  })
  find(@Query() params: IUsersFindAllDto) {
    return this.usersService.findall(params);
  }

  @Get(':id')
  @ApiDocMethodGet({
    description: '',
    responseModel: IUsersGetDataDto,
  })
  findById(@Param() params: IUsersFindByIdDto) {
    return this.usersService.findById(params.id);
  }
}
