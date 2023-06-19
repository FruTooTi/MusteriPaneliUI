import React, { useState, useContext } from "react";
import { Form, Button, Card, Dropdown } from "react-bootstrap";
import { CategoryContext } from "./contexts/CategoryContext";
import { CustomerContext } from "./contexts/CustomerContext";
import Validator from "./Validator";

const EditCustomers = ({ customerData, handleClose }) => {
    const categories = useContext(CategoryContext);
    const { UpdateCustomer } = useContext(CustomerContext);
    console.log(customerData);

    const [customer, setCustomer] = useState(customerData);

    const [adresCount, setAdresCount] = useState(customerData.adres.length);
    const [odemeCount, setOdemeCount] = useState(customerData.odeme.length);
    const [iletisimCount, setIletisimCount] = useState(customerData.iletisim.map((iltsm) => {
        return iltsm.telefon.length;
    }));
    const [errors, setErrors] = useState(null);
    const adres = [];
    const odeme = [];
    const iletisim = [];

    for(var i = 0; i < adresCount; i++)
        adres.push(
        <>
        <div id={`adres${i}`} key={`adresContainer${i}`}>
            <Form.Group className="mb-3" key={`adresType${i}`}>
                <Form.Label>Adres Türü</Form.Label>
                <Form.Select onChange={(e) => HandleAdres(e)} index={i} defaultValue={customer.adres[i].tur}>
                    {categories.addressType.map((type, index) => {
                        return <option key={`adresOption${i}-${index}`} value={type.id}>{type.aciklama}</option>
                    })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" key={`adresDescription${i}`}>
                <Form.Label>Açıklama</Form.Label>
                <Form.Control type="text" placeholder="Adres*" index={i} value={customer.adres[i].aciklama} onChange={(e) => HandleAdres(e)}/>
                <Validator error={errors} inputId={`adres[${i}].aciklama`}/>
            </Form.Group>
        
            <div className="d-grid gap-2 mt-2" key={`adresDeleteButton${i}`}>
                <Button variant="danger" type="button" index={i} onClick={(e) => {DeleteAddress(e)}}>
                    Adresi Sil
                </Button>
            </div>
        </div>
        </>);

    for(var i = 0; i < iletisimCount.length; i++)
    {
        iletisim.push([]);
        let telefon = [];
        for(var k = 0; k < iletisimCount[i]; k++){
        telefon.push(
        <>
        <div id={`telefon${i}-${k}`} key={`telefonContainer${i}-${k}`}>
            <Form.Group className="mb-3" key={`telefonType${i}-${k}`}>
                <Form.Label>Telefon Türü</Form.Label>
                <Form.Select onChange={(e) => HandleTelefon(e)} iletisimindex={i} telefonindex={k} defaultValue={customer.iletisim[i].telefon[k].tur}>
                    {categories.phoneType.map((type, index) => {
                        return <option key={`telefonOption${i}-${index}`} value={type.id}>{type.aciklama}</option>
                    })}
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" key={`telefonDescription${i}`}>
                <Form.Label>Numara</Form.Label>
                <Form.Control type="text" placeholder="Numara*" iletisimindex={i} telefonindex={k} value={customer.iletisim[i].telefon[k].numara} onChange={(e) => HandleTelefon(e)}/>
                <Validator error={errors} inputId={`iletisim[${i}].telefon[${k}].numara`}/>
            </Form.Group>


            {k !== 0 ? <div className="d-grid gap-2 mt-2" key={`telefonDeleteButton${i}`}>
                <Button variant="danger" type="button" iletisimindex={i} telefonindex={k} onClick={(e) => {DeleteTelefon(e)}}>
                    Telefonu Sil
                </Button>
            </div> : null}

            <div className="d-grid gap-2" id="Address">
                <Button variant="success" type="button" index={i} onClick={(e) => {AppendTelefon(e)}}>
                    Telefon Ekle
                </Button>
            </div>
        </div>
        </>);
        }
        iletisim[i].push(
        <>
        <div id={`iletisim${i}`} key={`iletisimContainer${i}`}>
            <Form.Group className="mb-3" key={`email${i}`}>
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" placeholder="Email*" index={i} value={customer.iletisim[i].email} onChange={(e) => HandleIletisim(e)}/>
                <Validator error={errors} inputId={`iletisim[${i}].email`}/>
            </Form.Group>

            {telefon}

            <div className="d-grid gap-2 mt-2" key={`iletisimDeleteButton${i}`}>
                <Button variant="danger" type="button" index={i} onClick={(e) => {DeleteIletisim(e)}}>
                    İletişimi Sil
                </Button>
            </div>
        </div>
        </>);
        iletisim[i].push(telefon);
    }

    for(let i = 0; i < odemeCount; i++)
        odeme.push(
            <>
            <div id={`odeme${i}`} key={`odemeContainer${i}`}>
                <Form.Group className="mb-3" key={`odemeType${i}`}>
                    <Form.Label>Ödeme Türü</Form.Label>
                    <Form.Select onChange={(e) => HandleOdeme(e)} index={i} defaultValue={customer.odeme[i].odemeId}>
                        {categories.paymentType.map((type, index) => {
                            return <option key={`odemeOption${i}-${index}`} value={type.id}>{type.aciklama}</option>
                        })}
                    </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2 mt-2" key={`odemeDeleteButton${i}`}>
                <Button variant="danger" type="button" index={i} onClick={(e) => {DeleteOdeme(e)}}>
                    Ödeme Türünü Sil
                </Button>
                </div>
            </div>
            </>
        )

    const AppendIletisim = () => {
        let updatedIletisim = [...customer.iletisim];
        updatedIletisim.push(
            {
                email: "",
                telefon: [
                    {
                        tur: categories.phoneType[0].id,
                        numara: ""
                    }
                ]
            }
        )
        setCustomer({...customer, iletisim: updatedIletisim});
        setIletisimCount([...iletisimCount, 1]);
    }
    
    const AppendTelefon = (e) => {
        let targetIndex = e.target.getAttribute("index");
        let updatedIletisim = [...customer.iletisim];
        let targetIletisim = {...updatedIletisim[targetIndex]};
        let telefon = [...targetIletisim.telefon];
        console.log(telefon);
        telefon.push(
            {
                tur: categories.phoneType[0].id,
                numara: ""
            }
        );
        targetIletisim.telefon = telefon;
        updatedIletisim[targetIndex] = targetIletisim;
        setCustomer({...customer, iletisim: updatedIletisim});

        let iletisimCnt = [...iletisimCount];
        iletisimCnt[targetIndex]++;
        setIletisimCount(iletisimCnt);
    }

    const AppendAddress = () => {
        let updatedAdres = [...customer.adres];
        updatedAdres.push(
            {
                tur: categories.addressType[0].id,
                aciklama: ""
            });
        setCustomer({...customer, adres: updatedAdres});
        setAdresCount(adresCount + 1);
        console.log(customer);
    }

    const AppendOdeme = () => {
        let updatedOdeme = [...customer.odeme];
        updatedOdeme.push({ odemeId: categories.paymentType[0].id });
        setCustomer({...customer, odeme: updatedOdeme});
        setOdemeCount(odemeCount + 1);
        console.log(customer);
    }

    const DeleteIletisim = (e) => {
        let targetIndex = parseInt(e.target.getAttribute("index"));
        let updatedIletisim = [...customer.iletisim];
        updatedIletisim.splice(targetIndex, 1);
        setCustomer({...customer, iletisim: updatedIletisim});
        iletisim.splice(targetIndex, 1);
        let arr = iletisimCount.filter((elem, index) => index !== targetIndex);
        setIletisimCount(arr);
    }

    const DeleteTelefon = (e) => {
        let telefonindex = e.target.getAttribute("telefonindex");
        let iletisimIndex = e.target.getAttribute("iletisimindex");
        let updatedIletisim = [...customer.iletisim];
        updatedIletisim[iletisimIndex].telefon.splice(telefonindex, 1);
        setCustomer({...customer, iletisim: updatedIletisim});
        iletisim[iletisimIndex][1].splice(telefonindex, 1);
        let updatedIletisimCount = [...iletisimCount];
        updatedIletisimCount[iletisimIndex]--;
        setIletisimCount(updatedIletisimCount);
    }

    const DeleteAddress = (e) => {
        let targetIndex = parseInt(e.target.getAttribute("index"));
        let updatedAdres = [...customer.adres];
        updatedAdres.splice(targetIndex, 1);
        setCustomer({...customer, adres: updatedAdres});
        adres.splice(targetIndex, 1);
        setAdresCount(adresCount - 1);
    }

    const DeleteOdeme = (e) => {
        let targetIndex = parseInt(e.target.getAttribute("index"));
        let updatedOdeme = [...customer.odeme];
        updatedOdeme.splice(targetIndex, 1);
        setCustomer({...customer, odeme: updatedOdeme});
        odeme.splice(targetIndex, 1);
        setOdemeCount(odemeCount - 1);
    }

    const HandleIletisim = (e) => {
        let iletisim = [...customer.iletisim];
        let item = {...iletisim[e.target.getAttribute("index")]};
        item.email = e.target.value;
        iletisim[e.target.getAttribute("index")] = item;
        setCustomer({...customer, iletisim: iletisim});
    }

    const HandleTelefon = (e) => {
        let iletisimIndex = e.target.getAttribute("iletisimindex");
        let telefonindex = e.target.getAttribute("telefonindex");
        let iletisim = [...customer.iletisim];
        let item = {...iletisim[iletisimIndex]};
        let telefon = [...item.telefon];
        let target = {...telefon[telefonindex]};
        if(e.target.type === "text")
            target.numara = e.target.value;
        else if(e.target.type === "select-one")
            target.tur = e.target.value;
        telefon[telefonindex] = target;
        item.telefon = telefon;
        iletisim[iletisimIndex] = item;
        setCustomer({...customer, iletisim: iletisim});
    }

    const HandleAdres = (e) => {
        let adres = [...customer.adres];
        let item = {...adres[e.target.getAttribute("index")]};
        if(e.target.type === "text")
            item.aciklama = e.target.value;
        else if(e.target.type === "select-one")
            item.tur = e.target.value;
        adres[e.target.getAttribute("index")] = item;
        setCustomer({...customer, adres: adres});
        console.log(customer);
    }

    const HandleOdeme = (e) => {
        let odeme = [...customer.odeme];
        let item = odeme[e.target.getAttribute("index")];
        item.odemeId = e.target.value;
        odeme[e.target.getAttribute("index")] = item;
        setCustomer({...customer, odeme: odeme});
        console.log(customer);
    }

    const HandleInput = (e) => {
        setCustomer({...customer, [e.target.id]: e.target.value});
        console.log(customer);
    }

    const HandleSubmit = async (e) => {
        console.log(customer);
        e.preventDefault();
        await UpdateCustomer(customer, {handleClose, setErrors});
    }

    return(
        <div className="container frm-container">
            <Card style={{width: '30rem'}}>
                <Card.Body>
                    <Card.Title>Müşteri Düzenle</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="isim">
                            <Form.Label>Isim</Form.Label>
                            <Form.Control type="text" placeholder="Isim*" value={customer.isim} onChange={(e) => HandleInput(e)}/>
                            <Validator error={errors} inputId="isim"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="soyisim">
                            <Form.Label>Soyisim</Form.Label>
                            <Form.Control type="text" placeholder="Soyisim*" value={customer.soyisim} onChange={(e) => HandleInput(e)}/>
                            <Validator error={errors} inputId="soyisim"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="tc">
                            <Form.Label>TC</Form.Label>
                            <Form.Control type="text" placeholder="TC*" value={customer.tc} onChange={(e) => HandleInput(e)}/>
                            <Validator error={errors} inputId="tc"/>
                        </Form.Group>

                        {iletisim.map((iletisim) => {
                            return iletisim[0];
                        })}
                        <Validator error={errors} inputId="iletisim"/>

                        <div className="d-grid gap-2" id="Address">
                            <Button variant="success" type="button" onClick={AppendIletisim}>
                                İletişim Ekle
                            </Button>
                        </div>

                        {adres}
                        <Validator error={errors} inputId="adres"/>

                        <div className="d-grid gap-2" id="Address">
                            <Button variant="success" type="button" onClick={AppendAddress}>
                                Adres Ekle
                            </Button>
                        </div>

                        {odeme}
                        <Validator error={errors} inputId="odeme"/>

                        <div className="d-grid gap-2" id="Address">
                            <Button variant="success" type="button" onClick={AppendOdeme}>
                                Ödeme Türü Ekle
                            </Button>
                        </div>

                        <div className="d-grid gap-2" id="submit">
                            <Button variant="success" type="submit" onClick={(e) => {
                                HandleSubmit(e)
                                }}>
                                Düzenle
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default EditCustomers;