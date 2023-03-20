import { useRecoilState } from 'recoil';
import { authAtom } from '../atoms/AuthAtom';
import React, { useCallback, useEffect, useMemo } from 'react';
import Cookies from 'js-cookie';
import $ from '../axios';
import { AuthAtomInterface, UserInterface } from '../interfaces/AuthInterface';

export default function useAuth() {
    const [authState, setAuthState] = useRecoilState(authAtom);

    const getAuth = useCallback(() => {
        return authState;
    }, [authState]);

    const setAuth = useCallback(({ token, isAuthenticated, user }: AuthAtomInterface) => {
        setAuthState({ isAuthenticated, token, user });
    }, []);

    const isLoggedIn = useMemo(() => {
        return authState.isAuthenticated;
    }, [authState.isAuthenticated]);

    const validateToken = useCallback(() => {
        const token = Cookies.get('user-token');

        if (!token) {
            return;
        }

        $.post('user/validate-token', {
            token,
        }).then(({ data: { user } }) => {
            if (!user) {
                return;
            }

            setAuth({ token, isAuthenticated: true, user });
        }).catch(() => {
            // Fall through
        });
    }, []);

    useEffect(() => {
        return () => {
        };
    }, []);

    return { getAuth, setAuth, isLoggedIn, validateToken };
}
