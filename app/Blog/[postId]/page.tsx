import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params;
  const post = await fetchQuery(api.post.getPosts, { id: postId as Id<"posts">, });

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href="/Blog" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft /> Back to blog
      </Link>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}