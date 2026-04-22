import { Inject, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules-api/auth/auth.module';
import { PrismaModule } from './modules-system/prisma/prisma.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ProtectGuard } from './common/guards/protect.guard';
import { TokenModule } from './modules-system/token/token.module';
import { ImagesModule } from './modules-api/images/images.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseSuccessInterceptor } from './common/interceptors/response-success.interceptor';
import { CommentsModule } from './modules-api/comments/comments.module';
import { CACHE_MANAGER, CacheModule } from '@nestjs/cache-manager';
import KeyvRedis from '@keyv/redis';
import { REDIS_URL } from './common/constants/app.constant';
import type { Cache } from 'cache-manager';
import { UsersModule } from './modules-api/users/users.module';
import { SavingsModule } from './modules-api/savings/savings.module';
import { PermissionGuard } from './common/guards/permission.guard';

@Module({
  imports: [AuthModule, PrismaModule, TokenModule, ImagesModule, CommentsModule, CacheModule.register({
    isGlobal: true,
    stores: [new KeyvRedis(REDIS_URL)]
  }), UsersModule, SavingsModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ProtectGuard
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseSuccessInterceptor
    }
  ],
})
export class AppModule {
  
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async onModuleInit(){
    try {
      
      await this.cacheManager.get('healthcheck');
      console.log('✅ [REDIS] Kết nối redis thành công');
    } catch (error) {
      console.log({ error });
    }
  }
}
