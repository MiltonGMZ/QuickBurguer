import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { OrderItemsService } from './order-items.service';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('order-items')
@Controller('order-items')
export class OrderItemsController {
  constructor(private readonly service: OrderItemsService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar producto a un pedido' })
  create(@Body() dto: CreateOrderItemDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los ítems de pedidos' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un ítem de pedido por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un ítem de pedido' })
  update(@Param('id') id: string, @Body() dto: UpdateOrderItemDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un ítem de pedido' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
