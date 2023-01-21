import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDto } from 'src/types/ApiResponseDto';
import { UserDto } from './dtos/user.dto';
import { UserService } from './user.service';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOkResponse({
    description: 'The list of users',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: {
                $ref: getSchemaPath(UserDto),
              },
            },
          },
        },
      ],
    },
  })
  @Get()
  async getUsers() {
    return {
      statusCode: 200,
      message: 'OK',
      data: await this.userService.getUsers(),
    };
  }

  @ApiOkResponse({
    description: 'The user',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDto) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(UserDto),
            },
          },
        },
      ],
    },
  })
  @ApiNotFoundResponse({
    description: 'The user does not exist',
  })
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
