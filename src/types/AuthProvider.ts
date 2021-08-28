/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line no-shadow
enum Provider {
  LOCAL = 'local',
  GOOGLE = 'google',
  GITHUB = 'github',
  FACEBOOK = 'facebook',
}

registerEnumType(Provider, {
  name: 'AuthProvider',
  description: 'Type of authentication that user use for login',
});

export default Provider;
