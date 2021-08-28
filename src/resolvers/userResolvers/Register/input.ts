import { Field, InputType } from 'type-graphql';
import { Length, IsEmail, Matches } from 'class-validator';
import { IsEmailTaken } from '../../../utils/validations/isEmail';
import { Match } from '../../../utils/validations/matchField';

@InputType()
class RegisterInput {
  @Field()
  @Length(3, 125, { always: true })
  username!: string;

  @Field()
  @IsEmail()
  @IsEmailTaken({ message: 'email is already used' })
  email!: string;

  @Field(() => String)
  @Length(8, 125, { always: true })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password!: string;

  @Field(() => String)
  @Length(8, 125, { always: true })
  @Match('password', { message: 'passwords not mached' })
  passwordConfirm!: string;
}

export default RegisterInput;
