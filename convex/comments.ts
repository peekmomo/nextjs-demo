import { ar } from "zod/v4/locales";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";

export const getComments=query({
    args:{
        postId:v.id('posts'),
    },
    handler:async(ctx,args)=>{
       const data=await ctx.db.query("comments").filter((q)=>q.eq(q.field("postId"),args.postId)).order("desc")
       .collect()

       return data
    }
})

export const createComment=mutation({
    args:{
        postId:v.id("posts"),
        content:v.string(),
    },
    handler:async(ctx,args)=>{
        const user = await authComponent.safeGetAuthUser(ctx);
            if (!user) {
              throw new Error("Unauthorized");
            }
        return await ctx.db.insert('comments',{
            postId:args.postId,
            content:args.content,
            authName:user.name,
            authorId:user._id
        })
    }
})