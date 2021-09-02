/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line no-shadow
enum SubType {
  PRIVATE = 'private',
  RESTRICTED = 'restricted',
  PUBLIC = 'public',
}

registerEnumType(SubType, {
  name: 'AuthProvider',
  description: 'Type of authentication that user use for login',
});

export default SubType;
