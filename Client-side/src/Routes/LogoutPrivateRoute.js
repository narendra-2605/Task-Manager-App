import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
const LogoutPrivateRoute = () => {
  let flag;
  if (JSON.parse(localStorage.getItem("user"))) {
    if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "user") {
      flag = 0;
    }
    else {
      flag = 1; // Redirect to Admin
    }
  } else {
    flag = 2;
  }
  return (
    <>

      {/* flag ? <Outlet /> : <Navigate to="/" /> */}
      {flag === 0 ? <Outlet /> : flag === 1 ? <Navigate to="/adminTodo" /> : <Navigate to="/" />}
    </>
  )
}
export default LogoutPrivateRoute;