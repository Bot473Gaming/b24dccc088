import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { ApiResponse } from './common/response.type';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // Get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
  // Get one user by ID
  @Get(':id')
  async findOne(id: number): Promise<User> {
    return this.userService.findOne(id);
  }
  // Update user by ID
  @Post()
  async create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        status: true,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      return {
        status: false,
        message: String(error.message),
      };
    }
  }
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ApiResponse<User>> {
    try {
      const user = await this.userService.update(id, updateUserDto);
      return {
        status: true,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      return {
        status: false,
        message: String(error.message),
      };
    }
  }
}
