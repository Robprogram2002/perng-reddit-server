import { ResolverData } from 'type-graphql';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../entities/User';

dotenv.config();

const AuthorizationCheck = async (
  { context }: ResolverData<any>,
  roles: string[]
): Promise<boolean> => {
  const { token } = context.req.cookies;

  if (!token) return false;

  const { email } = jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as jwt.JwtPayload;

  const user = await User.findOne({ where: { email } });

  if (!user) return false;

  if (!roles || roles.length === 0) {
    return true;
  }

  // return roles.includes(user.role);
  return true;
};

export default AuthorizationCheck;
