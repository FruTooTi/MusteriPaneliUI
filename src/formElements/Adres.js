import React from "react";
import {Form} from "react-bootstrap";

const Adres = (props) => {

    return(
        <Form.Group className="mb-3" controlId={`adres${props.index}`}>
            <Form.Label>Adres</Form.Label>
            <Form.Control type="text" placeholder="Adres*"/>
        </Form.Group>
    )
}

export default Adres;