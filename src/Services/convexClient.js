import { ConvexHttpClient } from "convex/browser";

// Replace with your actual deployment URL if needed
const convexUrl = process.env.CONVEX_URL || "https://artful-spoonbill-818.convex.cloud";

export const convex = new ConvexHttpClient(convexUrl);