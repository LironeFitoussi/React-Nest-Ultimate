import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable()
export class Auth0Guard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activateResult = super.canActivate(context);
    return activateResult instanceof Observable
      ? await firstValueFrom(activateResult)
      : await Promise.resolve(activateResult);
  }
}
