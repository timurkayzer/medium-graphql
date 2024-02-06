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
  email: string;
  @Field()
  role: UserRole;
  @Field()
  passwordHash: string;
  @Field((type) => [Post])
  posts: Post[];
  @Field((type) => [Post])
  viewedPosts: Post[];
}
