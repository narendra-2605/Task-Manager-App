import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewTodo, updateTodo } from "../redux/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTodo = () => {
  const [value, setValue] = useState({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const isEdit = useSelector((state) => state?.todoReducer?.isEdit);
  const editTodo = useSelector((state) => state?.todoReducer?.editTodo);
  const userId = JSON.parse(localStorage.getItem("user"))['data']['user']['_id'];

  useEffect(() => {
    setValue({
      ...value,
      userId: userId
    })
    editTodo && setValue(() => editTodo);
  }, [editTodo]);
  /**
   * Function to handle to input onChange event
   * @param {event} e 
   */

  const changeEvent = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
    if (e?.target?.name === "title") {
      setError({
        title: "",
      });
    }
    if (e?.target?.name === "description") {
      setError({
        description: "",
      });
    }
  };
  /**
   * Function to handle the sumission of the todo form
   * @param {event} e 
   * @returns 
   */
  const onSubmit = (e) => {
    e.preventDefault();


    if (!value?.title) {
      setError((error) => ({
        ...error,
        title: "Please enter todo title",
      }));
      return;
    }
    if (!value?.description) {
      setError((error) => ({
        ...error,
        description: "Please enter todo description",
      }));
      return;
    }
    if (isEdit) {
      const id = value._id;
      dispatch(updateTodo(id, value));
    } else {
      // setValue({
      //   ...value,
      //   userId: userId
      // });
      console.log("value is ", value);
      dispatch(addNewTodo(value))
    }
    setValue({ title: "", description: "" });
    document.getElementById("todoForm").reset();
  };


  return (
    <>
      <div className="container bg-light my-4 py-1 border rounded">
        <form className="mt-3 mb-2" id="todoForm" onSubmit={onSubmit}>
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
              <span className="text-danger">{error?.title}</span>
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
              <span className="text-danger">{error?.description}</span>
            </div>

            <div className="col-xl-2">
              <button className="btn btn-primary mb-2" type="submit">
                {" "}
                {isEdit ? "Update Todo" : "Create Todo"}{" "}

              </button>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddTodo;
