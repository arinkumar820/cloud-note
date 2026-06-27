import { betterAuth } from "better-auth"
import { mongodbAdapter } from "@better-auth/mongo-adapter"

import clientPromise from "./mongo-client"


const client =await clientPromise
const db = client.db("arin")

export const auth =betterAuth({
    database: mongodbAdapter(db),

      trustedOrigins: [
    "http://localhost:3000",
  ],
    emailAndPassword:{
        enabled:true
    }
})
