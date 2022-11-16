import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

import UserModel from './user.model';
import PaginationDto from '../../common/dto/pagination.dto';

@Injectable()
export default class UserService {
  constructor(
    @InjectModel(UserModel)
    private userRepository: typeof UserModel,
  ) {}

  getById(id: number) {
    return this.userRepository.findByPk(id);
  }

  getAll(options: PaginationDto) {
    return this.userRepository.findAndCountAll(options);
  }
}
