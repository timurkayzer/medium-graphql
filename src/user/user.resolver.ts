import { UserInputError } from '@nestjs/apollo';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SecurityService } from 'src/security/security.service';
import { AuthUserInput } from './dto/auth-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { AuthUserEntity } from './entities/auth-user.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private securityService: SecurityService,
  ) {}

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const passwordHash = await this.securityService.generatePassword(
      createUserInput.password,
    );
    return this.userService.create({
      email: createUserInput.email,
      name: createUserInput.name,
      role: createUserInput.role,
      passwordHash,
    });
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
  async authorize(
    @Args('authUserInput', { type: () => AuthUserInput })
    { email, password }: AuthUserInput,
  ) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new UserInputError('Wrong login or password');
    const isPasswordCorrect = await this.securityService.confirmPassword(
      password,
      user.passwordHash,
    );

    if (!isPasswordCorrect) throw new UserInputError('Wrong login or password');

    return {
      token: this.securityService.generateToken({ email }, '1234'),
    };
  }
}
