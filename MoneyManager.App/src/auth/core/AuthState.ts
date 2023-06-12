export interface AuthState {
    credentials: Createndials;
    status: AuthStatus;
    authToken: string | undefined;
    getAuthToken: () => string | undefined;
    updateUserName: (userName: string) => void;
    updatePassword: (password: string) => void;
    signin: () => Promise<"ok" | "ko">;
    login: () => Promise<"ok" | "ko">;
    checkAuth: () => void;
}

type AuthStatus = "authenticated" | "unauthenticated" | "loading" | "error";

export type Createndials = {
    name: string | undefined;
    password: string | undefined;
};

export type StateGetter = () => AuthState;
export type StateSetter = (partial: AuthState | Partial<AuthState> | ((state: AuthState) => AuthState | Partial<AuthState>), replace?: boolean | undefined) => void;

export const setLoadingStatus = (set: StateSetter) => set((state) => ({ ...state, status: "loading"}));
export const setAuthenticatedStatus = (set: StateSetter) => set((state) => ({ ...state, status: "authenticated"}));

export type AuthApiResponse = {
    token: string;
}