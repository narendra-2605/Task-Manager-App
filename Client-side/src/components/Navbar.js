import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./css/navbar.css";
import { Link } from "react-router-dom";
// import { Navbar } from "react-bootstrap";
// require('dotenv').config();

const Navbar = (props) => {
    const navigate = useNavigate();
    const authService = process.env.REACT_APP_authenticationService;


    let flag;
    if (JSON.parse(localStorage.getItem("user"))) {
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "superAdmin") {
            flag = 0;
        }
        if (JSON.parse(localStorage.getItem("user"))['data']['user']['role'] === "admin") {
            flag = 1;
        }
        else {
            flag = 2  // redirect to user
        }
    }
    // else {
    //     flag = 2;
    // }

    const handleLogout = (e) => {
        toast.error("logout Successfully", { autoClose: 1500 });
        // e.preventDefault();
        localStorage.removeItem("user");
        props.setLogin(false);
        navigate('/');
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-color ">
                <div className="container-fluid">
                    <a className="navbar-brand text-light hover" href="#">Task Manager App</a>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/createAdmin' className="nav-link text-light active" aria-current="page" >Create-Admin</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/createOrganization' className="nav-link text-light  active" aria-current="page" >Create-organization</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/createUser' className="nav-link text-light  active" aria-current="page" >Create-User</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleLogout} >
                            <button className="btn btn-light" type="submit">Logout</button>
                        </form>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </>
    )
}

export default Navbar;