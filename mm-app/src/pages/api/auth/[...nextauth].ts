import { SupabaseAdapter } from "@next-auth/supabase-adapter";
import NextAuth, { type NextAuthOptions } from "next-auth";
import Auth0Provider from "next-auth/providers/auth0";
import { env } from "../../../env/server.mjs";
import jwt from "jsonwebtoken"


export const authOptions: NextAuthOptions = {
    callbacks: {
        session({ session, user }) {
            return env.SUPABASE_JWT_SECRET 
                ? { ...session, 
                    supabaseAccessToken: jwt.sign({
                        aud: "authenticated",
                        exp: Math.floor(new Date(session.expires).getTime() / 1000),
                        sub: user.id,
                        email: user.email,
                        role: "authenticated",}, 
                        env.SUPABASE_JWT_SECRET )}
                : session;
        },
    },
    providers: [
        Auth0Provider({
            clientId: env.AUTH0_CLIENT_ID,
            clientSecret: env.AUTH0_CLIENT_SECRET,
            issuer: env.AUTH0_ISSUER_BASE_URL
        })
    ],
    adapter: SupabaseAdapter({
        url: env.NEXT_PUBLIC_SUPABASE_URL,
        secret: env.SUPABASE_SERVICE_ROLE_KEY
    })
};

export default NextAuth(authOptions);
