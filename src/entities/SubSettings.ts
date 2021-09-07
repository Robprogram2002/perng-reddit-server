import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import ColorImage from '../resolvers/subResolvers/shared/ColorImageType';
import BannerSize, { NameFormat } from '../types/SubSettingsTypes';
import ImageObject from '../resolvers/shared/ImagObject';
import SharedEntity from './Entity';

const defaultSubBodyBackground: ColorImage = {
  type: 'color',
  value: '#DAE0E6',
};

const defaultPostBackground: ColorImage = {
  type: 'color',
  value: '#ffffff',
};

@ObjectType()
@Entity()
class SubSettings extends SharedEntity {
  constructor(sub: Partial<SubSettings>) {
    super();
    Object.assign(this, sub);
  }

  @Field(() => ImageObject, {
    description: "image object for the sub's profile image",
    nullable: true,
  })
  @Column('simple-json', { nullable: true, default: null })
  profile!: ImageObject | null;

  @Field(() => String, { description: "sub's title", nullable: true })
  @Column('varchar', { length: 250, nullable: true, default: null })
  title!: string | null;

  @Field(() => NameFormat, {
    description: 'format in which the name and title of a sub would be show',
  })
  @Column('enum', { enum: NameFormat, default: NameFormat.Together })
  nameFormat: NameFormat | undefined;

  @Field(() => ImageObject, {
    description: "image object for the sub's banner image",
    nullable: true,
  })
  @Column('simple-json', { nullable: true, default: null })
  banner!: ImageObject | null;

  @Field(() => String, { description: "sub's base color for theme" })
  @Column('varchar', { length: 100, default: '#0079d3' })
  baseColor!: string;

  @Field(() => String, { description: "sub's highlight color for theme" })
  @Column('varchar', { length: 100, default: '#0079d3' })
  highlightColor!: string;

  @Field(() => ColorImage, {
    description:
      "Json type field. Store the type and value for the sub's body background",
  })
  @Column('simple-json', { default: defaultSubBodyBackground })
  bodyBackground!: ColorImage;

  @Field(() => BannerSize, {
    description: "sub's banner size ",
  })
  @Column('enum', { enum: BannerSize, default: BannerSize.Small })
  bannerSize: BannerSize | undefined;

  @Field(() => String, {
    description: "color title for sub's posts ",
  })
  @Column('varchar', { length: 100, default: '#000000' })
  postTitleColor: string | undefined;

  @Field(() => ColorImage, {
    description:
      "Json type field. Store the type and value for the post's body background",
  })
  @Column('simple-json', { default: defaultPostBackground })
  postBackground: ColorImage | undefined;
}

export default SubSettings;
