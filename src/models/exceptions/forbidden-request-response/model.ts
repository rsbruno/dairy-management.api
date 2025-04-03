import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

class IForbiddenErrors {
  @ApiProperty({
    example: 'usuário sem as permissões!',
  })
  message: string;

  @ApiProperty({
    isArray: true,
  })
  roles: string;
}

export class IForbiddenRequestResponse {
  @ApiProperty({ type: [IForbiddenErrors] })
  errors: Array<IForbiddenErrors>;

  @ApiProperty({ example: HttpStatus.FORBIDDEN })
  statusCode: number;
}
