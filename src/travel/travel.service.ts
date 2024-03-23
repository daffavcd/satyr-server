import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { TravelDestination, Prisma } from '@prisma/client';

@Injectable()
export class TravelService {
  constructor(private prisma: PrismaService) {}

  async travelDestination(
    travelDestinationWhereUniqueInput: Prisma.TravelDestinationWhereUniqueInput,
  ): Promise<TravelDestination | null> {
    return this.prisma.travelDestination.findUnique({
      where: travelDestinationWhereUniqueInput,
    });
  }

  async travelDestinations(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TravelDestinationWhereUniqueInput;
    where?: Prisma.TravelDestinationWhereInput;
    orderBy?: Prisma.TravelDestinationOrderByWithRelationInput;
  }): Promise<TravelDestination[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.travelDestination.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTravelDestination(
    data: Prisma.TravelDestinationCreateInput,
  ): Promise<TravelDestination> {
    return this.prisma.travelDestination.create({
      data,
    });
  }

  async updateTravelDestination(params: {
    where: Prisma.TravelDestinationWhereUniqueInput;
    data: Prisma.TravelDestinationUpdateInput;
  }): Promise<TravelDestination> {
    const { data, where } = params;
    return this.prisma.travelDestination.update({
      data,
      where,
    });
  }

  async deleteTravelDestination(
    where: Prisma.TravelDestinationWhereUniqueInput,
  ): Promise<TravelDestination> {
    return this.prisma.travelDestination.delete({
      where,
    });
  }
}
