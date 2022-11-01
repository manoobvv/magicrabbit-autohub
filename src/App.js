
import './App.css';

import Routing from './Routing'
import MRAppBar from './component/MRAppBar'
import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <MRAppBar/>
       </BrowserRouter>
       
      {/*<div>
         <VehicleDetailsForm/>
      </div>   */}
      {/* <Routing /> */}
    </div>
  );
}

export default App;
