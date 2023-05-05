import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from 'react-toastify';
import { getAllUser, deleteUser, addTodo, getAdminTodos, deleteAdminTodo, updateAdminTask, editAdminTodo } from "../redux/actions/adminAction";

import "./style.css";

const AdminTodo = () => {
    const dispatch = useDispatch();
    const isEdit = useSelector((state) => state?.adminReducer?.isEdit);
    const updateTask = useSelector((state) => state?.adminReducer?.updateTodo);
    const users = useSelector((state) => state?.adminReducer.users);
    const adminTodoLists = useSelector((state) => state?.adminReducer.adminTodoList);
    console.log("adminTodo List", adminTodoLists);
    const [value, setValue] = useState({});
    const userId = JSON.parse(localStorage.getItem("user"))['data']['user']['_id'];

    useEffect(() => {
        dispatch(getAllUser());
        dispatch(getAdminTodos());
        setValue({
            ...value,
            userId: userId
        })
        updateTask && setValue(() => updateTask);
    }, [updateTask]);

    const changeEvent = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }

    const actionClick = (data) => {
        if (data && data?.type === "edit") {
            console.log("data from adminTodo action click", data);
            const id = data.todo._id;
            dispatch(editAdminTodo(id));
        }
    };


    const handleDelete = (e, id) => {
        console.log("User Id from admin todo:", id);
        dispatch(deleteUser(id));
    }

    const handleDeleteTodo = (e, todoId) => {
        dispatch(deleteAdminTodo(todoId));
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            const id = value._id;
            dispatch(updateAdminTask(id, value));
        }
        else {
            console.log("value is from admin todo", value);
            dispatch(addTodo(value));
        }
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
                        {isEdit ? null : <div className="col-xl-3">
                            <label className="sr-only">Select User</label>
                            <select className="form-select  mb-2 mr-sm-3" aria-label="Default select example" name="userId" onChange={(e) => changeEvent(e)} >
                                <option>Select User</option>
                                {users?.userList?.map((user) =>
                                    <option value={user._id}>{user.name}</option>
                                )}
                            </select>
                        </div>}

                        <div className="col-xl-2">
                            <button className="btn btn-primary mb-2" type="submit">
                                {" "}
                                {isEdit ? "Update Todo" : "Create Todo"}
                                {" "}
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container bg-light rounded shadow-lg  mt-3 p-3">
                <h3 className="text-center ">Admin Todo List</h3>
                <table className="table table-bordered table-hover text-center bg-light ">
                    <thead>
                        <tr>
                            <th width="30%">Title</th>
                            <th width="50%">Description</th>
                            <th width="20%"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            adminTodoLists && adminTodoLists?.tasks?.map((todo, index) => (
                                <tr key={index}>
                                    <td>{todo?.title}</td>
                                    <td>{todo?.description}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary btn-sm bi bi-pencil tooltips"
                                            onClick={() => actionClick({ todo: todo, type: "edit" })}  >
                                            <i className="fa-solid fa-pencil"></i><span className="tooltiptext">   Edit Todo
                                            </span>
                                        </button>
                                        <button className="btn btn-danger btn-sm ml-3 tooltips" onClick={(e) => handleDeleteTodo(e, todo?._id)}>
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