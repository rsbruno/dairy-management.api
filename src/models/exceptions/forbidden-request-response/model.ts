import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

class IForbiddenErrors {
  @ApiProperty({
    isArray: true,
  })
  roles: string;

  @ApiProperty({
    example: 'usuário sem as permissões!',
  })
  message: string;
}

export class IForbiddenRequestResponse {
  @ApiProperty({ type: [IForbiddenErrors] })
  errors: Array<IForbiddenErrors>;

  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: number;
}
