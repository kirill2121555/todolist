import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Todos, TodosDocument } from './schemas/todo.schemas';
import { todo, tododb } from './type/typeToDo';
import { CreateToDoDto } from './Dto/CreateToDoDto';
import { setFlagsFromString } from 'v8';

@Injectable()
export class AppService {
  private static todos: Array<todo> = [];
  constructor(
    @InjectModel(Todos.name) private TodosModel: Model<TodosDocument>,
  ) {}

  async getToDos(): Promise<Todos[]> {
    const alltodo = await this.TodosModel.find();
    return alltodo; //createdCat.save();
  }

  async getToDo(id: number): Promise<Todos> {
    const onetodo = await this.TodosModel.findById(id);
    return onetodo;
  }
  async postToDo(todo: string): Promise<Todos> {
    const newToDo = await this.TodosModel.create({ text: todo });
    return newToDo;
  }
  async deleteToDo(id: number): Promise<string> {
    await this.TodosModel.deleteOne({ id });
    return 'Deleted';
  }
  async putToDo(id: number, createToDoDto: CreateToDoDto): Promise<Todos> {
    const updatedToDo = await this.TodosModel.findByIdAndRemove(
      { id },
      {
        text: createToDoDto.text,
        done: createToDoDto.status ? true : false,
      },
    );
    return updatedToDo;
  }
}
