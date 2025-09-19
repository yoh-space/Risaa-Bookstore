import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    uid: v.string(), // Firebase UID
    displayName: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    photoURL: v.optional(v.string()),
    preferences: v.optional(v.any()),
    createdAt: v.number(),
  }),

  books: defineTable({
    title: v.string(),
    author: v.string(),
    description: v.optional(v.string()),
    categoryId: v.id("categories"),
    pdfUrl: v.string(),
    price: v.number(),
    isFeatured: v.optional(v.boolean()),
    createdAt: v.number(),
  }),

  categories: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    createdAt: v.number(),
  }),

  carts: defineTable({
    uid: v.string(), // Firebase UID
    items: v.array(
      v.object({
        bookId: v.id("books"),
        quantity: v.number(),
        price: v.number(),
      })
    ),
    updatedAt: v.number(),
  }),
});
