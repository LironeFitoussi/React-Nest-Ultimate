import { Injectable, ExecutionContext, CanActivate, ForbiddenException, UnauthorizedException, SetMetadata } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RequestWithUser } from '../auth0/types';

// Decorator for setting required roles
export const ROLES_KEY = 'roles';
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);

// Role guard that can be used with @Roles decorator
@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // No roles required
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const userRole = request.user.role;
    
    if (!userRole) {
      throw new ForbiddenException('User has no role assigned');
    }

    const hasRequiredRole = requiredRoles.some(role => userRole === role);
    
    if (!hasRequiredRole) {
      throw new ForbiddenException(`Access denied. Required roles: ${requiredRoles.join(', ')}`);
    }

    return true;
  }
}

// Specific guard for admin-only access
@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    
    // console.log('🔑 AdminGuard - User:', request.user);                                                             
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (request.user.role !== 'admin') {
      throw new ForbiddenException('Access denied. Admin role required');
    }


    return true;
  }
}

// Specific guard for user-only access (excludes admin)
@Injectable()
export class UserOnlyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    if (request.user.role !== 'user') {
      throw new ForbiddenException('Access denied. User role required');
    }

    return true;
  }
}

// Guard that allows both admin and user access (authenticated users)
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    
    if (!request.user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const validRoles = ['admin', 'user'];
    if (!validRoles.includes(request.user.role)) {
      throw new ForbiddenException('Access denied. Valid user role required');
    }

    return true;
  }
}