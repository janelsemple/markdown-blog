import { getSortedPostsData } from './posts.js';
export const resolvers = {
    Query: {
        posts: async () => {
            return getSortedPostsData();
        },
        post: async (_, { id }) => {
            return getSortedPostsData().find((post) => post.id === id);
        }
    }
};
