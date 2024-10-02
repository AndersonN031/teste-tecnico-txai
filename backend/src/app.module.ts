import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
