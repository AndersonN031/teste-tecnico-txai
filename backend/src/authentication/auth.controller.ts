import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";
import { LoginDto } from "./dto/login-user.dto";
import { RegisterUsersDto } from "./dto/register-user-dto";

@Controller('/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/login')
    async login(@Req() request: Request, @Res() response: Response, @Body() loginDto: LoginDto): Promise<any> {
        try {
            const result = await this.authService.login(loginDto);
            return response.status(200).json({
                status: "OK!",
                message: "Successfully login!",
                data: result
            });
        } catch (error) {
            return response.status(401).json({
                status: "ERROR!",
                message: "Internal server error!",
                error
            });

        }
    }

    @Post('/register')
    async register(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            const result = await this.authService.register(registerDto);
            return response.status(200).json({
                status: "OK!",
                message: "Usuário registrado com sucesso!",
                data: result
            });
        } catch (error) {
            return response.status(500).json({
                status: "ERROR!",
                message: "Erro interno no servidor!"
                
            });
        }
    }

    @Post('/logout')
    async logout(@Req() request: Request, @Res() response: Response, @Body() registerDto: RegisterUsersDto): Promise<any> {
        try {
            await this.authService.logout();
            return response.status(200).json({
                status: "OK!",
                message: "Logout realizado com sucesso!"
            })

        } catch (error) {
            return response.status(500).json({
                status: "ERROR!",
                message: "Erro interno no servidor!"
            });
        }
    }


}