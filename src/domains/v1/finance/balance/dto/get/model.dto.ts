import { ICostCenterSelectDTO, ICostCenterDataDTO } from '@/domains/v1/parameters/cost-center/dto/get/model';
import { formatNumberToMoney } from '@/utils/format-number-to-mony';
import { ApiProperty } from '@nestjs/swagger';

export class IBalanceSelectDTO {
  costCenter: ICostCenterSelectDTO;
  total: number;
  totalQuantity: number;
}

export class IBalanceDetailsDTO {
  @ApiProperty({ type: ICostCenterDataDTO })
  costCenter: ICostCenterDataDTO;

  @ApiProperty()
  total: number;

  @ApiProperty()
  totalQuantity: number;
}

export class IBalanceDataDTO {
  @ApiProperty({ type: IBalanceDetailsDTO, isArray: true })
  details: Array<IBalanceDetailsDTO>;

  @ApiProperty()
  total: number;

  public static transform(balance: Array<IBalanceSelectDTO> | null): IBalanceDataDTO {
    if (!balance) return null;

    const details = balance.map(b => ({
      costCenter: ICostCenterDataDTO.toICostCenterDataDTO(b.costCenter),
      totalQuantity: formatNumberToMoney(b.totalQuantity),
      total: formatNumberToMoney(b.total),
    }));

    const result = details.reduce(
      (acc, { total }) => ({
        total: acc.total + total,
      }),
      {
        total: 0,
      },
    );

    return { total: formatNumberToMoney(result.total), details };
  }
}
