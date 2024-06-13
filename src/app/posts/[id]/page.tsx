import ReactMarkdown from "react-markdown";
import { getAllPostIds, getPostData, PostData } from "../../../lib/posts";
import Link from "next/link";

interface PostProps {
  params: {
    id: string;
  };
}

/**
 * A component that displays a single blog post.
 */
const Post = async ({ params }: PostProps) => {
  try {
    const post = await getPostData(params.id);
    return (
      <article className="max-w-4xl mx-auto py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600">{post.date}</p>
        </header>
        <div className="prose max-w-none">
          <ReactMarkdown
            components={{
              code: ({ className, children, ...props }) => {
                const isInline = className === "language-text";
                return (
                  <code
                    className={`${
                      isInline ? "inline-code" : "block-code"
                    } bg-gray-100 rounded-md px-2 py-1`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="mt-8">
          <Link href="/" className="text-blue-500 hover:text-blue-700">
            ← Back to Home
          </Link>
        </div>
      </article>
    );
  } catch (error) {
    console.error("Error fetching post data:", error);
    return <div>Error loading post.</div>;
  }
};

/**
 * Generates the static paths for each blog post.
 */
export async function generateStaticParams(): Promise<{  id: string  }[]> {
  const paths = getAllPostIds();
  return paths.map((path) => (path.params));
}

export default Post;
