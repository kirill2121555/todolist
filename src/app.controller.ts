import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToDoDto } from './Dto/CreateToDoDto';
import { Todos, TodosDocument } from './schemas/todo.schemas';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllTodo(): Promise<Todos[]> {
    return this.appService.getToDos();
  }
  @Get(':id')
  getOneTodo(@Param('id') id: number): Promise<Todos> {
    return this.appService.getToDo(id);
  }
  @Post()
  postToDo(@Body() createToDoDto: CreateToDoDto): Promise<Todos> {
    return this.appService.postToDo(createToDoDto.text);
  }
  @Delete(':id')
  deleteToDo(@Param('id') id: number): Promise<string> {
    return this.appService.deleteToDo(id);
  }
  @Put(':id')
  putToDo(
    @Param('id') id: number,
    @Body() createToDoDto: CreateToDoDto,
  ): Promise<Todos> {
    return this.appService.putToDo(id, createToDoDto);
  }
}
