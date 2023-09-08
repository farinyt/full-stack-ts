import { TwitterResolverContext } from "../resolvers";
import { TrendResolvers } from "../resolvers-types.generated";

// _FA_ the type of this thing is a union
// union Trend = TopicTrend | HashtagTrend
// even though we're returning different data (./server/src/transfomrs.ts: trendTransform)
// based on the different types(we look at the db kind attr)
// ... we still need to return the __resolveType as well
// so graphql can distinguish which to display when
// e.g when we do '.. on HashtagTrend' graphql needs to know if the obj
// returned is of that type or not ...
// actually if we just set `__typename` in that function directly it also works
// where is it returning different fields based on the db type in the transfomrs.ts
// e.g. return { tweetCount, topic, quote, __typename: "TopicTrend"  }
// return { tweetCount, hashtag, __typename: "HashtagTrend" }
// so I didn't include this in the resolvers file
// so this file isn't being used but is here for ref

const trendTwitterResolver: TrendResolvers<TwitterResolverContext> = {
  __resolveType(obj, _context, _info) {
    // _FA_ in this case is obj the parent level or the thing itself?
    // Only Author has a name field
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
    if (typeof (obj as any).hashtag === "string") {
      return "HashtagTrend";
    } else return "TopicTrend";
    return null; // GraphQLError is thrown
  },
};
export default trendTwitterResolver;
