import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import BannerSize from '../types/SubSettingsTypes';
import SharedEntity from './Entity';

@ObjectType()
@Entity()
class SubSettings extends SharedEntity {
  constructor(sub: Partial<SubSettings>) {
    super();
    Object.assign(this, sub);
  }

  @Field(() => String, { description: "sub's base color for theme" })
  @Column('varchar', { length: 100, default: '#0079d3' })
  baseColor: string | undefined;

  @Field(() => String, { description: "sub's highlight color for theme" })
  @Column('varchar', { length: 100, default: '#0079d3' })
  highlightColor: string | undefined;

  @Field(() => String, {
    description: "color or url for the sub'body background ",
  })
  @Column('varchar', { length: 250, default: '#DAE0E6' })
  bodyBackground: string | undefined;

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

  @Field(() => String, {
    description: "color or url for the body of sub's posts ",
  })
  @Column('varchar', { length: 250, default: '#ffffff' })
  postBackground: string | undefined;
}

export default SubSettings;
