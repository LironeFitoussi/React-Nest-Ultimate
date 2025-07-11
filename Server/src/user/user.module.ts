import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { RoleGuard, AdminGuard, UserOnlyGuard, AuthenticatedGuard } from './user.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService, RoleGuard, AdminGuard, UserOnlyGuard, AuthenticatedGuard],
  exports: [UserService, RoleGuard, AdminGuard, UserOnlyGuard, AuthenticatedGuard],
})
export class UserModule {}
