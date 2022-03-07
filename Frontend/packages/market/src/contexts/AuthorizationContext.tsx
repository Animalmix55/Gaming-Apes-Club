import React from 'react';
import { LoginPostResponse } from '../api/Requests';

export interface AuthorizationContextType
    extends Omit<LoginPostResponse, 'error'> {
    onLogin: (data: LoginPostResponse) => void;
}

export const AuthorizationContext =
    // eslint-disable-next-line no-void
    React.createContext<AuthorizationContextType>({ onLogin: () => void 0 });

export const AuthorizationContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}): JSX.Element => {
    const [data, onLogin] = React.useState<LoginPostResponse>();

    return (
        <AuthorizationContext.Provider value={{ ...data, onLogin }}>
            {children}
        </AuthorizationContext.Provider>
    );
};

export const useAuthorizationContext = (): AuthorizationContextType =>
    React.useContext(AuthorizationContext);
