import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import PasswordInput from '../shared/PasswordInput';

@InputType()
class LocalSignInInput extends PasswordInput {
  @Field()
  @Length(3, 125, { always: true })
  username!: string;
}

export default LocalSignInInput;
