import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthUserEntity {
  @Field()
  token: string;
}
