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
import Post from '../../../entities/Post';
import PostMedia from '../../../entities/PostMedia';
import Sub from '../../../entities/Sub';
import Tag from '../../../entities/Tag';
import User from '../../../entities/User';
import isAuth from '../../../middlewares/isAuth';
// import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import { PostTypes } from '../../../types/PostTypes';
import { RequestContext } from '../../../types/RequestContext';
import { upload } from '../../../utils/uploadImage';
import CreatePostInput, { MediaInput } from './input';
import PostResponse from './response';

@Resolver(() => Post)
class CreatePostResolver implements ResolverInterface<Post> {
  @UseMiddleware([isAuth])
  @Mutation(() => PostResponse)
  async createPost(
    @Ctx() { res }: RequestContext,
    @Arg('input') input: CreatePostInput,
    @Arg('mediaInput', () => [MediaInput], { nullable: true })
    mediaInput: MediaInput[] | null
  ): Promise<PostResponse> {
    console.log(mediaInput);
    try {
      // const { id } = res.locals.user as User;
      console.log(res.locals);

      const post = await new Post({
        body: input.body,
        link: input.link,
        notifyUser: input.notifyUser,
        title: input.title,
        type: input.type,
        subId: input.subId,
      }).save();

      await Post.createQueryBuilder()
        .relation('author')
        .of(post)
        .set('6991ba32-d717-4052-9307-a7c36bde047b');

      if (input.tagIds) {
        await Post.createQueryBuilder()
          .relation('tags')
          .of(post)
          .add(input.tagIds);
      }

      if (input.type === PostTypes.Media && mediaInput) {
        const mediaEntities = await Promise.all(
          mediaInput.map(async ({ baseImage, ...data }) => {
            const imageObject = await upload(baseImage);
            return {
              ...data,
              ...imageObject,
            };
          })
        );

        mediaEntities.forEach(async (media) => {
          await new PostMedia({ ...media, post }).save();
        });
      }

      return {
        code: 200,
        success: true,
        message: 'post created successfully',
        post,
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
        post: null,
      };
    }
  }

  @FieldResolver()
  async sub(@Root() post: Post): Promise<Sub> {
    const sub = await Sub.findOne(post.subId);
    return sub!;
  }

  @FieldResolver()
  async author(@Root() post: Post): Promise<User> {
    const owner = await Post.createQueryBuilder()
      .relation('author')
      .of(post)
      .loadOne<User>();
    return owner!;
  }

  @FieldResolver()
  async media(@Root() post: Post): Promise<PostMedia[]> {
    const mediaList = await Post.createQueryBuilder()
      .relation('media')
      .of(post)
      .loadMany<PostMedia>();
    return mediaList;
  }

  @FieldResolver()
  async tags(@Root() post: Post): Promise<Tag[]> {
    const tags = await Post.createQueryBuilder()
      .relation('tags')
      .of(post)
      .loadMany<Tag>();
    return tags;
  }
}

export default CreatePostResolver;
