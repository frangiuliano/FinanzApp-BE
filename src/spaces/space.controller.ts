import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { SpaceService } from './space.service';

@Controller('spaces')
export class SpaceController {
  constructor(private readonly spaceService: SpaceService) {}

  @Post()
  create(@Body() createSpaceDto: any) {
    return this.spaceService.create(createSpaceDto);
  }

  @Get('user/:userId')
  findUserSpaces(@Param('userId') userId: string) {
    return this.spaceService.findUserSpaces(userId);
  }

  @Put(':id/members/:userId')
  addMember(@Param('id') id: string, @Param('userId') userId: string) {
    return this.spaceService.addMember(id, userId);
  }
}
