import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


export default function Associate() {
  
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    axios
      .get("http://localhost:5000/api/associate/list/get")
      .then((res) =>{
        debugger
        setList(res.data)})
      .catch((err) => {
        console.error(err);
      }); // promise
  };
  const handleAddAssociate = () => {
  };

  const handleDelete=(data)=>{
    axios
    .post("http://localhost:5000/api/associate/list/delete", {
      body: data, // The data
      headers: {
        "Content-type": "application/json", // The type of data you're sending
      },
    })
    .then((res) =>{
      loadList()
     })
    .catch((err) => {
      console.error(err);
    }); // promise
    
  }

  const handleSearch=(e)=>{
let value=e.target.value.toLowerCase();
let newList=list.filter((data)=>{

if(data.associateName.toLowerCase().includes(value)){
return data
}  

})
if(value==""){
  loadList()
}
setList(newList)

  }


  return (
    <div class="container-fluid">
     
      <div class="card">
        <div className="card-header">
          <div className="row">
          <div className="col-md-4">
            <b>Associate</b>
          </div>
          <div className="col-md-4">
          <div>
          <input type="text" placeholder="Search Associate" className="search" onChange={(e)=>handleSearch(e)}/>
          </div>
          </div>
          <div className="col-md-4">
          <NavLink to={'/AMS/associate/add'}>
              <button
                type="button"
                onClick={handleAddAssociate}
                className="btn btn-primary"
              >
                Add Associate
              </button>
            </NavLink>
          </div>
          </div>
         
        </div>
        <div class="card-body">
        <table class="table table-striped " id="associate">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Associate Name</th>
                <th scope="col">Phone</th>
                <th scope="col">Address</th>
                <th scope="col">Specialization</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {list !== null &&
                list.length > 0 &&
                list.map((data, index) => {
                  return (
                    <tr scope="row">
                      <td>{index + 1}</td>
                      <td>{data.associateName}</td>
                      <td>{data.phone}</td>
                      <td>{data.address}</td>
                      <td>{data.specializationId}</td>
                      <td><Link to={`/AMS/associate/edit/:id`.replace(':id',data.associateId)}><i class="fa fa-edit" aria-hidden="true"></i></Link></td>
                      <td><i class="fa fa-trash" aria-hidden="true" onClick={()=>handleDelete(data)}></i></td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}