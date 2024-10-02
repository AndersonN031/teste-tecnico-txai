import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma.service";
import { LoginDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { RegisterUsersDto } from "./dto/register-user-dto";
import { UsersService } from "src/Users/users.service";
import { Users } from "src/Users/users.model";


@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService: PrismaService,
        private jwtService: JwtService,
        private readonly userService: UsersService
    ) { }

    async login(loginDto: LoginDto): Promise<any> {
        const { name, password } = loginDto;

        const users = await this.prismaService.user.findUnique({
            where: { name }
        })

        if (!users) {
            throw new NotFoundException("user not found")
        }

        const validatePassword = await bcrypt.compare(password, users.password)

        if (!validatePassword) {
            throw new NotFoundException("Invalid password.")
        }

        return {
            token: this.jwtService.sign({ name })
        }

    }

    async register(createDto: RegisterUsersDto): Promise<any> {
        const createUsers = new Users()
        createUsers.name = createDto.name
        createUsers.email = createDto.email
        createUsers.password = await bcrypt.hash(createDto.password, 10)

        const user = await this.userService.createUser(createUsers)

        return {
            token: this.jwtService.sign({ user: user.name })
        }
    }

    async logout(): Promise<void> {
        
    }

}