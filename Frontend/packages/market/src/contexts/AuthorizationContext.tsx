import { useCurrentTime } from '@gac/shared';
import decodeJWT from 'jwt-decode';
import React from 'react';
import { LoginPostResponse } from '../api/Requests';

interface Claims extends LoginPostResponse {
    exp: number;
    iat: number;
}

export interface AuthorizationContextType {
    token?: string;
    claims?: Claims;
    onLogin: (token?: string) => void;
}

export const AuthorizationContext =
    // eslint-disable-next-line no-void
    React.createContext<AuthorizationContextType>({ onLogin: () => void 0 });

export const LOGIN_SESSION_KEY = 'login_token';

export const AuthorizationContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [token, setToken] = React.useState<string>();
    const time = useCurrentTime();

    React.useEffect(() => {
        const token = sessionStorage.getItem(LOGIN_SESSION_KEY);
        if (!token) return;
        setToken(token);
    }, []);

    const onLogin = React.useCallback((token: string) => {
        if (!token) return;
        sessionStorage.setItem(LOGIN_SESSION_KEY, token);
        setToken(token);
    }, []);

    const claims = React.useMemo(() => {
        if (!token) return undefined;

        return decodeJWT(token) as Claims;
    }, [token]);

    React.useEffect(() => {
        if (!claims) return;
        const { exp } = claims as { exp: number | undefined };

        if (!exp) return;

        if (exp < time) {
            setToken(undefined); // logout
            sessionStorage.removeItem(LOGIN_SESSION_KEY);
        }
    }, [claims, time]);

    return (
        <AuthorizationContext.Provider value={{ claims, token, onLogin }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorizationContext = (): AuthorizationContextType =>
    React.useContext(AuthorizationContext);
