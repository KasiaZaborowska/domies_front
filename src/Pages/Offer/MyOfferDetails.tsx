import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../Apis/offerApi';
import MainLoader from '../../Components/MainLoader';
import { Modal } from 'react-bootstrap';
import EditOfferForm from '../Offers/EditOffer';

function MyOfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    console.log(offerId);
    const { data, isLoading } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return (
            <div
                className="d-flex justify-content-center"
                style={{ width: '100%' }}
            >
                <MainLoader />
            </div>
        );
    }

    console.log(data);

    return (
        <div className="container">
            <div className="">
                <div className="p-4" style={{ background: '#edede9' }}>
                    <div className="">
                        <div className="d-flex p-2 justify-content-center">
                            <img
                                src={data.result.photo}
                                //width="100%"
                                style={{
                                    borderRadius: '10%',
                                    maxHeight: '60vh',
                                    minWidth: '40vw',

                                    objectFit: 'cover',
                                }}
                                className="col-10"
                                alt="No content"
                            ></img>
                        </div>
                    </div>
                    <h2
                        className="pt-4 pb-3"
                        style={{
                            color: 'black',
                        }}
                    >
                        {data.result.name}
                    </h2>
                    <span>
                        <span
                            className="badge pt-2"
                            style={{
                                height: '40px',
                                fontSize: '20px',
                                backgroundColor: '#5e503f',
                            }}
                        >
                            Typy akceptowanych zwierząt:
                        </span>
                    </span>
                    <span>
                        <span
                            className="badge pt-2"
                            style={{
                                height: '40px',
                                fontSize: '20px',
                                color: '#5e503f',
                            }}
                        >
                            {data.result.offerAnimalTypes}
                        </span>
                    </span>
                    <p style={{ fontSize: '20px' }} className="py-3">
                        {data.result.description}
                    </p>
                    <hr />
                    <span className="h3">
                        Koszt usługi: {data.result.price}zł
                    </span>
                    <hr />
                    <div className="row pt-4">
                        <span style={{ fontSize: '20px' }} className="pt-2">
                            Adres:
                        </span>
                        <span style={{ fontSize: '20px' }} className="pb-4">
                            {data.result.country}, {data.result.city},
                            {data.result.street}, {data.result.postalCode}
                        </span>
                        <div
                            className="py-3"
                            style={{
                                border: '1px solid lightgrey',
                                borderRadius: '12px',
                            }}
                        >
                            <span style={{ fontSize: '20px' }} className="pt-2">
                                Twój opiekun to: {data.result.name}
                                <br />
                                Kontakt:
                                <br />
                                {data.result.host}
                            </span>
                        </div>
                    </div>
                    <div className="row pt-4 px-5 d-flex justify-content-between">
                        <div className="col-5">
                            <button
                                onClick={handleShow}
                                className="btn form-control"
                                style={{
                                    height: '40px',
                                    padding: '1px',
                                    fontSize: '20px',
                                    backgroundColor: '#5e503f',
                                    color: 'white',
                                }}
                            >
                                Edytuj
                            </button>
                        </div>

                        <div className="col-5 ">
                            <button
                                className="btn btn-secondary form-control"
                                onClick={() => navigate(-1)}
                                style={{
                                    height: '40px',
                                    padding: '1px',
                                    fontSize: '20px',
                                    backgroundColor: '#e9e6e2',
                                    color: '#2b2628',
                                }}
                            >
                                Powrót
                            </button>
                        </div>

                        <div>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                dialogClassName="modal-dialog"
                                size="lg"
                                centered
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Edytuj ofertę:</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <EditOfferForm />
                                </Modal.Body>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyOfferDetails;
