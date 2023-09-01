import Query from './resolvers/Query';
import Db from "./db"
export interface TwitterResolverContext {
  db: Db
}

import {Resolvers} from "./resolvers-types.generated"

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
};


export default resolvers;
