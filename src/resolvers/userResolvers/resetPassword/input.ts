import { Field } from 'type-graphql';
import PasswordInput from '../shared/PasswordInput';

class ResetPasswordInput extends PasswordInput {
  @Field(() => String)
  token!: string;
}

export default ResetPasswordInput;
