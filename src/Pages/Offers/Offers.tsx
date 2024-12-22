import React, { useEffect, useState } from 'react';
import OfferCard from './OfferCard';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddOffer from './AddOffer';
import { offerInterface, userAccountInterface } from '../../Interfaces';
import { useGetOffersQuery } from '../../Apis/offerApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Redux/store';

function Offers() {
    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    console.log(userData.Email);
    const loggedInUserEmail = userData.Email;

    const { data, isLoading } = useGetOffersQuery(null);
    const [filteredOffers, setFilteredOffers] = useState<offerInterface[]>([]);
    console.log(data);

    useEffect(() => {
        if (!isLoading && data) {
            const filtered = data.result.filter(
                (offer: offerInterface) => offer.host === loggedInUserEmail,
            );
            console.log(filtered);

            if (filtered.length > 0) {
                setFilteredOffers(filtered);
            } else {
                console.log('Brak ofert dla tego użytkownika.');
            }
            // dispatch(setOffers(data.result));
        }
    }, [isLoading, loggedInUserEmail, data, dispatch]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }

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
                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredOffers?.length > 0 ? (
                    <ul>
                        {filteredOffers.map(
                            (offer: offerInterface, index: number) => (
                                <OfferCard offer={offer} key={index} />
                            ),
                        )}
                    </ul>
                ) : (
                    <p>Brak ofert.</p>
                )}
            </div>
        </div>
    );
}

export default Offers;
