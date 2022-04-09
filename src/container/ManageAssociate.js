import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation,
  useParams,
} from "react-router-dom";
export default function ManageAssociate(props) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [associateName, setAssociateName] = useState("");
  const [specialization, setSpecialization] = useState([]);
  const [list, setList] = useState([]);
  const [associateId, setAssociateId] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    associateById(id);
    loadList();
  }, [id]);

  const associateById = (associateId) => {
    axios
      .get(
        `http://localhost:5000/api/associate/findById?associateId=${associateId}`,
        {}
      )
      .then((res) => {
        setPhone(res.data.phone);
        setAddress(res.data.address);
        setAssociateName(res.data.associateName);
        setSpecialization(res.data.specializationId);
        setAssociateId(res.data.associateId);
      })
      .catch((err) => {
        console.error(err);
      }); // promise
  };

  const loadList = () => {
    axios
      .get("http://localhost:5000/api/specialization/list/get")
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      }); // promise
  };

  const submitHandler = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks

    if (id) {
      let model = {
        associateId: associateId,
        phone: phone,
        address: address,
        associateName: associateName,
        specializationId: specialization.toString(),
      };
      axios
        .put("http://localhost:5000/api/associate/list/update", {
          body: model, // The data
          headers: {
            "Content-type": "application/json", // The type of data you're sending
          },
        })
        .then((res) => {
            navigate('/AMS/associate');
        })
        .catch((err) => {
          console.error(err);
        }); // promise
    } else {
      let model = {
        phone: phone,
        address: address,
        associateName: associateName,
        specializationId: specialization.toString(),
      };
      axios
        .post("http://localhost:5000/api/associate/list/add", {
          body: model, // The data
          headers: {
            "Content-type": "application/json", // The type of data you're sending
          },
        })
        .then((res) => {
            navigate('/AMS/associate');

        })
        .catch((err) => {
          console.error(err);
        }); // promise
    }
  };

  const handleChange = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSpecialization(value);
  };

  console.log(specialization, "specialization");
  return (
    <div class="container-fluid">
      <div class="card">
        <div className="card-header">
          {" "}
          <b>Associate</b>
        </div>
        <div class="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label for="name">Associate Name</label>
                <input
                  type={"text"}
                  className="form-control"
                  id="name"
                  value={associateName}
                  placeholder="Associate Name"
                  onChange={(e) => setAssociateName(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label for="phone">Phone</label>
                <input
                  type={"text"}
                  className="form-control"
                  id="phone"
                  placeholder="Phone"
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label for="address">Address</label>
                <input
                  type={"text"}
                  className="form-control"
                  id="address"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
            </div>
            <div className="form-group">
              <label for="specialization">Select Specialization</label>
              <select
                className="form-control"
                value={specialization}
                id="specialization"
                onChange={(e) => handleChange(e)}
                multiple="multiple"
              >
                {list !== undefined &&
                  list.length > 0 &&
                  list.map((data, index) => {
                    return (
                      <option
                        key={data.specializationId}
                        value={data.specializationName}
                      >
                        {data.specializationName}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>

          <div>
            <button
              type="button"
              onClick={submitHandler}
              className="btn btn-primary"
            >
              {id ? "Update Associate" : "Add associate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
