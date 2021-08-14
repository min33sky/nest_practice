import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signUp(authCredentialDto);
  }

  @Post('signin')
  signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.signIn(authCredentialDto);
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  test(@CurrentUser() user: User) {
    console.log('user: ', user);
  }
}
