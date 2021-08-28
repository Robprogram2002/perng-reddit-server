import { Length, Matches } from 'class-validator';
import { Field, InputType } from 'type-graphql';

@InputType()
class PasswordInput {
  @Field(() => String)
  @Length(8, 125, { always: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password!: string;
}

export default PasswordInput;
