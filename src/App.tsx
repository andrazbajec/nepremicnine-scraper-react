import React, { useEffect } from 'react';
import Router from './components/Router';
import useAuth from './hooks/useAuth';

function App() {
    const { validateToken } = useAuth();

    useEffect(() => {
        validateToken();
    }, []);

    return (
        <>
            <Router/>
        </>
    );
}

export default App;
