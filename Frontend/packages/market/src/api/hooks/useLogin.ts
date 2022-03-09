import React from 'react';
import { useAuthorizationContext } from '../../contexts/AuthorizationContext';
import { useGamingApeContext } from '../../contexts/GamingApeClubContext';
import { Login } from '../Requests';

interface UseLoginReturn {
    login: () => Promise<void>;
    isLoggingIn: boolean;
}

export const useLogin = (suppressListener?: boolean): UseLoginReturn => {
    const { api } = useGamingApeContext();
    const { onLogin } = useAuthorizationContext();

    const [loginPending, setLoginPending] = React.useState(false);

    React.useEffect(() => {
        if (suppressListener) return;

        const urlParams = new URLSearchParams(window.location.search);

        const code = urlParams.get('code');
        if (!code) return;
        if (!api) throw new Error('Cannot login due to missing api');
        setLoginPending(true);

        Login.getSessionToken(api, code)
            .then((v) => {
                onLogin(v);
                const url = window.location.href.split('?', 2)[0];
                window.history.replaceState('', '', url);
            })
            .finally(() => setLoginPending(false));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [api]);

    const login = React.useCallback(async () => {
        if (!api) throw new Error('Cannot login due to missing api');
        setLoginPending(true);

        const url = await Login.getLoginUrl(api);
        window.location.href = url;

        setLoginPending(false);
    }, [api]);

    return { login, isLoggingIn: loginPending };
};

export default useLogin;
