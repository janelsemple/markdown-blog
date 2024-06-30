import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {client} from './elasticsearch.js';

const postsDirectory = path.join(process.cwd(), "../posts");

export interface PostData {
  id: string;
  title: string;
  date: string;
  content: string;
  images?: { url: string; alt: string; postId?: string }[];
}

/**
 * Extracts image URLs and alt text from the markdown content using a regular expression.
 * @param {string} markdown - The markdown content.
 * @param {string} postId - The ID of the post.
 * @returns {Array<{ url: string, alt: string, postId: string }>} - An array of objects with image URLs, alt text, and post ID.
 */
function extractImagesFromMarkdown(markdown: string, postId: string): { url: string; alt: string; postId: string }[] {
  const images: { url: string; alt: string; postId: string }[] = [];
  const imageRegex = /!\[(.*?)\]\((.*?)\)/g;
  let match;

  while ((match = imageRegex.exec(markdown)) !== null) {
    images.push({ alt: match[1], url: match[2], postId });
  }
  return images;
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

/**
 * Retrieves the sorted data for all blog posts, including images.
 */
export function getPostsDataWithImages(): PostData[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    const images = extractImagesFromMarkdown(matterResult.content, id);
    return {
      id,
      title: matterResult.data.title,
      date: matterResult.data.date,
      content: matterResult.content,
      images,
    };
  });
  return sortPostsByDate(allPostsData);
}

/**
 * Indexes all markdown posts into Elasticsearch.
 */
export async function indexPosts() {
  const postsData = getPostsDataWithImages();

  for (const post of postsData) {
    await client.index({
      index: 'posts',
      id: post.id,
      body: {
        title: post.title,
        date: post.date,
        content: post.content.toLocaleLowerCase(),
        images: post.images?.map(image => ({
          alt: image.alt,
          url: image.url,
          postId: image.postId
        })),
      }, 
    });
  }
}
