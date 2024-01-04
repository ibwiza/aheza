import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { TypeService } from './type.service';
import { Prisma } from '@prisma/client';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  
  @Post()
  async createType(@Body() data: Prisma.TypeCreateInput) {
    return this.typeService.createType(data);
  }

  @Get()
  async findType() {
    return this.typeService.findTypes();
  }

  @Patch(':cid')
  async activateType(
    @Param('cid') cid: string,
    @Body() data: Prisma.TypeUpdateInput,
  ) {
    return this.typeService.activeType(cid, data);
  }
}
