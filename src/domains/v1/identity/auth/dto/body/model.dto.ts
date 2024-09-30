import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class IAuthSigninBodyDto {
  @ApiProperty({
    example: 'johndoe@email.com',
  })
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  username: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  password: string;
}
