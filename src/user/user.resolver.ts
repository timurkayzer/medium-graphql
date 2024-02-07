import { UserInputError } from '@nestjs/apollo';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/security/jwt.guard';
import { Roles } from 'src/security/roles.decorator';
import { RolesGuard } from 'src/security/roles.guard';
import { SecurityService } from 'src/security/security.service';
import { AuthUserInput } from './dto/auth-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { AuthUserEntity } from './entities/auth-user.entity';
import { User } from './entities/user.entity';
import { UserRole } from './user-role.enum';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private securityService: SecurityService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Admin)
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

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Roles(UserRole.Admin)
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles(UserRole.Admin)
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // TODO: move to security module
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
      token: this.securityService.generateToken(
        { email },
        process.env.JWT_SECRET,
      ),
      refreshToken: this.securityService.generateToken(
        { email },
        process.env.JWT_REFRESH_SECRET,
      ),
    };
  }
}
