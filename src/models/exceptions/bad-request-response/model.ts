import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

class IBadRequestErrors {
  @ApiProperty({
    example: '/caminho/sub-caminho',
    required: false,
  })
  path?: string;

  @ApiProperty({ example: 'Mensagem de exemplo' })
  message: string;
}

export class IBadRequestResponse {
  @ApiProperty({ type: [IBadRequestErrors] })
  errors: Array<IBadRequestErrors>;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}
