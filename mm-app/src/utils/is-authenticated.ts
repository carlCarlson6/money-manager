type SessionStatus = "authenticated" | "loading" | "unauthenticated";

export const isAuthenticated = (status: SessionStatus) => status === "authenticated";