import { Module } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { SecurityService } from './security.service';

@Module({
  providers: [SecurityService, AuthGuard],
  exports: [SecurityService, AuthGuard],
})
export class SecurityModule {}
