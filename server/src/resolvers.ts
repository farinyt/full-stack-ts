import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/User';
import Tweet from './resolvers/Tweet';
import Db, {DbTweet, DbUser} from "./db"
export interface TwitterResolverContext {
  db: Db
  dbTweetCache: Record<string, DbTweet>
  dbUserCache: Record<string, DbUser>
  dbTweetToFavoriteCountMap: Record<string, number>
}

import {Resolvers} from "./resolvers-types.generated"


const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation,
  User,
  Tweet
};


export default resolvers;
