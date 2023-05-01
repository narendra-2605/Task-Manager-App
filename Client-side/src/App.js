import { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// require('dotenv').config(); 
import Login from './components/Login';
import SignUp from "../src/components/SignUp";
import AddTodo from './components/AddTodo'
import UserTodo from './components/UserTodo'
import Navbar from './components/Navbar';
import AdminTodo from './components/AdminTodo';
import SuperAdmin from "./components/SuperAdmin";
import CreateAdmin from './components/CreateAdmin';
import CreateOrganization from './components/CreateOrganization';
import CreateUser from './components/CreateUser';
import LogoutPrivateRoute from './Routes/LogoutPrivateRoute';
import AdminPrivateRoutes from "./Routes/AdminPrivateRoute";
import PreventLoginPagePrivate from "./Routes/priventLoginPagePrivate";


function App() {
  const [value, setValue] = useState("")
  const [login, setLogin] = useState(false);
  useEffect(() => {
    setValue(localStorage.getItem("user"));
  }, [login]);
  return (<>
    {/* <div className="App">
      <h1 className='text-center m-5'>Todo List Using Redux</h1>
      <SignUp />
      <Login />
      <AddTodo />
      <TodoLists />
    </div> */}

    <Router >
      {/* <SuperAdmin/> */}
      {/* {value !== null ? <LogOut setLogin={setLogin} /> : null} */}
      {/* <Routes>
        <Route path="superAdmin" element={<SuperAdmin/>}/>
      </Routes> */}
      {/* {value !== null ? <LogOut setLogin={setLogin} /> : null} */}
      <Navbar />
      <Routes >

        {/* <Route element={<PreventLoginPagePrivate />}> */}
        {/* <Route path="/" element={<Login setLogin={setLogin} />} />
          <Route index element={<Login setLogin={setLogin} />} /> */}
        {/* <Route path="/" element={<LogOut />} /> */}

        {/* <Route path="/" element={< Login />} /> */}
        <Route path="/signUp" element={<SignUp />} />
        {/* </Route> */}
        <Route path="/createAdmin" element={<CreateAdmin />} />
        <Route path="/createOrganization" element={<CreateOrganization />} />
        <Route path="/createUser" element={<CreateUser />} />

        {/* <Route element={<LogoutPrivateRoute />}> */}
        <Route path="/addTodo" element={<AddTodo />} />
        <Route path="/userTodo" element={<UserTodo />} />
        {/* </Route> */}

        {/* <Route element={<AdminPrivateRoutes />}> */}
        <Route path="/adminTodo" element={<AdminTodo />} />
        {/* </Route> */}

        {/* <Route element={<SuperAdmin />}> */}
        <Route path="/superAdmin" element={<SuperAdmin />} />
        {/* </Route> */}
      </Routes>
    </Router>
  </>);
}

export default App;
