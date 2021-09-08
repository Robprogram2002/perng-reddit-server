/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql';

export enum PostStatus {
  Aproved,
  Removed,
  Spam,
  Waiting,
}

export enum PostTypes {
  Text,
  Media,
  Poll,
  Link,
  Chat,
}

export enum PostMediaTypes {
  Image,
  Video,
  Gif,
}

registerEnumType(PostStatus, {
  name: 'PostStatus',
  description: 'status of a post',
});

registerEnumType(PostTypes, {
  name: 'PostTypes',
  description: 'type of a post',
});

registerEnumType(PostMediaTypes, {
  name: 'PostMediaTypes',
  description: "media's type",
});
