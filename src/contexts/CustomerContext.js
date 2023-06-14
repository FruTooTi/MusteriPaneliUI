import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const NavigatePage = useNavigate();
  const [Customers, setCustomers] = useState([]);
  const [Refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData(){
      const customersList = await fetch("https://localhost:44378/api/Musteri").then(response => response.json());
      setCustomers(customersList);
    }
    fetchData();
  }, [Refresh]);

  const AddCustomer = async (data) => {
    const response = await fetch("https://localhost:44378/api/Musteri", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    setRefresh(true);
    NavigatePage("/table");
  }

  const DeleteCustomer = async (id) => {
    const response = await fetch(`https://localhost:44378/api/Musteri/${id}`, {
      method: "DELETE"
    });
    setCustomers(Customers.filter((customer) => customer.id !== id));
  }

    return(
        <CustomerContext.Provider value={{Customers, AddCustomer, DeleteCustomer}}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export { CustomerContext };
export default CustomerContextProvider;