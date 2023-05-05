import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const PreventAfterLogin = () => {
    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        flag = true;
    }
    return (
        <>

            {/* flag ? <Outlet /> : <Navigate to="/" /> */}
            {flag ? <Outlet /> : <Navigate to="/" />}
        </>
    )
}
export default PreventAfterLogin;