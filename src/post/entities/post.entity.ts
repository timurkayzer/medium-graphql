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
  @Field()
  author: User;
  @Field()
  viewers: User[];
}
