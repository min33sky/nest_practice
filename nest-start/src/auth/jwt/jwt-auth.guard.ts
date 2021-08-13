import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 *? AuthGuard는 strategy를 자동으로 호출해준다.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
