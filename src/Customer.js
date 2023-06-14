import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CustomerContext } from "./contexts/CustomerContext";
import { Modal, Button } from "react-bootstrap";

const Customer = ({customer, index}) => {
    const {DeleteCustomer} = useContext(CustomerContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const HandleDelete = (e) => {
        e.preventDefault();
        DeleteCustomer(customer.id);
    }

    return(
        <>
        <tr scope="row">
            <th>{index}</th>
            <td>{customer.isim + " " + customer.soyisim}</td>
            <td>{customer.tc}</td>
            <td>{customer.iletisim.map((iletisim) => {
                return <p>{iletisim.email}</p>
            })}
            </td>
            <td>{customer.iletisim.map((iletisim) => {
                return iletisim.telefon.map((telefon) => {
                    return <p>{`${telefon.turAciklamasi}: ${telefon.numara}`}</p>
                })
            })}
            </td>
            <td>{customer.adres.map((adres) => {
                return <p>{`${adres.turAciklamasi}: ${adres.aciklama}`}</p>
            })}
            </td>
            <td>{customer.odeme.map((odeme) => {
                return <p>{odeme.turAciklamasi}</p>
            })}
            </td>
            <td className="actions-panel">
                <button className="btn" onClick={handleShow}><FontAwesomeIcon icon={faPenToSquare}/></button>
                <button className="btn" onClick={HandleDelete}><FontAwesomeIcon icon={faTrash}/></button>
            </td>
        </tr>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>    
        </>
    )
}

export default Customer;