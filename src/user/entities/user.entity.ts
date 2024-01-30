import { ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { UserRole } from './user-role.enum';

@ObjectType()
export class User {
  id: number;
  name: string;
  email: string; // uniquepassword: string;
  role: UserRole;
  posts: Post[];
  viewedPosts: Post[];
}
