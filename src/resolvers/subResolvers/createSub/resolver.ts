import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  ResolverInterface,
  Root,
  UseMiddleware,
} from 'type-graphql';
import dotenv from 'dotenv';
import { getConnection } from 'typeorm';
import CreateSubResponse from './response';
import CreateSubInput from './input';
import Sub from '../../../entities/Sub';
import SubType from '../../../types/SubTypes';
// import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import { RequestContext } from '../../../types/RequestContext';
import SubSettings from '../../../entities/SubSettings';
import User from '../../../entities/User';
import Topic from '../../../entities/Topic';
import Post from '../../../entities/Post';

dotenv.config();

@Resolver(() => Sub)
class CreateSubResolver implements ResolverInterface<Sub> {
  // @UseMiddleware([isAuth, isAuthValidaton])
  @UseMiddleware([isAuth])
  @Mutation(() => CreateSubResponse)
  async createSub(
    @Ctx() { res }: RequestContext,
    @Arg('input') { adultContent, name, type }: CreateSubInput
  ): Promise<CreateSubResponse> {
    try {
      const { id } = res.locals.user as User;

      let subType: SubType;
      if (type === String(SubType.PRIVATE)) {
        subType = SubType.PRIVATE;
      } else if (type === String(SubType.PUBLIC)) {
        subType = SubType.PUBLIC;
      } else if (type === String(SubType.RESTRICTED)) {
        subType = SubType.RESTRICTED;
      } else {
        throw new Error('invalid value for type field');
      }
      const settings = await new SubSettings({}).save();

      const sub = await new Sub({
        adultContent,
        name,
        type: subType,
        // username: res.locals.user.username,
        username: 'Roberto Martínez Rivera',
        settings,
      }).save();

      await Sub.createQueryBuilder().relation('joinedUsers').of(this).add(id);

      return {
        code: 200,
        success: true,
        message: 'sub created successfully',
        sub,
      };
    } catch (error) {
      let message = 'something went wrong, please try again';
      if (error instanceof Error) {
        message = error.message;
      }

      return {
        code: 500,
        success: false,
        message,
        sub: null,
      };
    }
  }

  @FieldResolver()
  async settings(@Root() sub: Sub) {
    const settings = await getConnection()
      .createQueryBuilder()
      .relation(Sub, 'settings')
      .of(sub.id)
      .loadOne();
    return settings;
  }

  // @FieldResolver(() => User)
  @FieldResolver()
  async user(@Root() sub: Sub) {
    const owner = await getConnection()
      .createQueryBuilder()
      .relation(Sub, 'user')
      .of(sub.id)
      .loadOne<User>();
    return owner;
  }

  @FieldResolver()
  async mainTopic(@Root() sub: Sub) {
    const topic = await getConnection()
      .createQueryBuilder()
      .relation(Sub, 'mainTopic')
      .of(sub.id)
      .loadOne();

    return topic ?? null;
  }

  @FieldResolver(() => [Topic])
  async subTopics(@Root() sub: Sub) {
    const topics = await getConnection()
      .createQueryBuilder()
      .relation(Sub, 'subTopics')
      .of(sub.id)
      .loadMany();

    return topics ?? null;
  }

  @FieldResolver()
  async isJoin(
    @Root() sub: Sub,
    @Arg('userId', () => String, { nullable: true }) userId: string | null
  ): Promise<boolean> {
    if (!userId) return false;

    const resultCount = await Sub.createQueryBuilder('community')
      .leftJoinAndSelect('community.joinedUsers', 'users')
      .where('community.id = :subId', { subId: sub.id })
      .andWhere('users.id = :userId', { userId })
      .getCount();

    return Boolean(resultCount);
  }

  @FieldResolver()
  async usersCount(@Root() sub: Sub): Promise<number> {
    const count = await Sub.createQueryBuilder('community')
      .leftJoinAndSelect('community.joinedUsers', 'users')
      .where('community.id = :subId', { subId: sub.id })
      .getCount();

    return count;
  }

  @FieldResolver()
  async posts(@Root() sub: Sub): Promise<Post[]> {
    const posts = await Sub.createQueryBuilder()
      .relation('posts')
      .of(sub.id)
      .loadMany<Post>();

    return posts;
  }
}

export default CreateSubResolver;
