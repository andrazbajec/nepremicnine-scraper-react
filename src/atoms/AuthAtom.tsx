import { atom } from 'recoil';
import { AuthAtomInterface } from '../interfaces/AuthInterface';

export const authAtom = atom({
    key: 'authState',
    default: {
        isAuthenticated: false,
        token: null,
        user: null,
    } as AuthAtomInterface,
});
