import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcryptjs';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class SecurityService {
  async generatePassword(password: string) {
    const salt = await genSalt(10);
    const passwordHash = await hash(password, salt);

    return passwordHash;
  }

  async confirmPassword(password, passwordHash) {
    return await compare(password, passwordHash);
  }

  generateToken(data: any, secret: string) {
    return sign(data, secret);
  }

  verify(token: string, secret: string) {
    return verify(token, secret);
  }
}
