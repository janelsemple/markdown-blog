declare global {
    interface PostData {
        id: string;
        title: string;
        date: string;
      }

      interface ImageSearchResult {
        url: string;
        postId: string;
        alt: string;
        buffer?: string;
      }

      interface Post {
        id: string;
        title: string;
        date: string;
        content: string;
      }

      interface PostSearchResult {
        titleMatches: PostData[];
        contentMatches: PostData[];
      }
}

export {}; // This is a workaround to avoid TS4023 error. More info:q