import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todos, TodosSchema } from './schemas/todo.schemas';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.link),
    MongooseModule.forFeature([{ name: Todos.name, schema: TodosSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
