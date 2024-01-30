import { Field, ObjectType } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { UserRole } from './user-role.enum';

@ObjectType()
export class User {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  email: string; // uniquepassword: string;
  @Field()
  role: UserRole;
  @Field()
  posts: Post[];
  @Field()
  viewedPosts: Post[];
}
