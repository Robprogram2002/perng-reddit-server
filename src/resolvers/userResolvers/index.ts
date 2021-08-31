import EmailVerificationResolver from './emailVerification/resolver';
import LoginResolver from './Login/resolver';
import MeResolver from './me/resolver';
import RegisterResolver from './Register/resolver';
import ResetPasswordResolver from './resetPassword/resolver';

const userResolvers = [
  RegisterResolver,
  LoginResolver,
  MeResolver,
  EmailVerificationResolver,
  ResetPasswordResolver,
];

export default userResolvers;
