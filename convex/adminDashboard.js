import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Admin mutation to update app settings
export const updateAppSetting = mutation({
  args: { key: v.string(), value: v.any(), updatedAt: v.number() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("appSettings")
      .filter(q => q.eq(q.field("key"), args.key))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { value: args.value, updatedAt: args.updatedAt });
      return existing._id;
    } else {
      return await ctx.db.insert("appSettings", args);
    }
  },
});

// Admin mutation to update book details
export const updateBook = mutation({
  args: {
    bookId: v.id("books"),
    title: v.optional(v.string()),
    author: v.optional(v.string()),
    description: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    pdfUrl: v.optional(v.string()),
    price: v.optional(v.number()),
    isFeatured: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const { bookId, ...fields } = args;
    await ctx.db.patch(bookId, fields);
    return bookId;
  },
});

// Admin mutation to mark payment as completed
export const markPaymentCompleted = mutation({
  args: { paymentId: v.id("payment"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.paymentId, { status: args.status });
    return args.paymentId;
  },
});

// Admin mutation to send notification
export const sendNotification = mutation({
  args: {
    uid: v.string(),
    type: v.string(),
    message: v.string(),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("notification", { ...args, read: false });
  },
});

// Admin mutation to resolve support ticket
export const resolveSupportTicket = mutation({
  args: { ticketId: v.id("support"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ticketId, { status: args.status });
    return args.ticketId;
  },
});

// Admin mutation to log analytics event
export const logAnalyticsEvent = mutation({
  args: {
    event: v.string(),
    uid: v.optional(v.string()),
    data: v.optional(v.any()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("analytics", args);
  },
});
