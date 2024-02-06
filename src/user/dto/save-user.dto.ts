import { UserRole } from '../user-role.enum';

export class SaveUserDto {
  email: string;
  name: string;
  role: UserRole;
  passwordHash: string;
}
