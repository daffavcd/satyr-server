import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { TravelService } from './travel/travel.service';
import { AppService } from './app.service';
import {
  User as UserModel,
  TravelDestination as TravelDestinationModel,
} from '@prisma/client';

import * as bcrypt from 'bcrypt';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
    private readonly travelService: TravelService,
    // eslint-disable-next-line prettier/prettier
  ) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // TRAVEL ROUTES

  @Get('travels/:id')
  async getTravel(@Param('id') id: string): Promise<TravelDestinationModel> {
    return this.travelService.travelDestination({ id: Number(id) });
  }

  @Get('travels')
  async getTravels(): Promise<TravelDestinationModel[]> {
    return this.travelService.travelDestinations({
      orderBy: { id: 'desc' },
    });
  }

  @Post('travels')
  async createTravel(
    @Body()
    postData: {
      name: string;
      location?: string;
      estimated_budget?: string;
      description?: string;
      image: string;
      authorId: number;
    },
  ): Promise<TravelDestinationModel> {
    console.log('Received POST Data:', postData);
    const { name, location, estimated_budget, description, image, authorId } =
      postData;
    try {
      return this.travelService.createTravelDestination({
        name,
        location,
        estimated_budget,
        description,
        image,
        author: {
          connect: { id: authorId },
        },
      });
    } catch (error) {
      console.error('500 Internal Server Error:', error);
    }
  }

  @Put('travels/:id')
  async updateTravel(
    @Param('id') id: string,
    @Body()
    putData: {
      name: string;
      location?: string;
      estimated_budget?: string;
      description?: string;
      image: string;
      authorId: number;
    },
  ): Promise<TravelDestinationModel> {
    console.log('Received PUT Data:', putData);
    const { name, location, estimated_budget, description, image } = putData;
    return this.travelService.updateTravelDestination({
      where: { id: Number(id) },
      data: {
        name: name,
        location: location,
        estimated_budget: estimated_budget,
        description: description,
        image: image,
      },
    });
  }

  @Delete('travels/:id')
  async deleteTravelDestination(
    @Param('id') id: string,
  ): Promise<TravelDestinationModel> {
    return this.travelService.deleteTravelDestination({ id: Number(id) });
  }

  // USER ROUTES

  @Get('users/:id')
  async getUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.user({ id: Number(id) });
  }

  @Get('users')
  async getUsers(): Promise<UserModel[]> {
    return this.userService.users({
      orderBy: { id: 'desc' },
    });
  }

  @Post('sign_up')
  async createUser(
    @Body()
    postData: {
      name: string;
      email: string;
      password: string;
    },
  ): Promise<{ message: string; user: UserModel }> {
    console.log('Received POST Data:', postData);
    const { name, email } = postData;
    let password = '';
    // HASHING
    const saltOrRounds = 10;
    const plainPassword = postData.password;
    password = await bcrypt.hash(plainPassword, saltOrRounds);
    try {
      //CHECK EMAIL
      const existingUser = await this.userService.users({
        where: { email: postData.email },
      });

      if (existingUser.length > 0) {
        return {
          message: 'Email exist',
          user: { id: -1, ...postData },
        };
      }

      const user = await this.userService.createUser({
        name,
        email,
        password,
      });

      return {
        message: 'User created successfully',
        user: { ...user, password: 'Successfully Encrypted.' },
      };
    } catch (error) {
      console.error('500 Internal Server Error:', error);
    }
  }

  @Delete('users/:id')
  async deleteUser(@Param('id') id: string): Promise<UserModel> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}
