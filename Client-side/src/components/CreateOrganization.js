import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    getTodos,
    deleteTodo,
    editTodo,
    markTodoCompleted,
    clearAlltodo, deleteUserTodo
} from "../redux/actions";
const CreateOrganization = () => {
    const [value, setValue] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const todos = useSelector((state) => state?.todoReducer?.todos);
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    // console.log('my todo', todos);
    let todoLength;
    if (todos.length) {
        todoLength = todos.length;
    }
    // console.log('todo length', todoLength);

    useEffect(() => {
        dispatch(getTodos());
    }, [])

    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(todoLength / rowPerPAge); i++) {
        pageNumbers.push(i);
    }

    const indexOfLastRowOfCurrentPage = currentPage * rowPerPAge;
    const indexOfFirstRowOfCurrentPage = indexOfLastRowOfCurrentPage - rowPerPAge;

    const currentRows = todos.slice(indexOfFirstRowOfCurrentPage, indexOfLastRowOfCurrentPage);

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
        if (currentPage !== Math.ceil(todos.length / rowPerPAge))
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
            // dispatch(deleteTodo(id));
            // dispatch(deleteUserTodo(id));
        }
    };

    const changeEvent = (e, id) => {
        if (e?.target?.checked === true) {
            setSelectedTodo(id);
        }
        if (e?.target?.checked === false) {
            setSelectedTodo([]);
        }
    }

    /**
     * function to mark the perticular todo as completed
     */


    const handleChange = (e) => {
        const results = todos.filter(post => {
            if (e.target.value === "") return todos
            return post.title.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setstate({
            query: e.target.value,
            list: results
        })
    }
    const onSubmit = () => {

    }
    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="todoForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <label className="sr-only">Name</label>
                        <input
                            type="text"
                            name="title"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Organization Name"
                            defaultValue={value?.title}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Description</label>
                        <input
                            type="password"
                            name="description"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Password"
                            defaultValue={value?.description}
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
            <h3 className="text-center">Organization List</h3>
            <div className="row">
                <div className="col-3  col-xm-12 ">
                    <input className="form-control mb-2 mr-sm-3" onChange={handleChange} value={state.query} type="search" placeholder=" Search by Name :" />
                </div>
                <div className=" col-3  float-right">
                    <select className="form-select" onChange={(e) => handlePageSize(e)} >
                        <option >Select No. Of Item</option>
                        <option value="5" >5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </div>
            </div>
            <table class=" table table-hover  table-bordered ">
                <thead>
                    <tr>
                        <th scope="col"> Organization Name</th>
                        <th scope="col">Organization Details</th>
                        <th scope="col">Delete Organization</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Delete</td>
                    </tr>
                </tbody>
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

export default CreateOrganization;