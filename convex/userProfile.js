import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const upsertUserProfile = mutation({
  args: {
    uid: v.string(),
    displayName: v.string(),
    email: v.string(),
    bio: v.optional(v.string()),
    photoURL: v.optional(v.string()),
    preferences: v.optional(v.any()),
    createdAt: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
  const existing = await ctx.db.query("user")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return { updated: true, _id: existing._id };
    } else {
  const _id = await ctx.db.insert("user", args);
      return { created: true, _id };
    }
  }
});

export const getByUid = query({
  args: { uid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.query("user")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .first();
  }
});

export const updateUserProfile = mutation({
  args: {
    uid: v.string(),
    updates: v.object({
      displayName: v.optional(v.string()),
      bio: v.optional(v.string()),
      photoURL: v.optional(v.string()),
      preferences: v.optional(v.any()),
    })
  },
  handler: async (ctx, args) => {
  const existing = await ctx.db.query("user")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .first();
    
    if (!existing) {
      throw new Error("User not found");
    }

    await ctx.db.patch(existing._id, args.updates);
    return await ctx.db.get(existing._id);
  }
});

export const updateUserEmail = mutation({
  args: {
    uid: v.string(),
    email: v.string(),
    currentEmail: v.string()
  },
  handler: async (ctx, args) => {
  const existing = await ctx.db.query("user")
      .filter(q => q.eq(q.field("uid"), args.uid))
      .first();
    
    if (!existing) {
      throw new Error("User not found");
    }

    // Verify the current email matches before updating
    if (existing.email !== args.currentEmail) {
      throw new Error("Current email does not match");
    }

    await ctx.db.patch(existing._id, { email: args.email });
    return await ctx.db.get(existing._id);
  }
});

export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  }
});
