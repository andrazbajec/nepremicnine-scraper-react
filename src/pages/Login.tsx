import { Button, Flex, Input, Stack, useToast } from '@chakra-ui/react';
import axios from '../axios';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const toast = useToast();

    const typeMap = useMemo(() => {
        return {
            password: setPassword,
            username: setUsername,
        };
    }, [setPassword, setUsername]);

    const handleChange = useCallback(({ target: { value, dataset: { type } } }: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        typeMap[type](value);
    }, [typeMap]);

    const login = useCallback(() => {
        if (!password) {
            toast({
                duration: 5000,
                status: 'warning',
                title: 'Password is invalid',
            });

            return;
        }

        if (!username) {
            toast({
                duration: 5000,
                status: 'warning',
                title: 'Username is invalid',
            });

            return;
        }

        axios.post('user/login?XDEBUG_SESSION=XDEBUG_PHPSTORM', {
            password,
            username,
        }).then(({ data: { user } }) => {
            const token = Cookies.get('user-token');

            if (!user) {
                toast({
                    duration: 5000,
                    status: 'error',
                    title: 'There was a problem with getting the user data!',
                });

                return;
            }

            if (!token) {
                toast({
                    duration: 5000,
                    status: 'error',
                    title: 'There was a problem with getting the user token!',
                });

                return;
            }

            setAuth({ token, isAuthenticated: true, user });

            navigate('/');
        }).catch(({ response: { data: { Exception: exception } } }) => {
            toast({
                duration: 5000,
                status: 'error',
                title: exception,
            });
        }).finally(() => {
        });
    }, [password, username]);

    return (
        <>
            <Flex align="center"
                  height="100vh"
                  justify="center"
            >
                <Stack spacing={3}>
                    <Input data-type="username"
                           onChange={handleChange}
                           placeholder="Username"
                    />
                    <Input data-type="password"
                           onChange={handleChange}
                           placeholder="Password"
                           type="password"
                    />
                    <Button colorScheme="green"
                            onClick={login}
                    >
                        Login
                    </Button>
                </Stack>
            </Flex>
        </>
    );
};

export default Login;
