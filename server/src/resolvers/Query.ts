import { TwitterResolverContext } from '../resolvers';
import { QueryResolvers } from '../resolvers-types.generated';
import { tweetTransform } from '../transforms';

const queryTwitterResolver: QueryResolvers<TwitterResolverContext> = {
  currentUser: (_,__,{db}) => {
    const [firstUser] = db.getAllUsers()
    if (!firstUser) {
      throw new Error('currentUser was requested, but there are no users in the database')
    }
    return firstUser
    return {
      id: 'user-123',
      name: 'dummy user',
      handle: 'dummyUser',
      coverUrl: '',
      avatarUrl: '',
      createdAt: '',
      updatedAt: '',
    };
  },
  suggestions: (_, __, { db }) => {
    return db.getAllSuggestions()
    return [
      {
        name: 'TypeScript Project',
        handle: 'TypeScript',
        avatarUrl: 'http://localhost:3000/static/ts-logo.png',
        reason: 'Because you follow @MichaelLNorth',
        id: '1',
      },
      {
        name: 'jQuery',
        handle: 'jquery',
        avatarUrl: 'http://localhost:3000/static/jquery-logo.jpeg',
        reason: 'Because you follow @FrontendMasters',
        id: '2',
      },
    ];
  },
  tweets: (
    _, // parent
    __, // args - like input
    { db, dbTweetToFavoriteCountMap, dbUserCache, dbTweetCache } // context
  ) => {
    db.getAllUsers().forEach((user) => {
      dbUserCache[user.id] = user;
    });
    db.getAllFavorites().forEach((favorite) => {
      const count = dbTweetToFavoriteCountMap[favorite.tweetId] || 0;
      dbTweetToFavoriteCountMap[favorite.tweetId] = count + 1;
    });

    // return db.getAllTweets().map((t) => {
    //   dbTweetCache[t.id] = t;
    //   return tweetTransform(t);
    // });

    // FA - what it would be like if we just return the firstUser as the author
    const [firstUser] = db.getAllUsers()
    if (!firstUser) {
      throw new Error('currentUser was requested, but there are no users in the database')
    }
    return db.getAllTweets().map((t) => {
      dbTweetCache[t.id] = t;
      return Object.assign(tweetTransform(t), {author: firstUser})
    });
  },
};

export default queryTwitterResolver;
