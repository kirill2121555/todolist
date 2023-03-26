import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todos, TodosDocument } from './schemas/todo.schemas';
import { CreateToDoDto } from './Dto/CreateToDoDto';
import { DateDto } from './Dto/DateDto';

import { User, UserDocument } from './schemas/user.schema';
import { ObjectId } from './Dto/Objectid';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Todos.name) private TodosModel: Model<TodosDocument>,
  ) {}

  async getToDos(id: string): Promise<Todos[]> {
    const user = await this.UserModel.findById(id, { todos: 1 })
      .lean()
      .populate({
        path: 'todos',
      });
    return user.todos;
  }

  async getToDo(id: ObjectId, userId: string): Promise<User> {
    const user = await this.UserModel.findById(userId, { todos: 1 })
      .lean()
      .populate({
        path: 'todos',
        match: { _id: id.id },
      });
    return user;
  }
  async postToDo(createToDoDto: CreateToDoDto, userId: string): Promise<Todos> {
    const newToDo = await this.TodosModel.create({
      text: createToDoDto.text,
      date: createToDoDto.date ? createToDoDto.date : undefined,
    });
    await this.UserModel.findByIdAndUpdate(userId, {
      $push: { todos: newToDo.id },
    });
    return newToDo;
  }
  async deleteToDo(id: ObjectId, userId: string): Promise<string> {
    await Promise.all([
      this.UserModel.findByIdAndUpdate(userId, {
        $pull: { todos: id.id },
      }),
      await this.TodosModel.findByIdAndDelete(id.id),
    ]);
    return 'Deleted';
  }
  async putToDo(id: string, createToDoDto: CreateToDoDto): Promise<Todos> {
    const updatedToDo = await this.TodosModel.findByIdAndUpdate(id, {
      text: createToDoDto.text,
      date: createToDoDto.date,
      done: createToDoDto.done,
    });
    return updatedToDo;
  }
  async getTodoOnDate(id: string, date: DateDto): Promise<Todos[]> {
    const user = await this.UserModel.findById(id, { todos: 1 })
      .lean()
      .populate({
        path: 'todos',
        match: { date: date.date },
      });
    return user.todos;
  }
}
