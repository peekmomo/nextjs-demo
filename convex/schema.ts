import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  posts: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
    imageStorageId:v.optional(v.id("_storage"))
  }).searchIndex("search_body", {
    searchField: "title",
  }),
  comments:defineTable({
     postId:v.id('posts'),
     content: v.string(),
     authorId: v.string(),
     authName:v.string(),
     
  })
});