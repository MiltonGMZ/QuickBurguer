import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderItem } from './order-item.entity';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { Order } from '../orders/order.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private itemRepo: Repository<OrderItem>,
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({ where: { id: dto.orderId } });
    const product = await this.productRepo.findOne({ where: { id: dto.productId } });

    if (!order || !product) {
      throw new NotFoundException('Pedido o producto no encontrado');
    }

    const subtotal = +product.price * dto.quantity;
    const item = this.itemRepo.create({ order, product, quantity: dto.quantity, subtotal });
    return this.itemRepo.save(item);
  }

  findAll() {
    return this.itemRepo.find({ relations: ['order', 'product'] });
  }

  findOne(id: number) {
    return this.itemRepo.findOne({ where: { id }, relations: ['order', 'product'] });
  }

  async update(id: number, dto: UpdateOrderItemDto) {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['product'] });
    if (!item) throw new NotFoundException('Ítem no encontrado');

    if (dto.quantity) {
      item.quantity = dto.quantity;
      item.subtotal = +item.product.price * dto.quantity;
    }

    return this.itemRepo.save(item);
  }

  async remove(id: number) {
    const item = await this.itemRepo.findOneBy({ id });
    if (!item) throw new NotFoundException('Ítem no encontrado');
    return this.itemRepo.remove(item);
  }
}
