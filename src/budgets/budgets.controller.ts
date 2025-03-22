import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() createBudgetDto: CreateBudgetDto) {
    return this.budgetsService.create(createBudgetDto);
  }

  @Get('space/:spaceId')
  findBySpace(@Param('spaceId') spaceId: string) {
    return this.budgetsService.findBySpace(spaceId);
  }

  @Get('space/:spaceId/active')
  findActive(@Param('spaceId') spaceId: string) {
    return this.budgetsService.findActive(spaceId);
  }

  @Get(':id/progress')
  getBudgetProgress(@Param('id') id: string) {
    return this.budgetsService.getBudgetProgress(id);
  }
}
