import { ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  id: number;
  title: string;
  content: string;
  author: User;
  viewers: User[];
}
