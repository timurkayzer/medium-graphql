import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUserInput } from './dto/auth-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { AuthUserEntity } from './entities/auth-user.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Query(() => AuthUserEntity, { name: 'authorize' })
  authorize(
    @Args('authUserInput', { type: () => AuthUserInput })
    authUserInput: AuthUserInput,
  ) {
    // return this.userService.authorize(authUserInput);
  }
}
