import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { Users } from "./users.model";


@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) {

    }

    async getAllUser(): Promise<Users[]> {
        return this.prisma.user.findMany()
    }

    async createUser(data: Users): Promise<Users> {
        const existing = await this.prisma.user.findUnique({
            where: {
                name: data.name
            }
        })

        if (existing) {
            throw new ConflictException("O nome de usuário já existe.")
        }

        return this.prisma.user.create({
            data
        })
    }
}