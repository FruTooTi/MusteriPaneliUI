import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerContext = createContext();

const CustomerContextProvider = (props) => {
  const NavigatePage = useNavigate();
  const [Customers, setCustomers] = useState([]);
  const [Refresh, setRefresh] = useState({});

  useEffect(() => {
    async function fetchData(){
      const customersList = await fetch("https://localhost:44378/api/Musteri").then(response => response.json());
      setCustomers(customersList);
    }
    fetchData();
  }, [Refresh]);

  const AddCustomer = async (data, callback) => {
    await fetch("https://localhost:44378/api/Musteri", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if(response.status !== 200)
        response.json().then((data) => {
          callback(data.error.validationErrors);
      })
      else{
        setRefresh({});
        NavigatePage("/table");
      }
    });
  }

  const DeleteCustomer = async (id) => {
    const response = await fetch(`https://localhost:44378/api/Musteri/${id}`, {
      method: "DELETE"
    });
    setCustomers(Customers.filter((customer) => customer.id !== id));
  }

  const UpdateCustomer = async (data, callback) => {
    await fetch(`https://localhost:44378/api/Musteri/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if(response.status !== 200)
        response.json().then((data) => {
          callback.setErrors(data.error.validationErrors);
        })
      else{
        callback.handleClose();
        setRefresh({});
        NavigatePage("/table");
      }
    });
  }

    return(
        <CustomerContext.Provider value={{Customers, AddCustomer, DeleteCustomer, UpdateCustomer}}>
            {props.children}
        </CustomerContext.Provider>
    )
}

export { CustomerContext };
export default CustomerContextProvider;