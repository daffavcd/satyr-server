import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  // Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user/user.service';
import { TravelService } from './travel/travel.service';
import {
  User as UserModel,
  TravelDestination as TravelDestinationModel,
} from '@prisma/client';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly travelService: TravelService,
  ) {}

  @Get('travels/:id')
  async getPostById(@Param('id') id: string): Promise<TravelDestinationModel> {
    return this.travelService.travelDestination({ id: Number(id) });
  }

  @Get('travels')
  async getPublishedPosts(): Promise<TravelDestinationModel[]> {
    return this.travelService.travelDestinations({
      orderBy: { id: 'desc' },
    });
  }

  // @Get('filtered-posts/:searchString')
  // async getFilteredPosts(
  //   @Param('searchString') searchString: string,
  // ): Promise<TravelDestinationModel[]> {
  //   return this.travelService.travelDestinations({
  //     where: {
  //       OR: [
  //         {
  //           title: { contains: searchString },
  //         },
  //         {
  //           content: { contains: searchString },
  //         },
  //       ],
  //     },
  //   });
  // }

  // @Post('post')
  // async createDraft(
  //   @Body() postData: { title: string; content?: string; authorEmail: string },
  // ): Promise<TravelDestinationModel> {
  //   const { title, content, authorEmail } = postData;
  //   return this.travelService.createTravelDestination({
  //     title,
  //     content,
  //     author: {
  //       connect: { email: authorEmail },
  //     },
  //   });
  // }

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
