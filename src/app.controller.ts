import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateToDoDto, DateDto } from './Dto/CreateToDoDto';
import { Todos } from './schemas/todo.schemas';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { SingUpDto } from './Dto/SingUpDto';
import { ObjectId } from './Dto/Objectid';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}
  @Post('auth/login')
  async login(@Body() singin: SingUpDto) {
    return this.authService.login(singin);
  }
  @Post('singup')
  async singup(@Body() singupdto: SingUpDto) {
    return this.authService.singup(singupdto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sort')
  getTodoOnDate(
    @Query('date') date: DateDto,
    @Request() req,
  ): Promise<Todos[]> {
    return this.appService.getTodoOnDate(req.user.userId, date.date);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllTodo(@Request() req): Promise<Todos[]> {
    return this.appService.getToDos(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOneTodo(@Param() id: ObjectId, @Request() req) {
    console.log('sadasdas');
    return this.appService.getToDo(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  postToDo(
    @Body() createToDoDto: CreateToDoDto,
    @Request() req,
  ): Promise<Todos> {
    return this.appService.postToDo(createToDoDto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteToDo(@Param('id') id: ObjectId, @Request() req): Promise<string> {
    return this.appService.deleteToDo(id, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  putToDo(
    @Param('id') id: string,
    @Body() createToDoDto: CreateToDoDto,
  ): Promise<Todos> {
    return this.appService.putToDo(id, createToDoDto);
  }
}
