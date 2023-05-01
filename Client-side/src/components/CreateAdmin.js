import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createAdmin } from "../redux/actions/authAdmin";
import { getAllOrganization } from "../redux/actions/organizationAction";
import { getAllAdmin } from '../redux/actions/authAdmin';

const CreateAdmin = () => {
    const [data, setData] = useState({});
    const [query, setquery] = useState('');
    const [state, setstate] = useState({
        query: '',
        list: []
    })
    const dispatch = useDispatch();
    const organizations = useSelector((state) => state?.organizationReducer?.organization);
    const admins = useSelector((state) => state?.adminReducer?.admin)
    const [selectedTodo, setSelectedTodo] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowPerPAge, setRowPerPage] = useState(5);
    const [search, setSearch] = useState();
    const pageNumbers = [];

    // console.log('my organization', organizations);
    // console.log('my admins', admins);

    let organizationLength;
    if (organizations.length) {
        organizationLength = organizations.length;
    }
    // console.log('organization length', organizationLength);

    useEffect(() => {
        dispatch(getAllAdmin());
        dispatch(getAllOrganization());
    }, [])

    //  **************** Pagination Logic *******************

    for (let i = 1; i <= Math.ceil(organizationLength / rowPerPAge); i++) {
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
     * @param {organization list and Action type ->  Edit or Delete organization in JSON form} data
     */
    const actionClick = (data) => {

    };

    const changeEvent = (e) => {
        setData({
            ...data, [e.target.name]: e.target.value,
        });        // console.log("Value is :", value);
    }

    /**
     * function to mark the perticular organization as completed
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
        dispatch(createAdmin(data));
    }
    return (<>
        <div className="container bg-light  my-4 py-1 border rounded">
            <form className="mt-3 mb-2 " id="organizationForm" onSubmit={onSubmit}>
                <div className="row">
                    <div className="col-xl-3">
                        <label className="sr-only">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control mb-2 mr-sm-3"
                            placeholder="Admin Name"
                            defaultValue={data?.name}
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
                            defaultValue={data?.password}
                            onChange={(e) => changeEvent(e)}
                        />
                    </div>

                    <div className="col-xl-3">
                        <label className="sr-only">Select Organization</label>
                        <select className="form-select  mb-2 mr-sm-3" aria-label="Default select example">
                            {organizations.map((organization) =>
                                <option value="1">{organization.name}</option>
                            )} </select>
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
            <h3 className="text-center">Admin List</h3>
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
                        <th scope="col">Name</th>
                        <th scope="col">Organization</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                {admins.map((admin) =>

                    <tbody>
                        <tr>
                            <th scope="row">{admin.name}</th>
                            <td>{admin.email}</td>
                            <td>Delete</td>
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

export default CreateAdmin;