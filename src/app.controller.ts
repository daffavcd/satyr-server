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

  @Post('user')
  async signupUser(
    @Body() userData: { name?: string; email: string },
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }

  // @Put('publish/:id')
  // async publishPost(@Param('id') id: string): Promise<TravelDestinationModel> {
  //   return this.travelService.updateTravelDestination({
  //     where: { id: Number(id) },
  //     data: { published: true },
  //   });
  // }

  @Delete('post/:id')
  async deletePost(@Param('id') id: string): Promise<TravelDestinationModel> {
    return this.travelService.deleteTravelDestination({ id: Number(id) });
  }
}
