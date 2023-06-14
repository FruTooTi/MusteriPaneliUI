import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Stats from "./Stats";
import CustomerTable from "./CustomerTable";
import AddCustomers from "./AddCustomers";

const App = () => {
    return(
        <>
            <Navbar/>
            <Routes>
                <Route 
                    path="/"
                    element={<Stats/>}
                />
                <Route 
                    path="/table"
                    element={<CustomerTable/>}
                />
                <Route 
                    path="/addcustomers"
                    element={<AddCustomers/>}
                />
            </Routes>
        </>
    )
}

export default App;