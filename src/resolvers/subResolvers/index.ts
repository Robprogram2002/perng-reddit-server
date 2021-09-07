import CreateSubResolver from './createSub/resolver';
import FetchSubResolver from './fetchSub/resolver';
import UpdateSubThemeResolver from './updateSubTheme/resolver';
import UpdateSubDataResolver from './updateSubData/resolver';

const subsResolvers = [
  CreateSubResolver,
  FetchSubResolver,
  UpdateSubThemeResolver,
  UpdateSubDataResolver,
];

export default subsResolvers;
