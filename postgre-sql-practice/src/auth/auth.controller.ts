import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AuthCredentialDto } from 'src/auth/dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
  test(@Req() req) {
    console.log('req: ', req.user);
  }
}
