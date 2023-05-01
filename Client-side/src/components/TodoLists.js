import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./style.css"

import {
  getTodos,
  deleteTodo,
  editTodo,
  markTodoCompleted,
  clearAlltodo, deleteUserTodo
} from "../redux/actions";
import "./style.css";

const TodoLists = () => {
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
      dispatch(deleteUserTodo(id));
    }
  };

  const deleteTodoo = (data) => {
    // console.log(data);
    const id = data.todo._id;
    console.log("todo id from todoList", id);
    dispatch(deleteUserTodo(id));
  }
  /**
   * Function
   * @param {event} e
   * @param {todo Id} todoId
   */
  // const changeEvent = (e, todoId) => {
  //   if (e?.target?.name !== "select_all_todo" && e?.target?.checked === true) {
  //     if (selectedTodo.indexOf(todoId) === -1) {
  //       setSelectedTodo((todo) => [...todo, todoId]);
  //     }
  //   } else if (
  //     e?.target?.name !== "select_all_todo" &&
  //     e?.target?.checked === false
  //   ) {
  //     const todos = selectedTodo.filter((todo) => todo !== todoId);
  //     setSelectedTodo(todos);
  //   }

  //   if (e?.target?.name === "select_all_todo" && e?.target?.checked === true) {
  //     todos &&
  //       todos.forEach((todo, index) => {
  //         const allChkbox = document.getElementsByName(`todo_${index}`);

  //         for (let chk of allChkbox) {
  //           chk.checked = true;
  //           let todoId = todo?.id;

  //           setSelectedTodo((todo) => [...todo, todoId]);
  //         }
  //       });
  //   } else if (
  //     e?.target?.name === "select_all_todo" &&
  //     e?.target?.checked === false
  //   ) {
  //     todos &&
  //       todos.forEach((todo, index) => {
  //         const allChkbox = document.getElementsByName(`todo_${index}`);
  //         for (let chk of allChkbox) {
  //           chk.checked = false;
  //           setSelectedTodo([]);
  //         }
  //       });
  //   }
  // };
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
  const markCompleted = () => {
    console.log('Selected todo markCompleted:', selectedTodo);
    dispatch(markTodoCompleted(selectedTodo));
  };

  const [query, setquery] = useState('');
  const [state, setstate] = useState({
    query: '',
    list: []
  })
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

  return (<>
    <div className="container my-2 pt-2 bg-light rounded ">
      <div className="row pb-4" style={{ height: "60px" }}>
        <div className="col-lg-2 col-md-3 col-sm-12 text-left">
          <select className="form-select" onChange={(e) => handlePageSize(e)} >
            <option >Select No. Of Item</option>
            <option value="5" >5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
        <div className="col-lg-2 col-md-3 col-xm-12 ">
          <input className="form-control mb-2 mr-sm-3" onChange={handleChange} value={state.query} type="search" placeholder=" Search by Name :" />
        </div>
        <div className="col-lg-8 col-md-6 col-xm-12 text-right">
          <button className="btn btn-danger" onClick={() => dispatch(clearAlltodo())}  > Clear Todos   </button>
          {selectedTodo.length > 0 && (
            <>
              <button className="btn btn-success ml-2" onClick={markCompleted}>
                Mark As Completed
              </button>
            </>
          )}
        </div>
      </div>

      {/* style={todoLength > 20 ? tableStyle : tableScrolls}  table-scroll */}
      {/* style={{ color: todoLength>6 ? 'red' : 'blue' }} */}

      {/* <table className={todoLength > 5 ? 'overflowYScroll table-scroll table table-bordered table-hover' : 'table table-bordered  table-hover '} > */}
      {/* table-responsive  */}
      <table className="table table-bordered  overflow-y-scroll table-hover" id="myTable" >
        <thead>
          <tr>
            <th width="3%">
              {/* <input  type={"checkbox"}  onChange={(e) => changeEvent(e)}  name={"select_all_todo"}/> */}
            </th>
            <th width="30%">Name</th>
            <th width="42%">Description</th>
            <th width="8%">Status</th>
            <th width="20%">Action</th>
          </tr>
        </thead>

        {/* {state.query === '' ? "No posts match the query" : !state.list.length ? "Your query did not return any results" : state.list.map((post, index) => { */}
        {
          state.query === ''
            ?
            <tbody >
              {
                // todos && todos?.map((todo, index) => (
                currentRows.map((todo, index) => (

                  <tr key={index}>
                    <td>
                      <input type={"checkbox"}
                        value={todo?._id} onChange={(e) => changeEvent(e, todo._id)}
                        name={`todo_${index}`} />
                    </td>
                    <td>{todo?.title}  </td>
                    <td>{todo?.description} {todo?._id}</td>
                    <td>
                      {todo?.isCompleted ? (
                        <span className="badge badge-success p-2">Completed</span>
                      ) : todo?.isPending ? (
                        <span className="badge badge-danger p-2">Pending</span>
                      ) : (
                        ""
                      )}
                    </td>
                    <td>
                      {todo?.role ? null : <> <button
                        className="btn btn-primary btn-sm bi bi-pencil tooltips"
                        onClick={() => actionClick({ todo: todo, type: "edit" })}  >
                        <i className="fa-solid fa-pencil"></i> <span className="tooltiptext">
                          Edit Todo
                        </span>
                      </button>
                        <button className="btn btn-danger btn-sm ml-1 tooltips"
                          onClick={() => { deleteTodoo({ todo: todo }) }}
                        // onClick={() => actionClick({ todo: todo, type: "delete" })}
                        >
                          <i className="fa-solid fa-trash-can"></i>
                          <span className="tooltiptext">Delete Todo</span>
                        </button>
                      </>
                      }
                    </td>
                  </tr>
                ))
              }
            </tbody>
            :
            !state.list.length ? "Your query did not return any results" : state.list.map((post, index) => {
              return (
                <tbody >
                  {
                    <tr key={index}>
                      <td>
                        <input type={"checkbox"}
                          value={post?.id} onChange={(e) => changeEvent(e, post._id)}
                          name={`todo_${index}`} />
                      </td>
                      <td>{post.title}  </td>
                      <td>{post.description}</td>
                      <td>
                        {post.isCompleted ? (
                          <span className="badge badge-success p-2">Completed</span>
                        ) : post?.isPending ? (
                          <span className="badge badge-danger p-2">Pending</span>
                        ) : (
                          ""
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm bi bi-pencil tooltips"
                          onClick={() => actionClick({ todo: post, type: "edit" })}
                        > <i className="fa-solid fa-pencil"></i>
                          <span className="tooltiptext">Edit Todo</span>
                        </button>
                        <button className="btn btn-danger btn-sm ml-1 tooltips"
                          onClick={() => actionClick({ todo: post, type: "delete" })} >
                          <i className="fa-solid fa-trash-can"></i>
                          <span className="tooltiptext">Delete Todo</span>
                        </button>
                      </td>
                    </tr>

                  }
                </tbody>
              )
            })
        }
      </table>

      <div className=" row ">
        <div className="col-3 col-xm-12 text-start">
          <button className="btn btn-secondary align-self-start" onClick={() => handlePrevious()} > Previous </button>
        </div>
        <div className="col-6 col-xm-12">
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
        <div className="col-3 col-xm-12 text-end">
          <button className="btn btn-secondary ml-2 align-self-" onClick={() => handleNext()}  >   Next </button>
        </div>
      </div>

    </div>
    {/* <ToastContainer /> */}
  </>
  );
};

export default TodoLists;
