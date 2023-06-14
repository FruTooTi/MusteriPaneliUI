import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css"
import CustomerContextProvider from "./contexts/CustomerContext";
import CategoryContextProvider from "./contexts/CategoryContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <CategoryContextProvider>
        <CustomerContextProvider>
            <App/>
        </CustomerContextProvider>
    </CategoryContextProvider>
    </BrowserRouter>
)