// @ts-check
import { z } from "zod";


export const serverSchema = z.object({
	DB_PG_PORT: z.string(),
	DB_PG_HOST: z.string(),
	DB_PG_USER: z.string(),
	DB_PG_PASS: z.string(),
	DB_PG_NAME: z.string(),

	AUTH0_SECRET: z.string(),
	AUTH0_BASE_URL: z.string(),
	AUTH0_ISSUER_BASE_URL: z.string(),
	AUTH0_CLIENT_ID: z.string(),
	AUTH0_CLIENT_SECRET: z.string(),
	
	SUPABASE_SERVICE_ROLE_KEY: z.string(),
	SUPABASE_JWT_SECRET: z.string(),

	NODE_ENV: z.enum(["development", "test", "production"]),

	NEXTAUTH_URL: z.preprocess(
		// This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
		// Since NextAuth.js automatically uses the VERCEL_URL if present.
		(str) => process.env.VERCEL_URL ?? str,
		// VERCEL_URL doesn't include `https` so it cant be validated as a URL
		process.env.VERCEL ? z.string() : z.string().url(),
	),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
	// NEXT_PUBLIC_CLIENTVAR: z.string(),
	NEXT_PUBLIC_SUPABASE_URL: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
	// NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
	NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL
};
