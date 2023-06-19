import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { CustomerContext } from "./contexts/CustomerContext";
import { Modal, Button } from "react-bootstrap";
import EditCustomers from "./EditCustomers";

const Customer = ({data, index}) => {
    const {DeleteCustomer} = useContext(CustomerContext);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const HandleDelete = (e) => {
        e.preventDefault();
        DeleteCustomer(data.id);
    }

    return(
        <>
        <tr scope="row">
            <th>{index}</th>
            <td>{data.isim + " " + data.soyisim}</td>
            <td>{data.tc}</td>
            <td>{data.iletisim.map((iletisim) => {
                return <p>{iletisim.email}</p>
            })}
            </td>
            <td>{data.iletisim.map((iletisim) => {
                return iletisim.telefon.map((telefon) => {
                    return <p>{`${telefon.turAciklamasi}: ${telefon.numara}`}</p>
                })
            })}
            </td>
            <td>{data.adres.map((adres) => {
                return <p>{`${adres.turAciklamasi}: ${adres.aciklama}`}</p>
            })}
            </td>
            <td>{data.odeme.map((odeme) => {
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
            <Modal.Body>
                <EditCustomers customerData={data} handleClose={handleClose}/>
            </Modal.Body>
        </Modal>    
        </>
    )
}

export default Customer;