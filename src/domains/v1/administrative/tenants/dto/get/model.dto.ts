import { Tenants } from 'prisma/prisma-client';
import { ApiProperty } from '@nestjs/swagger';

import { IFarmsSelectDTO, IFarmsDataDTO } from '../../../farms/dto/get/model.dto';

export class ITenantsSelectDTO implements Tenants {
  clientId: string;
  clientSecret: string;
  createdAt: Date;
  farm: IFarmsSelectDTO;
  farmsId: string;
  id: string;
  updatedAt: Date;
}

export class ITenantsDataDTO {
  @ApiProperty()
  clientId: string;

  @ApiProperty()
  clientSecret: string;

  @ApiProperty({ type: IFarmsDataDTO })
  farm: IFarmsDataDTO;

  @ApiProperty()
  id: string;

  public static transform(tenant: ITenantsSelectDTO | null): ITenantsDataDTO {
    if (!tenant) return null;
    return {
      farm: IFarmsDataDTO.transform(tenant.farm),
      clientSecret: tenant.clientSecret,
      clientId: tenant.clientId,
      id: tenant.id,
    };
  }
}
