import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getorganizations, editTodo,
} from "../redux/actions";
import { getAllUser } from '../redux/actions/adminAction'
import { getAllOrganization } from "../redux/actions/organizationAction";
import { createUser, deleteUser } from "../redux/actions/authAdminAction";

const CreateUser = () => {

    const [value, setValue] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const users = useSelector((state) => state?.adminReducer?.users);
    const organizations = useSelector((state) => state?.organizationReducer?.organization);
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    console.log("users", users);
    // console.log("Organization:", organizations);


    let todoLength;
    if (organizations.length) {
        todoLength = organizations.length;
    }

    useEffect(() => {
        dispatch((getAllUser()));
        dispatch((getAllOrganization()));
    }, [])

    const deleteAction = (userId) => {
        console.log("user Id from create user", userId);
        dispatch(deleteUser(userId));
    }

    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(todoLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = organizations.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handlePageSize = (e) => {
        setRowPerPage(e.target.value);
        setCurrentPage(1);
    }

    const handlePrevious = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1);
    }

    const handleNext = () => {
        if (currentPage !== Math.ceil(organizations.length / rowPerPAge))
            setCurrentPage(currentPage + 1);
    }

    // *******************************************

    /**
     * actionClick Function
     * @param {Todo list and Action type ->  Edit or Delete todo in JSON form} data
     */
    const actionClick = (data) => {
        if (data && data?.type === "edit") {
            const idd = data.todo._id;
            dispatch(editTodo(idd));
        } else if (data && data?.type === "delete") {
            const id = data.todo._id;
            console.log("todo id from todoList action click", id)
        }
    };

    const changeEvent = (e, id) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    /**
     * function to mark the perticular todo as completed
     */


    const handleChange = (e) => {
        const results = organizations.filter(post => {
            if (e.target.value === "") return organizations
            return post.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Value from create user", value);
        dispatch(createUser(value));
    }
    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="createUserForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <label className="sr-only">Username</label>
                        <input
                            type="text"
                            name="username"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="username"
                            defaultValue={value?.username}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Name"
                            defaultValue={value?.name}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Email"
                            defaultValue={value?.email}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Description</label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Password"
                            defaultValue={value?.password}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>
                    <div className="col-xl-3">
                        <button className="btn btn-primary mb-2 " type="submit">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>

        <div className="container bg-light  my-4 py-1 border rounded">
            <h3 className="text-center">User List</h3>
            <div className="row">
                <div className=" col-3  float-right">
                    <select className="form-select" onChange={(e) => handlePageSize(e)} >
                        <option >Select No. Of Item</option>
                        <option value="5" >5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
                <div className="col-3  col-xm-12 ">
                    <input className="form-control mb-2 mr-sm-3" onChange={handleChange} value={state.query} type="search" placeholder=" Search by Name :" />
                </div>

            </div>
            <table class=" table table-hover  table-bordered ">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Organization</th>
                        <th scope="col">Email</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {users && users?.userList?.map((user) =>
                    <tbody>
                        <tr>
                            <td >{user.username}</td>
                            <td >{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="btn btn-danger btn-sm ml-1 tooltips"
                                    onClick={() => deleteAction(user._id)} >
                                    <i className="fa-solid fa-trash-can"></i>
                                    {/* <span className="tooltiptext">Delete Todo</span> */}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
        <div className="container">
            <div className="row pb-4" style={{ height: "60px" }}>
                <div className="col col-xm-12 text-start">
                    <button className="btn btn-secondary align-self-start" onClick={() => handlePrevious()} > Previous </button>
                </div>
                <div className="col col-xm-12">
                    <ul className="text-center">
                        {pageNumbers.map((number) => {
                            let btnClass = " btn btn-outline-secondary mx-1";
                            if (number === currentPage) btnClass = "btn btn-secondary mx-1";
                            return (
                                <button
                                    className={btnClass}
                                    onClick={() => paginate(number)}
                                >
                                    {number}
                                </button>
                            );
                        })}
                    </ul>
                </div>
                <div className="col col-xm-12 text-end">
                    <button className="btn btn-secondary ml-2 align-self-" onClick={() => handleNext()}  >   Next </button>
                </div>

            </div>
        </div>

    </>)
}

export default CreateUser;