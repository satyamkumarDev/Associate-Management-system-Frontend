import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Specialization() {
  const [Specialization, setSpecialization] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    loadList();
  }, []);

  const loadList = () => {
    axios
      .get("http://localhost:5000/api/specialization/list/get")
      .then((res) =>{
        setList(res.data)})
      .catch((err) => {
        console.error(err);
      }); // promise
  };

  const addSpecialization = () => {
    axios
      .post("http://localhost:5000/api/specialization/list/add", {
        body: Specialization, // The data
        headers: {
          "Content-type": "application/json", // The type of data you're sending
        },
      })
      .then((res) =>{
        loadList()})
      .catch((err) => {
        console.error(err);
      }); // promise
      
  };

  console.log(list);
  return (
    <div class="container-fluid">
      <div class="card">
        <div className="card-header">
          {" "}
          <b>Add Specialization</b>
        </div>
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="prices">Specialization Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  id="Specialization"
                  onChange={(e) => setSpecialization(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => addSpecialization()}
                className="btn btn-primary"
              >
                Add Specialization
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <div className="card-header">
          {" "}
          <b>Specialization Type</b>
        </div>
        <div class="card-body">
          <table class="table table-striped " id="associate">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Specialization Name</th>
              </tr>
            </thead>
            <tbody>
              {list !== null &&
                list.length > 0 &&
                list.map((data, index) => {
                  return (
                    <tr scope="row">
                      <td>{index + 1}</td>
                      <td>{data.specializationName}</td>
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
