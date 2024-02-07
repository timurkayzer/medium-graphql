import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { SecurityService } from './security.service';

@Module({
  imports: [PrismaModule],
  providers: [SecurityService, RolesGuard, JwtAuthStrategy],
  exports: [SecurityService, RolesGuard, JwtAuthStrategy],
})
export class SecurityModule {}
