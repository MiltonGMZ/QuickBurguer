import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User } from '../users/user.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async create(dto: CreateOrderDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const order = this.orderRepo.create({ ...dto, user });
    return this.orderRepo.save(order);
  }

  findAll() {
    return this.orderRepo.find({ relations: ['user'] });
  }

  findOne(id: number) {
    return this.orderRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async update(id: number, dto: UpdateOrderDto) {
    const order = await this.orderRepo.preload({ id, ...dto });
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return this.orderRepo.save(order);
  }

  async remove(id: number) {
    const order = await this.orderRepo.findOneBy({ id });
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return this.orderRepo.remove(order);
  }
}
