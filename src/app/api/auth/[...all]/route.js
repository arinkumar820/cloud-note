import { auth } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";//This converts Better Auth into Next.js Route Handlers.

export const {GET , POST }= toNextJsHandler(auth)