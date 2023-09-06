import { TwitterResolverContext } from "../resolvers"
import { TweetResolvers } from "../resolvers-types.generated"
const tweetTwitterResolver: TweetResolvers<TwitterResolverContext> =
  {
    author(tweet, _, { db, dbUserCache, dbTweetCache }) {
      let dbTweet = dbTweetCache[tweet.id]
      if (!dbTweet)
        dbTweet = db.getTweetById(tweet.id)
        dbTweetCache[tweet.id] = dbTweet;
        console.warn( "Attempted to find Tweet.author, but the tweet was not found in dbTweetCache")
        // throw new Error(
        //   "Attempted to find Tweet.author, but the tweet was not found in dbTweetCache"
        // )
      let dbUser = dbUserCache[dbTweet.userId]
      if (!dbUser) {
        dbUser = db.getUserById(dbTweet.userId)
        dbUserCache[dbUser.id] = dbUser;
      }
      return dbUser
    },
    stats(tweet, _, { dbTweetToFavoriteCountMap }) {
      return {
        commentCount: 99,
        retweetCount: 1,
        favoriteCount:
          dbTweetToFavoriteCountMap[tweet.id] || 0,
      }
    },
  }
export default tweetTwitterResolver