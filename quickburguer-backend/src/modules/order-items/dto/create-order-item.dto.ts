import { IsInt, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderItemDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  quantity: number;
}
