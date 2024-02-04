import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getPosts } from "~/.server/posts";
import { Post } from "~/components/post";

export const loader = async () => {
  const posts = await getPosts();
  return json(posts.filter((post) => post.frontmatter.featured));
};

export default function Index() {
  const featuredPosts = useLoaderData<typeof loader>();

  return (
    <div className="grid flex-1 gap-16 p-10 sm:grid-cols-2 sm:place-items-center">
      <div className="space-y-8">
        <div>
          <h2 className="text-4xl font-bold">Remix 🤝 MDX</h2>
          <p className="font-light text-gray-600">
            Powered by Vite plugins. Check out the{" "}
            <a href="https://github.com/pcattori/remix-blog-mdx">
              code on Github
            </a>
            .
          </p>
        </div>
        <hr />
        <section>
          <h3 className="text-xl tracking-wide">✨ FEATURED ✨</h3>
          <ul className="mt-4 space-y-8">
            {featuredPosts.map((post) => (
              <li key={post.slug}>
                <Post {...post} />
              </li>
            ))}
          </ul>
        </section>
      </div>
      <div className="hidden sm:block">
        <img
          src="/hero.png"
          alt="Abstract sculpture with different colorful shapes"
        />
      </div>
    </div>
  );
}
