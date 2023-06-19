import React from "react";

const Validator = ({error, inputId}) => {
    let message = [];
    if(error != null){
        for(let err of error){
            for(let member of err.members){
                if(inputId === member.toLowerCase())
                    message.push(err.message);
            }
        }
    }
    return message.map((msg) => {
        return <p className="error">{msg}</p>
    })
}

export default Validator;