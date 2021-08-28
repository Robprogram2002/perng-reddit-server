import { Field, InputType } from 'type-graphql';
import { Length, IsEmail, Matches } from 'class-validator';

@InputType()
class LocalSignInInput {
  @Field()
  @IsEmail()
  email!: string;

  @Field(() => String)
  @Length(8, 125, { always: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password!: string;
}

export default LocalSignInInput;
