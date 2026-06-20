"use server"
import {z} from "zod";
import { BlogSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect, RedirectType } from 'next/navigation'
import { getToken,fetchAuthMutation } from "@/lib/auth-server";
import { error } from "console";
import { revalidatePath, updateTag } from "next/cache";

export async function CreateBlogAction(data: z.infer<typeof BlogSchema>) {
    const parsed= BlogSchema.safeParse(data);
    if(!parsed.success) {
        throw new Error("Invalid data: " + parsed.error.message);
    }
    const token=await getToken()
    const imageURL=await fetchMutation(
        api.post.getImageURL,
        {},
        {token}
    )
    const uploadResult=await fetch(imageURL,{
        method:'POST',
        body:parsed.data.image
    })
    if(!uploadResult.ok){
        return {
            error:"Failed to upload Image"
        }
    }
    const {storageId}=await uploadResult.json()
    await fetchMutation(api.post.createPost, {
      title: parsed.data.title,
      content: parsed.data.content,
      imageStorageId: storageId,
    }, { token });
   
    // revalidatePath("/blog")
    updateTag("blog")
   
    return redirect("/");
  
    
}