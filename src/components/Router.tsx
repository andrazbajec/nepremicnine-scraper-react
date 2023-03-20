import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import FilterList from '../pages/FilterList';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import React, { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const Router = () => {
    const { isLoggedIn } = useAuth();
    const { pathname } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (pathname === '/login') {
                navigate('/');
            }
            return;
        }

        if (pathname !== '/login') {
            navigate('/login');
            return;
        }
    }, [pathname, isLoggedIn]);

    return (
        <Routes>
            <Route path="/filter-list" element={<FilterList/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Home/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default Router;
