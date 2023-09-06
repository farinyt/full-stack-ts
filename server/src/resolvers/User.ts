import { TwitterResolverContext } from "../resolvers";
import { UserResolvers } from "../resolvers-types.generated";
import {
  favoriteTransform,
  tweetTransform,
} from "../transforms"

const userTwitterResolver: UserResolvers<TwitterResolverContext> = {
  stats(
    user, // parent - this is a sub resolver - it has access
    // to what the top level resolver returned
    _,
    { db }
  ) {
    return {
      followingCount: 123,
      followerCount: 456789,
      tweetCount: db.getUserTweets(user.id).length,
    };
  },
  favorites(
    user, // also a sub resolver - we have the user info as the parent/top
    // level resolver returned
    _,
    { db })
  {
    const faves = db.getUserFavorites(user.id);
    return faves.map((f) => {
      return {
        ...favoriteTransform(f),
        user, // we already have the user as the parent object passed to us
        // already filled up by grapql
        tweet: tweetTransform(db.getTweetById(f.tweetId)),
      };
    });
  },
};

export default userTwitterResolver;
