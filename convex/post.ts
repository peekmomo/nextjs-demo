import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { Doc } from "./_generated/dataModel";

type SearchResultType = Pick<Doc<"posts">, "_id" | "title" | "content">;

// Create a new post with the given title and content

export const createPost = mutation({
  args: {
  title: v.string(),
  content: v.string(),
  imageStorageId: v.optional(v.id("_storage")),
},
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const newPostId = await ctx.db.insert("posts", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return newPostId;
  },
});
export const getPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").collect();
    return await Promise.all(
      posts.map(async(post)=>{
      const resolvedId=post.imageStorageId!==undefined? await ctx.storage.getUrl(post.imageStorageId):null;
      return {
        ...post,
        imageUrl:resolvedId
      }
    })
    )
  },
})

export const getImageURL = mutation({
  args: {},
  handler: async (ctx) => {
     const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new Error("Unauthorized");
    }
    const imageUrl = ctx.storage.generateUploadUrl()
    return imageUrl
  }

})

export const getPost = query({
  args: {
    id: v.id("posts"),
  },
  handler: async (ctx, args) => {
    const post = await ctx.db.get(args.id);

    if (!post) {
      return null;
    }

    const imageUrl = post.imageStorageId
      ? await ctx.storage.getUrl(post.imageStorageId)
      : null;

    return {
      ...post,
      imageUrl,
    };
  },
});

export const searchPosts=query({
  args:{
    term:v.string(),
    limit:v.number()
  },
  handler:async(ctx,args)=>{
     const limit=args.limit
     const results:Array<SearchResultType>=[]
     const seen=new Set<Doc<"posts">["_id"]>()

     const pushDocs=async(docs:Array<Doc<"posts">>)=>{
      for(const doc of docs){
        if(seen.has(doc._id))continue
        seen.add(doc._id)
        results.push({
          _id:doc._id,
          title:doc.title,
          content:doc.content
        });
        if(results.length>=limit) break
      }
     };
  const messages = await ctx.db
  .query("posts")
  .withSearchIndex("search_body", (q) =>
    q.search("title", args.term),
  )
  .take(limit);

  await pushDocs(messages)
  if(results.length<limit){
  const bodyMatches= await ctx.db
  .query("posts")
  .withSearchIndex("search_content", (q) =>
    q.search("content", args.term),
  )
  .take(limit);
   await pushDocs(bodyMatches)
  }
  return results
 
}
})
