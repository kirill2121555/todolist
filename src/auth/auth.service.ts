import { Injectable, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { hash, compare } from 'bcrypt';

import { SingUpDto } from 'src/Dto/SingUpDto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async login(user: SingUpDto) {
    const candidate = await this.UserModel.findOne({
      login: user.login,
    }).lean();
    if (!candidate) {
      throw new HttpException('User not found.', 401);
    }
    if (await compare(user.password, candidate.password)) {
      return {
        access_token: this.jwtService.sign({
          username: candidate.login,
          sub: candidate._id,
        }),
      };
    }
    throw new HttpException('Incorect login or password.', 401);
  }

  async singup(user: SingUpDto) {
    const condidate = await this.UserModel.findOne({
      login: user.login,
    }).lean();
    if (condidate) {
      throw new HttpException('Login busy', 400);
    }
    await this.UserModel.create({
      login: user.login,
      password: await hash(user.password, 5),
    });
    return 'account created';
  }
}
