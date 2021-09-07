/* eslint-disable no-unused-vars */
import { registerEnumType } from 'type-graphql';

// eslint-disable-next-line no-shadow
enum BannerSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

registerEnumType(BannerSize, {
  name: 'SubBannerSize',
  description: 'Size of the sub banner',
});

// eslint-disable-next-line no-shadow
export enum NameFormat {
  Only = 'only',
  Hidden = 'hidden',
  Together = 'together',
}

registerEnumType(NameFormat, {
  name: 'NameFormat',
  description: 'format in which the name and title of a sub would be show',
});

export default BannerSize;
