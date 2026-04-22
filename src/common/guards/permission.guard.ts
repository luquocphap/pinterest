
import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permission.decorator';
import { PrismaService } from 'src/modules-system/prisma/prisma.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("Start PermissionGuard");
    const permission = this.reflector.get<string[]>(PERMISSION_KEY, context.getHandler());
    console.log({permission})
    if (!permission) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    const isPermitted = await this.prisma.role_permissions.findFirst({
        where: {
            AND: {
                roleId: user.roleId,
                permissions: {
                    action: permission[0],
                    resource: permission[1]
                }
            }
        }
    })

    console.log("Permission Guard", {
        permission: permission,
        isPermitted: isPermitted,
        userId: user.id
    })

    if (!isPermitted) throw new ForbiddenException("You are not permitted to do this action");

    const isAdmin = user.roleId === 2;
    const action = permission[0];
    const resource = permission[1];

    if (resource === 'USER_PROFILE' && action === 'READ' && !isAdmin) {
        const targetUserId = parseInt(request.params.id);
        
        // Nếu không phải là admin VÀ ID trên URL khác với ID của chính mình -> Chặn
        if (targetUserId && targetUserId !== user.id) {
            throw new ForbiddenException("You cannot watch other's profile");
        }
    }
    
    return true
  }
}
