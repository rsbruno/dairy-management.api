import type { CostCenter } from '@prisma/client';

import { handlerNullableStrings } from '@/utils/strings/handler-nullable.strings';
import { ApiProperty } from '@nestjs/swagger';

export interface ICostCenterSelectDTO extends CostCenter {
  parent: ICostCenterSelectDTO | null;
}

export class ICostCenterDataDTO {
  @ApiProperty()
  code?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => Object, required: false, nullable: true })
  parent?: ICostCenterDataDTO | null;

  public static toICostCenterDataDTO(costCenter: ICostCenterSelectDTO | null): ICostCenterDataDTO {
    if (!costCenter) return null;
    const response: ICostCenterDataDTO = {
      description: handlerNullableStrings(costCenter.name),
      code: handlerNullableStrings(costCenter.code),
      name: costCenter.name,
      id: costCenter.id,
    };
    if (costCenter.parent) response.parent = ICostCenterDataDTO.toICostCenterDataDTO(costCenter.parent);
    return response;
  }
}
