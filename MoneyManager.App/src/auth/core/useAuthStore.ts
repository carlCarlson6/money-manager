import { create } from "zustand"
import { loginHandler } from "./login";
import { signinHandler } from "./signin";
import { AuthState } from "./AuthState";
import { readAuthToken } from "./saveAuthToken";

export const useAuthStore = create<AuthState>()((set, get) => ({
    credentials: { name: undefined, password: undefined },
    status: "unauthenticated",
    authToken: undefined,
    getAuthToken: () => readAuthToken(get),
    updateUserName: (name) => set(({credentials}) => ({ credentials: { ...credentials, name } })),
    updatePassword: (password) => set(({credentials}) => ({ credentials: { ...credentials, password } })),
    signin: signinHandler(set, get),
    login: loginHandler(set, get),
    checkAuth: () => {

    },
}));

