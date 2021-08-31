/* eslint-disable max-classes-per-file */
import { IsEmail, Length } from 'class-validator';
import { Field, InputType } from 'type-graphql';
import { Match } from '../../../utils/validations/matchField';
import PasswordInput from '../shared/PasswordInput';

@InputType()
export class ResetPasswordInput extends PasswordInput {
  @Field(() => String)
  token!: string;

  @Field(() => String)
  @Length(8, 125, { always: true })
  @Match('password', { message: 'passwords not mached' })
  confirmPassword!: string;
}

@InputType()
export class SendEmailInput {
  @Field()
  @Length(3, 125, { always: true })
  username!: string;

  @Field()
  @IsEmail()
  email!: string;
}
