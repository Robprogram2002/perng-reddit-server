import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import SharedEntity from './Entity';

@ObjectType()
@Entity()
class Tag extends SharedEntity {
  constructor(tag: Partial<Tag>) {
    super();
    Object.assign(this, tag);
  }

  @Field(() => String, { description: "Tag's name" })
  @Column('varchar', { unique: true, length: 250 })
  name: string | undefined;
}

export default Tag;
