import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import User from "./resolvers/User";
import Tweet from "./resolvers/Tweet";
import Trend from "./resolvers/Trends";
import Db, { DbTweet, DbUser } from "./db";
export interface TwitterResolverContext {
  db: Db;
  dbTweetCache: Record<string, DbTweet>;
  dbUserCache: Record<string, DbUser>;
  dbTweetToFavoriteCountMap: Record<string, number>;
}

import { Resolvers } from "./resolvers-types.generated";

const resolvers: Resolvers<TwitterResolverContext> = {
  Query,
  Mutation,
  User,
  Tweet,
  // Trend, -- did the resolving for __typename in the transform directly
}


export default resolvers;
