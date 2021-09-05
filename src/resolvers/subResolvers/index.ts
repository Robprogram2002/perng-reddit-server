import CreateSubResolver from './createSub/resolver';
import FetchSubResolver from './fetchSub/resolver';
import UpdateSubThemeResolver from './updateSubTheme/resolver';

const subsResolvers = [
  CreateSubResolver,
  FetchSubResolver,
  UpdateSubThemeResolver,
];

export default subsResolvers;
