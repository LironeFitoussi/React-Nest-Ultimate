import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Auth0Guard } from '../auth0/auth0.guard';
import { Request } from 'express';

@Controller('tests')
@UseGuards(Auth0Guard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async create(@Body() createTestDto: CreateTestDto, @Req() request: Request) {
    console.log('📝 TestController.create - Creating test with data:', createTestDto);
    console.log('🔑 TestController.create - User:', request.user);

    const test = await this.testService.create(createTestDto);
    console.log('✅ TestController.create - Test created successfully:', test._id?.toString());

    return {
      success: true,
      data: test,
      message: 'Test created successfully',
    };
  }

  @Get()
  async findAll(@Req() request: Request) {
    console.log('📋 TestController.findAll - Getting all tests');
    console.log('🔑 TestController.findAll - User:', request.user);

    const tests = await this.testService.findAll();
    console.log(`✅ TestController.findAll - Found ${tests.length} tests`);

    return {
      success: true,
      data: tests,
      message: 'Tests retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() request: Request) {
    console.log('🔍 TestController.findOne - Getting test:', id);
    console.log('🔑 TestController.findOne - User:', request.user);

    const test = await this.testService.findOne(id);
    console.log('✅ TestController.findOne - Test found:', test._id?.toString());

    return {
      success: true,
      data: test,
      message: 'Test retrieved successfully',
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTestDto: UpdateTestDto,
    @Req() request: Request
  ) {
    console.log('📝 TestController.update - Updating test:', id);
    console.log('🔑 TestController.update - User:', request.user);
    console.log('📄 TestController.update - Update data:', updateTestDto);

    const test = await this.testService.update(id, updateTestDto);
    console.log('✅ TestController.update - Test updated successfully:', test._id?.toString());

    return {
      success: true,
      data: test,
      message: 'Test updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: Request) {
    console.log('🗑️ TestController.remove - Deleting test:', id);
    console.log('🔑 TestController.remove - User:', request.user);

    await this.testService.remove(id);
    console.log('✅ TestController.remove - Test deleted successfully:', id);

    return {
      success: true,
      message: 'Test deleted successfully',
    };
  }
}
