import { Field, ObjectType } from '@nestjs/graphql';
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
  posts: number;
  @Field()
  viewedPosts: number;
}
