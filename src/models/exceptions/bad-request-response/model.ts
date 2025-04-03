import { ApiProperty } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common';

class IBadRequestErrors {
  @ApiProperty({ example: 'Mensagem de exemplo' })
  message: string;

  @ApiProperty({
    example: '/caminho/sub-caminho',
    required: false,
  })
  path?: string;
}

export class IBadRequestResponse {
  @ApiProperty({ type: [IBadRequestErrors] })
  errors: Array<IBadRequestErrors>;

  @ApiProperty({ example: HttpStatus.BAD_REQUEST })
  statusCode: number;
}
