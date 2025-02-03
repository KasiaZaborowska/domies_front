import React, { useState } from 'react';
import { readOfferInterface } from '../../../Interfaces';
import { Link } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface Props {
    offer: readOfferInterface;
}

function OfferCardMainPage(props: Props) {
    return (
        <div className="col-md-4 col-10 p-3">
            <div
                className="card"
                style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}
            >
                <div className="card-body pt-2">
                    <div className=" d-flex p-2 justify-content-center">
                        <Link to={`/offerDetails/${props.offer.id}`}>
                            <img
                                src={props.offer.photo}
                                style={{
                                    width: '250px', // Określona szerokość
                                    height: '200px',
                                    borderRadius: '5%',
                                    objectFit: 'cover',
                                }}
                                alt=""
                                //className="w-100 mt-5 image-box"
                                className=" mt-5 "
                            />
                        </Link>
                    </div>

                    <i
                        className="bi bi-star btn"
                        style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            padding: '5px 10px',
                            borderRadius: '3px',
                            outline: 'none !important',
                            cursor: 'pointer',
                            backgroundColor: '#f1dede',
                        }}
                    >
                        &nbsp; oceny
                    </i>

                    <div className="text-center">
                        <Link
                            to={`/offerDetails/${props.offer.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <p
                                className="card-title m-0 fs-3"
                                style={{ color: '#5e503f' }}
                            >
                                {props.offer.name}
                            </p>
                        </Link>
                        <p
                            className="badge"
                            style={{
                                fontSize: '12px',
                                marginTop: '10px',
                                backgroundColor: '#ab947e',
                            }}
                        >
                            {props.offer.offerAnimalTypes.join(', ')}
                        </p>
                    </div>

                    <div className="row text-center">
                        <p>{props.offer.city}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferCardMainPage;
