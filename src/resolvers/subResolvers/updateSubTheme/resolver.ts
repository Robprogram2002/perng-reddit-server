import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import dotenv from 'dotenv';
import { getConnection } from 'typeorm';
import isAuthValidaton from '../../../middlewares/isAuthValidaton';
import isAuth from '../../../middlewares/isAuth';
import { RequestContext } from '../../../types/RequestContext';
import CreateSubResponse from '../createSub/response';
import SubSettings from '../../../entities/SubSettings';
import Sub from '../../../entities/Sub';
import {
  UpdateSubBannerInput,
  UpdateSubPostsInput,
  UpdateSubProfileInput,
  UpdateSubThemeInput,
} from './input';
import { upload } from '../../../utils/uploadImage';
import ColorImageInput from '../shared/ColorImageInput';
import ColorImage from '../shared/ColorImageType';
import isSubOwner from '../../../middlewares/isSubOwner';

dotenv.config();

@Resolver()
class UpdateSubTheme {
  @UseMiddleware([isAuth, isAuthValidaton, isSubOwner])
  @Mutation(() => CreateSubResponse)
  async updateTheme(
    @Ctx() { res }: RequestContext,
    @Arg('input') { baseColor, highlightColor }: UpdateSubThemeInput,
    @Arg('bodyBackground', () => ColorImageInput)
    bodyBackground: ColorImage
  ): Promise<CreateSubResponse> {
    try {
      const sub = res.locals.sub as Sub;

      if (bodyBackground.type === 'image') {
        const result = await upload(bodyBackground.value);
        // eslint-disable-next-line no-param-reassign
        bodyBackground.value = result.url;
      }

      const updateResult = await getConnection()
        .createQueryBuilder()
        .update(SubSettings)
        .set({ baseColor, highlightColor, bodyBackground })
        .where('id = :id', {
          id: sub.settings?.id,
        })
        .execute();

      if (updateResult.affected && updateResult.affected === 1) {
        return {
          code: 200,
          success: true,
          message: 'sub settings updated correctly',
          sub,
        };
      }
      throw new Error('database error');
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

  @UseMiddleware([isAuth, isSubOwner])
  @Mutation(() => CreateSubResponse)
  async updateProfile(
    @Ctx() { res }: RequestContext,
    @Arg('input') { imageBase, title }: UpdateSubProfileInput
  ): Promise<CreateSubResponse> {
    try {
      const sub = res.locals.sub as Sub;

      const imageObject = imageBase ? await upload(imageBase) : null;

      const updateResult = await getConnection()
        .createQueryBuilder()
        .update(SubSettings)
        .set({ profile: imageObject, title })
        .where('id = :id', {
          id: sub.settings?.id,
        })
        .execute();

      if (updateResult.affected && updateResult.affected === 1) {
        return {
          code: 200,
          success: true,
          message: 'sub settings updated correctly',
          sub,
        };
      }
      throw new Error('database error');
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

  @UseMiddleware([isAuth, isAuthValidaton, isSubOwner])
  @Mutation(() => CreateSubResponse)
  async updateBanner(
    @Ctx() { res }: RequestContext,
    @Arg('input') { size, imageBase }: UpdateSubBannerInput
  ): Promise<CreateSubResponse> {
    try {
      const sub = res.locals.sub as Sub;
      const imageObject = imageBase ? await upload(imageBase) : null;

      const updateResult = await getConnection()
        .createQueryBuilder()
        .update(SubSettings)
        .set({ banner: imageObject, bannerSize: size })
        .where('id = :id', {
          id: sub.settings?.id,
        })
        .execute();

      if (updateResult.affected && updateResult.affected === 1) {
        return {
          code: 200,
          success: true,
          message: 'sub settings updated correctly',
          sub,
        };
      }
      throw new Error('database error');
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

  @UseMiddleware([isAuth, isSubOwner])
  @Mutation(() => CreateSubResponse)
  async updateSubPosts(
    @Ctx() { res }: RequestContext,
    @Arg('postBackground', () => ColorImageInput)
    postBackground: ColorImage,
    @Arg('input') { postTitleColor }: UpdateSubPostsInput
  ): Promise<CreateSubResponse> {
    try {
      const sub = res.locals.sub as Sub;

      if (postBackground.type === 'image') {
        const result = await upload(postBackground.value);
        // eslint-disable-next-line no-param-reassign
        postBackground.value = result.url;
      }

      const updateResult = await getConnection()
        .createQueryBuilder()
        .update(SubSettings)
        .set({ postBackground, postTitleColor })
        .where('id = :id', {
          id: sub.settings?.id,
        })
        .execute();

      if (updateResult.affected && updateResult.affected === 1) {
        return {
          code: 200,
          success: true,
          message: 'sub settings updated correctly',
          sub,
        };
      }
      throw new Error('database error');
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

export default UpdateSubTheme;
