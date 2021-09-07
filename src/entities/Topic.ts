import { Field, ObjectType } from 'type-graphql';
import { Column, Entity } from 'typeorm';
import SharedEntity from './Entity';

@ObjectType()
@Entity()
class Topic extends SharedEntity {
  constructor(topic: Partial<Topic>) {
    super();
    Object.assign(this, topic);
  }

  @Field(() => String, { description: "topic's name" })
  @Column('varchar', { unique: true, length: 250 })
  name: string | undefined;
}

export default Topic;
