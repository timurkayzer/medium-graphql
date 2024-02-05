import { Field, InputType } from '@nestjs/graphql';
import { UserRole } from '../user-role.enum';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  name: string;
  @Field()
  role: UserRole;
  @Field()
  password: string;
}
