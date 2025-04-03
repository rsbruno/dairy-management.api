import { TransactionsTypes } from 'prisma/prisma-client';
import { ApiProperty } from '@nestjs/swagger';

export class ITransactionsSelectDTO implements TransactionsTypes {
  code: string;
  createdAt: Date;
  farmId: string;
  id: string;
  name: string;
  updatedAt: Date;
}

export class ITransactionsDataDTO {
  @ApiProperty()
  code: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  public static transform(transactionType: ITransactionsSelectDTO): ITransactionsDataDTO {
    return {
      name: transactionType.name,
      code: transactionType.code,
      id: transactionType.id,
    };
  }
}
