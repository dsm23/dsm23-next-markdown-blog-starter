import type { Metadata } from "next";
import { BlogPosts } from "src/app/components/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">My Blog</h1>
      <BlogPosts />
    </section>
  );
}
