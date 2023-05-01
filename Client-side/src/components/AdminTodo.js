import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getAllUser, deleteUser, addTodo, getAdminTodos, deleteAdminTodo } from "../redux/actions/adminAction";
import "./style.css";

const AdminTodo = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state?.adminReducer.data);
    // console.log("User List from AdminTodo", users);
    const adminTodoLists = useSelector((state) => state?.adminReducer.adminTodoList);
    // console.log("adminTodo List", adminTodoLists);
    const [value, setValue] = useState({});

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAdminTodos());
    }, []);

    const changeEvent = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }
    const handleDelete = (e, id) => {
        console.log("User Id from admin todo:", id);
        dispatch(deleteUser(id));
    }

    const handleDeleteTodo = (e, todoId) => {
        // console.log("Todo Id from admin todo:", todoId);
        dispatch(deleteAdminTodo(todoId));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(addTodo(value));
    }

    return (
        <>
            <div className="container my-4 py-1 border bg-light rounded">
                <form className="mt-3 mb-2 " id="todoForm" onSubmit={onSubmit}>
                    <div className="row">
                        <div className="col-xl-3">
                            <label className="sr-only">Name</label>
                            <input
                                type="text"
                                name="title"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Todo Title"
                                defaultValue={value?.title}
                                onChange={(e) => changeEvent(e)}
                            />
                        </div>

                        <div className="col-xl-3">
                            <label className="sr-only">Description</label>
                            <input
                                type="text"
                                name="description"
                                className="form-control mb-2 mr-sm-3"
                                placeholder="Description"
                                defaultValue={value?.description}
                                onChange={(e) => changeEvent(e)}
                            />
                        </div>

                        <div className="col-xl-2">
                            <button className="btn btn-primary mb-2" type="submit">
                                {" "}
                                {/* {isEdit ? "Update Todo" : "Create Todo"} */}
                                Create Todo
                                {" "}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container bg-light rounded shadow-lg p-3">
                <h3 className="text-center ">Users List</h3>
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th width="30%">UserName</th>
                            <th width="50%">Email</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users && users?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm ml-1 tooltips" onClick={(e) => handleDelete(e, user?._id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <span className="tooltiptext">Delete User</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>


            <div className="container bg-light rounded shadow-lg  mt-3 p-3">
                <h3 className="text-center ">Admin Todo List</h3>
                <table className="table table-bordered table-hover text-center">
                    <thead>
                        <tr>
                            <th width="30%">Title</th>
                            <th width="50%">Description</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminTodoLists && adminTodoLists?.map((todo, index) => (
                                <tr key={index}>
                                    <td>{todo?.title}</td>
                                    <td>{todo?.description}</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm ml-1 tooltips" onClick={(e) => handleDeleteTodo(e, todo?._id)}>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <span className="tooltiptext">Delete Todo</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <ToastContainer />
        </>
    )
}

export default AdminTodo;