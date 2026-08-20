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
  }).searchIndex("search_content", {
    searchField: "content",
  }),
  comments:defineTable({
     postId:v.id('posts'),
     content: v.string(),
     authorId: v.string(),
     authName:v.string(),
     
  }),
  customUsers: defineTable({
  email: v.string(),
  name: v.string(),
  passwordHash: v.string(),
  createdAt: v.number(),
}),
customSessions: defineTable({
  userId: v.id("customUsers"),
  tokenHash: v.string(),
  expiresAt: v.number(),
  createdAt: v.number(),
}).index("by_tokenHash", ["tokenHash"]),
});

