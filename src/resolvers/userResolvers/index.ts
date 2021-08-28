import EmailVerificationResolver from './emailVerification/resolver';
import LocalSignInResolver from './LocalSignIn/resolver';
import MeResolver from './me/resolver';
import RegisterResolver from './Register/resolver';

const userResolvers = [
  RegisterResolver,
  LocalSignInResolver,
  MeResolver,
  EmailVerificationResolver,
];

export default userResolvers;
