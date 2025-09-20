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

  support: defineTable({
    uid: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.string(),
    createdAt: v.number(),
  }),

  payment: defineTable({
    uid: v.string(),
    amount: v.number(),
    method: v.string(),
    status: v.string(),
    transactionId: v.optional(v.string()),
    createdAt: v.number(),
  }),

  notification: defineTable({
    uid: v.string(),
    type: v.string(),
    message: v.string(),
    read: v.boolean(),
    createdAt: v.number(),
  }),

  appSettings: defineTable({
    key: v.string(),
    value: v.any(),
    updatedAt: v.number(),
  }),

  analytics: defineTable({
    event: v.string(),
    uid: v.optional(v.string()),
    data: v.optional(v.any()),
    createdAt: v.number(),
  }),
});
