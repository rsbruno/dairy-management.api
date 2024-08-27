import { commonExceptions } from '@/mappings/common-exceptions.mapping';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IAuthSigninBodyDto {
  @ApiProperty({
    example: 'johndoe@email.com',
  })
  @IsEmail({}, { message: commonExceptions.validator.isEmail })
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  username: string;

  @ApiProperty({
    example: '123456',
  })
  @IsNotEmpty({ message: commonExceptions.validator.isNotEmpty })
  password: string;
}
