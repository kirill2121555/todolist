import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todos, TodosDocument } from './schemas/todo.schemas';
import { todo } from './type/typeToDo';
import { CreateToDoDto } from './Dto/CreateToDoDto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class AppService {
  private static todos: Array<todo> = [];
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Todos.name) private TodosModel: Model<TodosDocument>,
  ) {}

  async getToDos(id: string): Promise<Todos[]> {
    const user = await this.UserModel.findById(id, { todos: 1 }).populate({
      path: 'todos',
    });
    return user.todos;
  }

  async getToDo(id: string, userId: string): Promise<Todos[]> {
    const user = await this.UserModel.findById(userId, { todos: 1 }).populate({
      path: 'todos',
      match: { id: id },
    });
    return user.todos;
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
  async deleteToDo(id: string, userId: string): Promise<string> {
    await this.UserModel.findByIdAndUpdate(userId, {
      $pull: { todos: id },
    });
    await this.TodosModel.findByIdAndDelete(id);
    return 'Deleted';
  }
  async putToDo(id: string, createToDoDto: CreateToDoDto): Promise<Todos> {
    const updatedToDo = await this.TodosModel.findByIdAndUpdate(id, {
      text: createToDoDto.text,
      date: createToDoDto.date,
      done: createToDoDto.status,
    });
    return updatedToDo;
  }
  async getTodoOnDate(id: string, date: string): Promise<Todos[]> {
    const user = await this.UserModel.findById(id, { todos: 1 }).populate({
      path: 'todos',
      match: { date: date },
    });
    return user.todos;
  }
}
