import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './categories.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new this.categoryModel(createCategoryDto);
    return category.save();
  }

  async findBySpace(spaceId: string) {
    return this.categoryModel.find({ spaceId }).exec();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async createDefaultCategories(spaceId: string) {
    const defaultCategories = [
      { name: 'Salary', type: 'income', isDefault: true },
      { name: 'Investments', type: 'income', isDefault: true },
      { name: 'Food', type: 'expense', isDefault: true },
      { name: 'Transport', type: 'expense', isDefault: true },
      { name: 'Housing', type: 'expense', isDefault: true },
      { name: 'Entertainment', type: 'expense', isDefault: true },
      { name: 'Healthcare', type: 'expense', isDefault: true },
      { name: 'Shopping', type: 'expense', isDefault: true },
    ];

    return Promise.all(
      defaultCategories.map((category) =>
        this.create({ ...category, spaceId } as CreateCategoryDto),
      ),
    );
  }
}
