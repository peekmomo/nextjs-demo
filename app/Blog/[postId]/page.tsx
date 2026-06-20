import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import type { Metadata } from 'next'
import { CommentSection } from "@/components/web/CommentSection";
import { PostPresence } from "@/components/web/PostPresence";


interface PostIdRouteProps{
  params:Promise<{
    postId:Id<"posts">
  }>
}

export async function generateMetadata(
  { params}: PostIdRouteProps
): Promise<Metadata> {
 const {postId} =await params
  const post=await fetchQuery(api.post.getPost,{id:postId})
  if(!post){
    return {
      title:"Post not found"
    }
  }
 
  return {
    title: post.title,
  }
}
export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const { postId } = await params;
  const post = await fetchQuery(api.post.getPost, { id: postId as Id<"posts">, })
  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <Link href="/Blog" className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft /> Back to blog
      </Link>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={
            post.imageUrl ?? "https://media.istockphoto.com/id/855022728/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E6%97%A5%E6%9C%AC%E3%81%A7%E6%9B%BD%E7%88%BE%E9%AB%98%E5%8E%9F%E9%AB%98%E5%8E%9F%E3%81%AE%E3%83%93%E3%83%A5%E3%83%BC.jpg?s=2048x2048&w=is&k=20&c=CI-ZXKV0saalVm1cgxXyUvDfr1vHYXP0jl2fEVd8nuI="
          }
          fill
          alt="image"
          unoptimized
          className="object-cover"
        />
      </div>
      <h1>{post.title}</h1>
       <PostPresence roomId={postId as Id<"posts">} />
      <p className="text-sm text-muted-foreground">
        Posted on: {new Date(post._creationTime).toLocaleDateString("en-US")}
      </p>
      <p>{post.content}</p>
      <CommentSection  postId={postId as Id<"posts">} ></CommentSection>
    </div>
  );
}