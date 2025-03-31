import React, { useState } from 'react';
import { offerByIdInterface, readOfferInterface } from '../../Interfaces';
import { Link } from 'react-router-dom';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

interface Props {
    offer: offerByIdInterface;
}

function OfferCardMainPage(props: Props) {
    const getAverageRating = (offer: offerByIdInterface) => {
        if (!offer.applications || offer.applications.length === 0)
            return 'Brak ocen';

        const allRatings = offer.applications.flatMap((app) =>
            (app.opinions ?? []).map((o) => o.rating ?? 0),
        );

        if (allRatings.length === 0) return 'Brak ocen';

        const totalRatings = allRatings.reduce(
            (sum: number, rating) => sum + rating,
            0,
        );
        const avg = totalRatings / allRatings.length;

        return avg.toFixed(1);
    };

    return (
        <div className="col-md-4 col-10 p-3">
            <Link
                to={`/offerDetails/${props.offer.id}`}
                style={{ textDecoration: 'none' }}
            >
                <div
                    className="card"
                    style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}
                >
                    <div className="card-body pt-2">
                        <div className=" d-flex p-2 justify-content-center">
                            <img
                                src={props.offer.photo}
                                className="w-100 mt-5 image-box"
                                style={{
                                    maxWidth: '100%',
                                    width: '250px',
                                    height: '200px',
                                    borderRadius: '5%',
                                    objectFit: 'cover',
                                }}
                                alt=""
                            />
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
                            &nbsp; {getAverageRating(props.offer)}
                        </i>

                        <div className="text-center">
                            <p
                                className="card-title m-0 fs-3"
                                style={{ color: '#5e503f' }}
                            >
                                {props.offer.name}
                            </p>
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
            </Link>
        </div>
    );
}

export default OfferCardMainPage;
