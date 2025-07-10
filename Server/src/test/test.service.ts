import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';

@Injectable()
export class TestService {
  private readonly dummyData = [
    { id: 1, name: 'Test 1', description: 'This is test 1', status: 'active' },
    { id: 2, name: 'Test 2', description: 'This is test 2', status: 'pending' },
    { id: 3, name: 'Test 3', description: 'This is test 3', status: 'completed' },
  ];

  create(createTestDto: CreateTestDto) {
    return {
      id: this.dummyData.length + 1,
      ...createTestDto,
      status: 'active',
    };
  }

  findAll() {
    return this.dummyData;
  }

  findOne(id: number) {
    return this.dummyData.find((test) => test.id === id) || null;
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    const testIndex = this.dummyData.findIndex((test) => test.id === id);
    if (testIndex === -1) return null;
    console.log(updateTestDto);
    const updatedTest = {
      ...this.dummyData[testIndex],
      ...updateTestDto,
    };
    return updatedTest;
  }

  remove(id: number) {
    return { message: `Test #${id} has been removed` };
  }
}
