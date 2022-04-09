import React, { useEffect } from "react";
import { BrowserRouter as Router, Link, Routes, Route, Navigate } from "react-router-dom";
import { dataURL } from "../src/config";
import Associate from "./container/Associate";
import ManageAssociate from "./container/ManageAssociate";
import Specialization from "./container/Specialization";

function App(props) {
  const { baseURL, projectName } = dataURL ? dataURL : "";

  
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div >
            <Link className="brand" to={`/${projectName}/associate`}>
              AMS
            </Link>
          </div>
          <div
            style={{ display: "flex", flexWrap: "wrap", position:'absolute', left:'85%' }}
          >
              <div>
              <Link to={`/${projectName}/specialization`}>Specialization</Link>
            </div>
            <div>
              <Link to={`/${projectName}/associate`}>Associate</Link>
            </div>
          </div>
        </header>
        <main>
          <Routes>
          <Route
              path={`/${projectName}/specialization`}
              element={<Specialization />}
            ></Route>
            <Route
              path={`/${projectName}/associate`}
              element={<Associate />}
            ></Route>
             <Route
              path={`/${projectName}/associate/add`}
              element={<ManageAssociate />}
            ></Route>
             <Route
              path={`/${projectName}/associate/edit/:id`}
              element={<ManageAssociate />}
            ></Route>
            <Route
              exact
              path="/"
              element={<Navigate to={`/${projectName}/associate`} />}
            />
          </Routes>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;