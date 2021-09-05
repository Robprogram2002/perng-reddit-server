/* eslint-disable max-classes-per-file */
import { Field, InputType } from 'type-graphql';
import { Length } from 'class-validator';
import BannerSize from '../../../types/SubSettingsTypes';

@InputType()
export class UpdateSubThemeInput {
  @Field(() => String)
  subName!: string;

  @Field()
  @Length(4)
  baseColor!: string;

  @Field(() => String)
  @Length(4)
  highlightColor!: string;
}

@InputType()
export class UpdateSubProfileInput {
  @Field(() => String)
  subName!: string;

  @Field(() => String, { nullable: true })
  title!: string | null;

  @Field(() => String, { nullable: true })
  imageBase!: string | null;
}

@InputType()
export class UpdateSubBannerInput {
  @Field(() => String)
  subName!: string;

  @Field(() => BannerSize)
  size!: BannerSize;

  @Field(() => String, { nullable: true })
  imageBase!: string | null;
}

@InputType()
export class UpdateSubPostsInput {
  @Field()
  subName!: string;

  @Field()
  postTitleColor!: string;
}
