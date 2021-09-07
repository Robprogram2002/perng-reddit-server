import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { getConnection } from 'typeorm';
// import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import CreateSubResponse from '../createSub/response';
import { RequestContext } from '../../../types/RequestContext';
import Sub from '../../../entities/Sub';
import edditSub from '../../../middlewares/edditSub';

@Resolver()
class UpdateSubDataResolver {
  @UseMiddleware([isAuth, edditSub])
  @Mutation(() => CreateSubResponse)
  async editDescription(
    @Ctx() { res }: RequestContext,
    @Arg('subName') subName: string,
    @Arg('text') text: string
  ): Promise<CreateSubResponse> {
    console.log(subName);
    try {
      const sub = res.locals.sub as Sub;

      sub.description = text;
      await sub.save();

      return {
        code: 200,
        success: true,
        message: 'sub description updated correctly',
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

  @UseMiddleware([isAuth, edditSub])
  @Mutation(() => CreateSubResponse)
  async editMainTopic(
    @Ctx() { res }: RequestContext,
    @Arg('subName') subName: string,
    @Arg('topicId') topicId: string
  ): Promise<CreateSubResponse> {
    try {
      console.log(subName);
      const sub = res.locals.sub as Sub;

      // populate the mainTopic relation of the sub
      await getConnection()
        .createQueryBuilder()
        .relation(Sub, 'mainTopic')
        .of(sub)
        .set(topicId);

      return {
        code: 200,
        success: true,
        message: 'sub main topic updated correctly',
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

  @UseMiddleware([isAuth, edditSub])
  @Mutation(() => CreateSubResponse)
  async editSecondaryTopics(
    @Ctx() { res }: RequestContext,
    @Arg('subName') subName: string,
    @Arg('topicsId', () => [String]) topicsId: string[]
  ): Promise<CreateSubResponse> {
    try {
      console.log(subName);
      const sub = res.locals.sub as Sub;

      // populate the subTopics relation of the sub with an array of Ids from topic entity
      await getConnection()
        .createQueryBuilder()
        .relation(Sub, 'subTopics')
        .of(sub)
        .add(topicsId);

      return {
        code: 200,
        success: true,
        message: 'the sub-topics relation was updated correctly',
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
}

export default UpdateSubDataResolver;
