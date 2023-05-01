import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, Link } from "react-router-dom";
import { login } from '../redux/actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import './css/login.css'

const Login = (props) => {
    const dispatch = useDispatch();
    const [data, setData] = useState({});
    const [error, setError] = useState('')
    const navigate = useNavigate();
    const changeEvent = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });
        if (e.target.name === 'email') {
            setError({
                email: ""
            })
        }
        if (e.target.name === 'password') {
            setError({
                password: ""
            })
        }
    }

    const handleLogin = (e) => {
        e.preventDefault();
        if (!data.email) {
            setError((error) => ({
                ...error, email: "Please Enter the Email"
            }));
            return;
        }
        if (!data.password) {
            setError((error) => ({
                ...error, password: "Enter the Password"
            }));
            return;
        }
        console.log("Data:", data);
        dispatch(login(data)).then((res) => {
            console.log("role is ", res);
            props.setLogin(true);
            { res === "admin" ? navigate("/adminTodo") : navigate("/userTodo") }
        });
        setData({ email: "", password: "" });
        document.getElementById("loginForm").reset();
    }
    const handleToggle = () => {
        let pass = document.getElementById("password");
        let toggleBtn = document.getElementById("toggle");
        let currentType = pass.getAttribute("type");
        if (currentType === "password") {
            pass.setAttribute("type", "text");
            toggleBtn.setAttribute("class", "fa-solid fa-eye-slash");
        } else {
            pass.setAttribute("type", "password");
            toggleBtn.setAttribute("class", "fa-sharp fa-solid fa-eye toggle");
        }
    };

    return (
        <>
            <div className="login-card shadow-lg border">
                <h2>Login</h2>
                <h3>Enter your credentials</h3>
                <form onSubmit={handleLogin} id="loginForm" className="login-form " >
                    <input type="email" placeholder='Email' name='email' id='email' onChange={(e) => changeEvent(e)} required />
                    <input type="password" placeholder='Password' name='password' id='password' onChange={(e) => changeEvent(e)} required />
                    <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
                 
                    <button type="submit">Login</button>
                </form>
            </div>
            {/* </div> */}
            <Outlet />
            <ToastContainer />
        </>
    )
}

export default Login;










            {/* <div className="col-4 m-auto mt-5 p-5 border"> */}
            {/* <h3 className="text-center pb-2">Login Form</h3> */}
            {/* <form onSubmit={handleLogin} id="loginForm">
                    <div className="row">
                        <div className="col-12 col-sm-12">
                            <input type="email"
                                name="email" placeholder="Email" className="form-control mb-2" onChange={(e) => changeEvent(e)} required />
                            <span className="text-danger">{error?.email}</span>
                        </div>
                        <div className="col-12 col-sm-12">
                            <input type="password"
                                name="password" placeholder="Password" className="form-control mb-2" onChange={(e) => changeEvent(e)} required />
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Link to="/">Click here to Sign-up</Link>
                            <button className=" btn btn-primary " type="submit"> Login
                            </button>
                        </div>
                    </div>
                </form> */}
