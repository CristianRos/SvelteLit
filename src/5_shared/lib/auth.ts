import { db } from "./db";

import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "$env/static/private";

if(!GOOGLE_CLIENT_ID) throw new Error("GOOGLE_CLIENT_ID is not set");
if(!GOOGLE_CLIENT_SECRET) throw new Error("GOOGLE_CLIENT_SECRET is not set");
 
export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
    }),
    emailAndPassword: {  
        enabled: true
    },
    socialProviders: { 
        google: { 
           clientId: GOOGLE_CLIENT_ID, 
           clientSecret: GOOGLE_CLIENT_SECRET, 
        }, 
    }, 
});
