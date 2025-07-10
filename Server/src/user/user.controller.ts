import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MongoError } from 'mongodb';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        success: true,
        data: user,
        message: 'User created successfully',
      };
    } catch (error) {
      // If duplicate key error (email already exists)
      if (error instanceof MongoError && error.code === 11000) {
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return {
      success: true,
      data: users,
      message: 'Users retrieved successfully',
    };
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    try {
      const user = await this.userService.findByEmail(email);
      return {
        success: true,
        data: user,
        message: 'User found successfully',
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Let NestJS handle the 404
      }
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      success: true,
      data: user,
      message: 'User found successfully',
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return {
      success: true,
      data: user,
      message: 'User updated successfully',
    };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
