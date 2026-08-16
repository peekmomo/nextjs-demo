
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from 'next'
// export const dynamic = "force-static" // true | false


export const metadata: Metadata = {
  title: 'Blog | Next.js 16 Tutorial',
  description: 'Read our latest articles and insights',
  category:'Web development',
  authors:[{name:'Jan'}]
}
 
export default async function Blog() {

    return (
        // 1. 将 py-12 改为 pt-4 pb-12，大幅减少页面顶部的空白
        <div className="pt-4 pb-12">
            {/* 2. 将 pb-12 改为 pb-6，缩短标题与图片的间距 */}
            <div className="text-center pb-6">
                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
                <p className="text-muted-foreground">Insights, thought</p>
            </div>

            <Suspense fallback={skeletonUI()}>
            <LoadingContent />
        </Suspense>
        </div >
    )
}

async function LoadingContent() {
    await connection();
    const data = await fetchQuery(api.post.getPosts);

    // 🟢 3. 修复：必须加上 return 关键字
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data?.map((post) => (
                <Card key={post._id.toString()} className="border overflow-hidden">
                    {/* 卡片图片容器 */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted/50">
                        <Image
                          src={
                            post?.imageUrl??"https://media.istockphoto.com/id/855022728/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E6%97%A5%E6%9C%AC%E3%81%A7%E6%9B%BD%E7%88%BE%E9%AB%98%E5%8E%9F%E9%AB%98%E5%8E%9F%E3%81%AE%E3%83%93%E3%83%A5%E3%83%BC.jpg?s=2048x2048&w=is&k=20&c=CI-ZXKV0saalVm1cgxXyUvDfr1vHYXP0jl2fEVd8nuI=" 
                          }
                          fill 
                          alt="image"
                          unoptimized 
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-contain"
                        />
                    </div>
                    <CardContent>
                        {/* 🟢 注意：这里有一个空的 Link，如果是误打的可以删掉 */}
                        <Link href={`/Blog/${post._id}`}></Link>
                        <h1 className="text-2xl font-bold mt-2">{post.title}</h1>
                        <p className="text-muted-foreground">{post.content}</p>
                    </CardContent>
                    <CardFooter>
                        <Link href={`/Blog/${post._id}`} className={buttonVariants()}>Read more</Link>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

function skeletonUI(){
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
           {[...Array(3)].map((_, i) => (
                <div className="flex flex-col space-y-3" key={i}>
                    <Skeleton className="aspect-[4/3] w-full rounded-xl"/>
                    <div className="space-y-2 flex flex-col">
                        <Skeleton className="h-6 w-3/4"/>
                        <Skeleton className="h-4 w-full"/>
                        <Skeleton className="h-4 w-2/3"/>
                    </div>
                </div>
           ))}
        </div>
    )
}
