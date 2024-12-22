import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetOfferByIdQuery } from '../../Apis/offerApi';
import MainLoader from '../../Components/MainLoader';

function OfferDetails() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    console.log(offerId);
    const { data, isLoading } = useGetOfferByIdQuery({ id: offerId });
    const navigate = useNavigate();
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
        <div className="container pt-4 pt-md-5">
            <div className="">
                <div className="">
                    <div className="col-5">
                        <img
                            src="doDodania!!!!!!!!!!!!"
                            width="100%"
                            style={{ borderRadius: '50%' }}
                            alt="No content"
                        ></img>
                    </div>
                    <h2 className="text-success">{data.result.title}</h2>
                    <span>
                        <span
                            className="badge text-bg-dark pt-2"
                            style={{ height: '40px', fontSize: '20px' }}
                        >
                            typy pieskow
                        </span>
                    </span>
                    <span>
                        <span
                            className="badge text-bg-light pt-2"
                            style={{ height: '40px', fontSize: '20px' }}
                        >
                            tag / ocena
                        </span>
                    </span>
                    <p style={{ fontSize: '20px' }} className="pt-2">
                        {data.result.description}
                    </p>
                    <span className="h3">$10</span> &nbsp;&nbsp;&nbsp;
                    <span
                        className="pb-2  p-3"
                        style={{
                            border: '1px solid #333',
                            borderRadius: '30px',
                        }}
                    >
                        <i
                            className="bi bi-dash p-1"
                            style={{
                                fontSize: '25px',
                                cursor: 'pointer',
                            }}
                        ></i>
                        <span className="h3 mt-3 px-3">XX</span>
                        <i
                            className="bi bi-plus p-1"
                            style={{
                                fontSize: '25px',
                                cursor: 'pointer',
                            }}
                        ></i>
                    </span>
                    <div className="row pt-4">
                        <span style={{ fontSize: '20px' }} className="pt-2">
                            Moj adres
                        </span>
                        <span style={{ fontSize: '20px' }} className="pt-2">
                            {data.result.country}, {data.result.city},
                            {data.result.street}, {data.result.postalCode}
                        </span>
                        <span style={{ fontSize: '20px' }} className="pt-2">
                            Skontaktuj się ze mną osobiście: {data.result.host}
                        </span>
                    </div>
                    <div className="row pt-4">
                        <div className="col-5">
                            <button className="btn btn-success form-control">
                                Add to Cart
                            </button>
                        </div>

                        <div className="col-5 ">
                            <button
                                className="btn btn-secondary form-control"
                                onClick={() => navigate(-1)}
                            >
                                Powrót
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OfferDetails;
