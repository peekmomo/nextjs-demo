"use client";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"
import Image from "next/image";
import Link from "next/link";

export default function Blog() {
    const data = useQuery(api.post.getPosts);
    return (
        // 1. 将 py-12 改为 pt-4 pb-12，大幅减少页面顶部的空白
        <div className="pt-4 pb-12"> 
            {/* 2. 将 pb-12 改为 pb-6，缩短标题与图片的间距 */}
            <div className="text-center pb-6"> 
                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
                <p className="text-muted-foreground">Insights, thought</p>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((post) => (
                    <Card key={post._id.toString()} className="border overflow-hidden">
                        {/* 卡片图片容器 */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                              src="https://media.istockphoto.com/id/855022728/ja/%E3%82%B9%E3%83%88%E3%83%83%E3%82%AF%E3%83%95%E3%82%A9%E3%83%88/%E6%97%A5%E6%9C%AC%E3%81%A7%E6%9B%BD%E7%88%BE%E9%AB%98%E5%8E%9F%E9%AB%98%E5%8E%9F%E3%81%AE%E3%83%93%E3%83%A5%E3%83%BC.jpg?s=2048x2048&w=is&k=20&c=CI-ZXKV0saalVm1cgxXyUvDfr1vHYXP0jl2fEVd8nuI=" 
                              alt="img" 
                              fill 
                              unoptimized 
                              className="object-cover" // 👈 3. 确保图片完美充满容器，不留白、不缩进
                            />
                        </div>
                        <CardContent>
                            <Link href={`/blog/${post._id}`}></Link>
                            <h1 className="text-2xl font-bold">{post.title}</h1>

                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}