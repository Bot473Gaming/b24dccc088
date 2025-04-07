import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
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
  async findOne(@Param('id') id: number): Promise<ApiResponse<User>> {
    try {
      const user = await this.userService.findOne(id);
      return {
        status: true,
        message: 'User found successfully',
        data: user,
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
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
        message: error.message,
      };
    }
  }
  // Update user by ID
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
        message: error.message,
      };
    }
  }
  // Delete user by ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ApiResponse<User>> {
    try {
      await this.userService.remove(id);
      return {
        status: true,
        message: 'User deleted successfully',
      };
    } catch (error) {
      return {
        status: false,
        message: error.message,
      };
    }
  }
}
