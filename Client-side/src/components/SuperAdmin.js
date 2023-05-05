import React from "react";
import { Outlet, Link } from "react-router-dom";
import './css/login.css';

const SuperAdmin = () => {
    const changeEvent = (e) => {

    }

    const handleOrganization = () => {

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
    }


    return (<>
        <div className="row">
            <div className="col-4">
                <form className="border ml-4">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-3 form-check">
                        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                        <label class="form-check-label" for="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
            <div className="col-4">
                <h4>Organization List</h4>
            </div>
        </div>


        <div className="row">
            <div className="register-card shadow-lg  border col-4">
                <h4>Create Admin</h4>
                <h3>Enter The Credentials</h3>
                <form className="register-form" onSubmit={handleOrganization} id="signUpForm">
                    <input type="text" placeholder=' Name' name='name' id='name' onChange={(e) => changeEvent(e)} required />
                    <input type="email" placeholder=' Email' name='email' id='email' onChange={(e) => changeEvent(e)} required />
                    <select class="form-control">
                        <option>Default select</option>
                    </select>

                    <input type="password" placeholder='Password' name='password' id='password' onChange={(e) => changeEvent(e)} required />
                    <span className="fa-sharp fa-solid fa-eye toggle" id="toggle" onClick={handleToggle}></span>
                    <Link to={"/"}>Already have an account?</Link>
                    <button type='submit' id='submitBtn'>Create Admin</button>
                </form>
            </div>
            <div className="col-4">
                <h2>Admin List</h2></div>
        </div>
        {/* </div> */}
    </>)
}
export default SuperAdmin;