import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.userService.getUsers(),
    };
  }

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.getUser(id);
    if (!user) throw new NotFoundException(`User with id ${id} does not exist`);
    return {
      statusCode: 200,
      message: 'OK',
      data: user,
    };
  }
}
