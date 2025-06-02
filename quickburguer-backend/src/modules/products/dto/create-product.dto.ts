import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Hamburguesa Clásica' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Deliciosa hamburguesa con carne y queso' })
  @IsString()
  description: string;

  @ApiProperty({ example: 14900 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'https://example.com/image.jpg', required: false })
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ example: true, required: false })
  @IsOptional()
  available?: boolean;
}
