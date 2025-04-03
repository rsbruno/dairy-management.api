import { ApiProperty } from '@nestjs/swagger';
import { Farms } from 'prisma/prisma-client';

export class IFarmsSelectDTO implements Farms {
  clientId: string;
  cnpj: string;
  createdAt: Date;
  id: string;
  membersCount: number;
  name: string;
  updatedAt: Date;
}

export class IFarmsDataDTO {
  @ApiProperty()
  cnpj: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  public static transform(farm: IFarmsSelectDTO | null): IFarmsDataDTO {
    if (!farm) return null;
    return {
      cnpj: farm.cnpj,
      name: farm.name,
      id: farm.id,
    };
  }
}
