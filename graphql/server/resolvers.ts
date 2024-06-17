import { getSortedPostsData} from './posts.js';

export const resolvers = {
    Query: {
        posts: async () => {
            return getSortedPostsData();
        },
        post: async (_: any, { id }: { id: string }) => {
            return getSortedPostsData().find((post) => post.id === id);
        }
    }
};