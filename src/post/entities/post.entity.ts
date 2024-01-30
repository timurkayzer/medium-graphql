import { Field, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';

@ObjectType()
export class Post {
  @Field()
  id: number;
  @Field()
  title: string;
  @Field()
  content: string;
  @Field((type) => User)
  author: User;
  @Field((type) => [User])
  viewers: User[];
}
