import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
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
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: SingUpDto) {
    //const payload = { username: user.username, sub: user.userId };
    const candidate = await this.UserModel.findOne({ login: user.login });
    if (!candidate) {
      return 'user not found';
    }
    if (await compare(user.password, candidate.password)) {
      return {
        access_token: this.jwtService.sign({
          username: candidate.login,
          sub: candidate._id,
        }),
      };
    }
    return 'password incorrect';
  }

  async singup(user: SingUpDto) {
    const condidate = await this.UserModel.findOne({ login: user.login });
    if (condidate) {
      return 'login busy';
    }
    await this.UserModel.create({
      login: user.login,
      password: await hash(user.password, 5),
    });
    return 'account created';
  }
}
