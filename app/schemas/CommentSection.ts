import { Id } from "@/convex/_generated/dataModel";
import { v } from "convex/values";
import z from "zod";


export const CommentSchema=z.object({
    content:v.string(),
    postId:z.custom<Id<"posts">>()
})