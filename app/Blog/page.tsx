"use client";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react"

export default function Blog() {
    const data = useQuery(api.post.getPosts);
    return (
        <div className="py-12">
            <div className="text-center pb-12">
                <h1 className="text-2xl font-bold mb-4">Blog Posts</h1>
                <p>Insights,thought</p>
            </div>

            <div>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data?.map((post) => (
                    <Card key={post._id.toString()} className="border">
                        
                    </Card>
                ))}
            </div>
        </div>
    )
}
