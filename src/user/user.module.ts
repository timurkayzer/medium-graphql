import { Module } from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  providers: [UserResolver, UserService],
  exports: [User],
})
export class UserModule {}
