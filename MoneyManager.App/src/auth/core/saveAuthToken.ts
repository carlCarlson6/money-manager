import { StateGetter } from "./AuthState";

export const saveAuthToken = (token: string) => {
    localStorage.setItem("auth_token", token);
}

export const readAuthToken = (get: StateGetter) => {
    const tokenFromState = get().authToken;
    if (!tokenFromState) {
        const tokenFromStorage = localStorage.getItem("auth_token");
        if (tokenFromState === null) {
            console.log(1);
            return undefined;
        }
        console.log(2);
        saveAuthToken(tokenFromStorage!);
        return tokenFromStorage!;
    }
    console.log(3);
    saveAuthToken(tokenFromState!);
    return tokenFromState;
}