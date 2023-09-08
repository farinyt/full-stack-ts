
import { Tweet } from "./resolvers-types.generated"
import { DbTweet , DbFavorite, DbTrend} from "./db"
import { Favorite, Trend } from "./resolvers-types.generated"

// _FA_ transforming from database objects to graphql object schema
export const tweetTransform = (
  t: DbTweet
): Omit<Tweet, "author"> => {
  return {
    id: t.id,
    body: t.message,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }
}

export const favoriteTransform = (
  t: DbFavorite
): Omit<Favorite, "user" | "tweet"> => {
  return {
    id: t.id,
    createdAt: t.createdAt,
    updatedAt: t.updatedAt,
  }
}

export const trendTransform = (
  t: DbTrend
): Trend => {
  const { tweetCount } = t
  if (t.kind === "topic") {
    const { topic, quote } = t
    return { tweetCount, topic, quote, __typename: "TopicTrend"  }
  } else {
    const { hashtag } = t
    return { tweetCount, hashtag, __typename: "HashtagTrend" }
  }
}