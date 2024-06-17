declare global {
    interface PostData {
        id: string;
        title: string;
        date: string;
      }

      interface Post {
        id: string;
        title: string;
        date: string;
        content: string;
      }
}

export {}; // This is a workaround to avoid TS4023 error. More info:q