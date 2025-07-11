import { Injectable, NotFoundException, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { MongoError } from 'mongodb';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      console.log('📝 Creating new user:', {
        email: createUserDto.email,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        auth0Id: createUserDto.auth0Id
      });

      const user = await this.userModel.create(createUserDto);
      
      console.log('✅ User created:', {
        id: user._id,
        email: user.email,
        auth0Id: user.auth0Id
      });
      
      return user;
    } catch (error) {
      if (error instanceof MongoError && error.code === 11000) {
        console.error('❌ User creation failed: Email already exists');
        throw new ConflictException('User with this email already exists');
      }
      console.error('❌ User creation failed:', error);
      throw new InternalServerErrorException('Failed to create user. Please try again.');
    }
  }

  findAll() {
    return this.userModel.find();
  }

  async findByEmail(email: string) {
    try {
      console.log('🔍 Finding user by email:', email);
      const user = await this.userModel.findOne({ email });
      
      if (!user) {
        console.log('❌ User not found:', email);
        throw new NotFoundException(`User with email ${email} not found`);
      }

      console.log('✅ User found:', {
        id: user._id,
        email: user.email,
        auth0Id: user.auth0Id
      });
      
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('❌ Error finding user:', error);
      throw error;
    }
  }

  findOne(id: number) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto);
  }

  remove(id: number) {
    return this.userModel.findByIdAndDelete(id);
  }
}
