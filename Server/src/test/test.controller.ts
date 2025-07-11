import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Auth0Guard } from '../auth0/auth0.guard';
import { AdminGuard } from '../user/user.guard';

@Controller('tests')
@UseGuards(Auth0Guard)
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(AdminGuard)
  @Post()
  async create(@Body() createTestDto: CreateTestDto) {

    const test = await this.testService.create(createTestDto);

    return {
      success: true,
      data: test,
      message: 'Test created successfully',
    };
  }

  @Get()
  async findAll() {
    const tests = await this.testService.findAll();

    return {
      success: true,
      data: tests,
      message: 'Tests retrieved successfully',
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const test = await this.testService.findOne(id);

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
  ) {
    const test = await this.testService.update(id, updateTestDto);

    return {
      success: true,
      data: test,
      message: 'Test updated successfully',
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.testService.remove(id);

    return {
      success: true,
      message: 'Test deleted successfully',
    };
  }
}
