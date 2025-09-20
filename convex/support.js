import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createSupportTicket = mutation({
  args: {
    uid: v.string(),
    subject: v.string(),
    message: v.string(),
    status: v.optional(v.string()),
    createdAt: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("support", {
      ...args,
      status: args.status || "open",
    });
  },
});

export const getSupportTickets = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("support")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .collect();
  },
});

export const updateSupportStatus = mutation({
  args: { ticketId: v.id("support"), status: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.ticketId, { status: args.status });
  },
});
