import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
}

/**
 * Retrieves the data for a single blog post.
 * @throws {Error} If the post data cannot be retrieved.
 */
export async function getPostData(id: string): Promise<PostData> {
  try {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);

    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: matterResult.content,
    };
  } catch (error) {
    throw new Error(`Failed to retrieve post data for id: ${id}`);
  }
}

/**
 * Retrieves the ids of all blog posts.
 */
export function getAllPostIds(): { params: { id: string } }[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

/**
 * Retrieves the sorted data for all blog posts.
 */
export function getSortedPostsData(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: matterResult.content,
    };
  });

  return sortPostsByDate(allPostsData);
}

/**
 * Sorts an array of post data by date in descending order.
 */
function sortPostsByDate(postsData: PostData[]): PostData[] {
  return postsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
