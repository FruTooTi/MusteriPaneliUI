import React, { createContext, useEffect, useState } from "react";

const CategoryContext = createContext();

const CategoryContextProvider = (props) => {

    const [paymentType, setPaymentType] = useState([]);
    const [addressType, setAddressType] = useState([]);
    const [phoneType, setPhoneType] = useState([]);

    useEffect(() => {
        async function fetchData(){
            const paymentType = await fetch("https://localhost:44378/api/Tur/odeme").then(response => response.json());
            const addressType = await fetch("https://localhost:44378/api/Tur/adres").then(response => response.json());
            const phoneType = await fetch("https://localhost:44378/api/Tur/telefon").then(response => response.json());
            setPaymentType(paymentType);
            setAddressType(addressType);
            setPhoneType(phoneType);
        }
        fetchData();
    }, [])
    return(
        <CategoryContext.Provider value={{paymentType, addressType, phoneType}}>
            {props.children}
        </CategoryContext.Provider>
    )
}

export { CategoryContext };
export default CategoryContextProvider;