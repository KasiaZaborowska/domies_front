import React from 'react';
import { offerInterface } from '../../Interfaces';
import { Link } from 'react-router-dom';

interface Props {
    offer: offerInterface;
}

function OfferCard(props: Props) {
    return (
        <div className="col-md-4 col-10 p-4">
            <div
                className="card"
                style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}
            >
                <div className="card-body pt-2">
                    <div className="row col-10 offset-1 p-4">
                        <Link to={`/offerDetails/${props.offer.id}`}>
                            <img
                                src={props.offer.photo}
                                style={{ borderRadius: '50%' }}
                                alt=""
                                className="w-100 mt-5 image-box"
                            />
                        </Link>
                    </div>

                    <i
                        className="bi bi-star btn btn-success"
                        style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            padding: '5px 10px',
                            borderRadius: '3px',
                            outline: 'none !important',
                            cursor: 'pointer',
                        }}
                    >
                        &nbsp; jakies oceny
                    </i>

                    <i
                        className="bi bi-cart-plus btn btn-outline-danger"
                        style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            padding: '5px 10px',
                            borderRadius: '3px',
                            outline: 'none !important',
                            cursor: 'pointer',
                        }}
                    ></i>

                    <div className="text-center">
                        <Link to={`/offerDetails/${props.offer.id}`}>
                            <p className="card-title m-0 text-success fs-3">
                                {props.offer.title}
                            </p>
                        </Link>
                        <p
                            className="badge bg-secondary"
                            style={{ fontSize: '12px' }}
                        >
                            typy piesków
                        </p>
                    </div>
                    <p
                        className="card-text"
                        style={{ textAlign: 'center' }}
                    ></p>
                    <div className="row text-center">
                        <p>miejsce na cos tam</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferCard;
