import React from 'react';
import { Outlet, Navigate } from 'react-router-dom'
const LogoutPrivateRoute = () => {
  let flag;
  if (JSON.parse(localStorage.getItem("user"))) {
    if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "user") {
      flag = 0;  // Redirect to Outlet
    }
    else if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
      flag = 1;  // Redirect to Admin-todo
    }
  } else {
    flag = 2;
  }
  return (
    <>
      {
        flag === 0 ? <Outlet /> : flag === 1 ? <Navigate to="/adminTodo" /> : flag === 2 ? <Navigate to="/createAdmin" /> : <Navigate to="/" />
      }
    </>
  )
}
export default LogoutPrivateRoute;