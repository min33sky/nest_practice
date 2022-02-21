import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { Roles } from './decorator/role.decorator';
import { UserDTO } from './dto/user.dto';
import { RoleType } from './role-type';
import { JWTAuthGuard } from './security/jwt-auth.guard';
import { RolesGuard } from './security/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO) {
    return await this.authService.registerNewUser(userDTO);
  }

  @Post('/login')
  async login(@Body() userDTO: UserDTO, @Res() res: Response) {
    const jwt = await this.authService.validateUser(userDTO);
    res.setHeader('Authorization', `Bearer ${jwt.accessToken}`);
    return res.json(jwt);
  }

  @Get('/authenticate')
  @UseGuards(JWTAuthGuard)
  isAuthenticated(@Req() req: Request) {
    const user = req.user;
    return user;
  }

  @Get('/admin-role')
  @UseGuards(JWTAuthGuard, RolesGuard)
  @Roles(RoleType.ADMIN)
  adminRole(@Req() req: Request): any {
    const user: any = req.user;
    return user;
  }
}
