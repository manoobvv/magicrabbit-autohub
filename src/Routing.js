import React, { Component } from "react";
import {
  Route,
  BrowserRouter,
  Routes,
} from "react-router-dom";
import VehicleDetailsForm from './component/VehicleDetailsForm'
import MRAppBar from './component/MRAppBar'

class Routing extends Component {
    render() {
      return (
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<MRAppBar/>}  />
          <Route path="/onboard" element={<VehicleDetailsForm/>}  />                 
        </Routes>
        </BrowserRouter>
      )}}
export default Routing;