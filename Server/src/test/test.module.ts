import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestSchema } from './entities/test.entity';
import { Auth0Module } from '../auth0/auth0.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Test.name, schema: TestSchema }]), Auth0Module],
  controllers: [TestController],
  providers: [TestService],
  exports: [TestService],
})
export class TestModule {}
