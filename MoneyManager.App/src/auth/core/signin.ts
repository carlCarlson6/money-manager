import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import { saveAuthToken } from "./saveAuthToken";
import { AuthApiResponse, StateGetter, StateSetter, setAuthenticatedStatus, setLoadingStatus } from "./AuthState";

export const signinHandler = (set: StateSetter, get: StateGetter) => async () => {
    setLoadingStatus(set);

    const response = await fetch(`${import.meta.env.VITE_BE}/api/auth`, {
        method: "POST",
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

export const useSignIn = () => {
    const {signin} = useAuthStore();
    const navigate = useNavigate();
    return async () => {
        await signin();
        navigate("/");
    }
}