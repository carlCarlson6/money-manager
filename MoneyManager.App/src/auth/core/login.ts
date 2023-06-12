import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import { saveAuthToken } from "./saveAuthToken";
import { AuthApiResponse, StateGetter, StateSetter, setAuthenticatedStatus, setLoadingStatus } from "./AuthState";

export const loginHandler = (set: StateSetter, get: StateGetter) => async () => {
    setLoadingStatus(set);

    const response = await fetch(`${import.meta.env.VITE_BE}/api/auth`, {
        method: "PUT",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(get().credentials)
    });

    if (!response.ok) {
        set((state) => ({ ...state, status: "error" }));
        return "ko";
    }

    const data = (await response.json()) as AuthApiResponse;
    saveAuthToken(data.token);
    setAuthenticatedStatus(set);
    return "ok";
}

export const useLogin = () => {
    const {login} = useAuthStore();
    const navigate = useNavigate();
    return async () => {
        const result = await login();
        if (result === "ko") {
            return;
        }
        navigate("/");
    }
}