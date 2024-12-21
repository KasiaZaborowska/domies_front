import React, { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddOffer from './AddOffer';
import { offerInterface } from '../../Interfaces';
import { useGetOffersQuery } from '../../Apis/offerApi';
import { useDispatch } from 'react-redux';
import { setOffers } from '../../Store/Redux/offerSlice';

function Offers() {
    //const [offers, setOffers] = useState<offerInterface[]>([]);
    const { data, isLoading } = useGetOffersQuery(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isLoading) {
            dispatch(setOffers(data.result));
        }
    }, [isLoading]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(data.result);
    return (
        <div className="container">
            <div>
                <div className="d-flex justify-content-end pt-4">
                    <Button
                        variant="primary"
                        onClick={handleShow}
                        style={{
                            backgroundColor: 'pink',
                            borderColor: 'pink',
                            borderRadius: '50px',
                            padding: '10px',
                        }}
                    >
                        Dodaj swoją ofertę!
                    </Button>
                </div>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Dodaj nową ofertę:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddOffer />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Zamknij
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Dodaj ofertę
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

            <div className="container row">
                {data.result.length > 0 &&
                    data.result.map((offer: offerInterface, index: number) => (
                        <OfferCard offer={offer} key={index} />
                    ))}
            </div>
        </div>
    );
}

export default Offers;
