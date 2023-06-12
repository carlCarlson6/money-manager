import { Navigate } from "react-router-dom";
import { useAuthStore } from "./core/useAuthStore";
import { AuthRoutePath } from "./routes";
import { ReactNode, useEffect } from "react";

export const useAuthGuard = () => {
    const { getAuthToken } = useAuthStore();
    return getAuthToken();
}

export const AuthGuard: React.FC<{ children: ReactNode }> = ({children}) => {
    const isAuthenticated = useAuthGuard();

    return (<>{
        isAuthenticated
            ? 
                <>{children}</>
            : 
                <Navigate replace to={AuthRoutePath}/>
    }</>);
}