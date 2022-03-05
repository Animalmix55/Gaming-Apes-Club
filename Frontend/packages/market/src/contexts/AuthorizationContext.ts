import React from 'react';

export interface AuthorizationContextType {
    token?: string;
}

export const AuthorizationContext =
    React.createContext<AuthorizationContextType>({});

export const AuthorizationContextProvider = AuthorizationContext.Provider;

export const useAuthorizationContext = (): AuthorizationContextType =>
    React.useContext(AuthorizationContext);
