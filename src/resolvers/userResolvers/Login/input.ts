import { Field, InputType } from 'type-graphql';
import { IsEmail } from 'class-validator';
import PasswordInput from '../shared/PasswordInput';

@InputType()
class LocalSignInInput extends PasswordInput {
  @Field()
  @IsEmail()
  email!: string;
}

export default LocalSignInInput;
