import React from "react";
import { Button } from "react-bootstrap";

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="logo navButton">
                <a href="/">Logo</a>
            </div>
            <div className="navButtons">
                <div className="navButton">
                    <a href="/">Home</a>
                </div>
                <div className="navButton">
                    <a href="/table">Customers</a>
                </div>
                <div className="navButton">
                    <a href="/addcustomers">Add</a>
                </div>
            </div>
        </div>
    )
}

export default Navbar;