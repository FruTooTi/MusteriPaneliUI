import React from "react";
import { useContext } from "react";
import { CustomerContext } from "./contexts/CustomerContext";
import Customer from "./Customer";

const CustomerTable = () => {
    const props = useContext(CustomerContext);

    return(
        <div className="container">
            <div className="tbl-container">
                <div className="table-responsive">
                    <table className="table table-hover table-md table-responsive">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">FullName</th>
                                <th scope="col">TC</th>
                                <th scope="col">Email</th>
                                <th scope="col">Telefon</th>
                                <th scope="col">Adres</th>
                                <th scope="col">Odeme</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.Customers.map((customer, index) => {
                                return <Customer key={index} data={customer} index={index}/>
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CustomerTable;