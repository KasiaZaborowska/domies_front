import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddOfferForm from './AddOffer';
import { readOfferInterface, userAccountInterface } from '../../Interfaces';
import { useGetOffersQuery } from '../../Apis/offerApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Store/Redux/store';
import './Offers.css';
import MyOfferCard from './MyOfferCard';

function Offers() {
    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    console.log(userData.Email);
    const loggedInUserEmail = userData.Email;

    const { data, isLoading } = useGetOffersQuery(null);
    const [filteredOffers, setFilteredOffers] = useState<readOfferInterface[]>(
        [],
    );

    useEffect(() => {
        if (!isLoading && data) {
            const filtered = data.result.filter(
                (offer: readOfferInterface) => offer.host === loggedInUserEmail,
            );
            console.log(filtered);

            if (filtered.length > 0) {
                setFilteredOffers(filtered);
            } else {
                console.log('Brak ofert dla tego użytkownika.');
            }
            // dispatch(setOffers(data.result));
        }
    }, [isLoading, data]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <Modal
                    show={show}
                    onHide={handleClose}
                    dialogClassName="modal-dialog"
                    size="lg"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Dodaj nową ofertę:</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddOfferForm />
                    </Modal.Body>
                </Modal>
            </div>

            <div className="">
                {isLoading ? (
                    <p>Loading...</p>
                ) : filteredOffers?.length > 0 ? (
                    <>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <div className="container row">
                                <div className="d-flex justify-content-end pt-4">
                                    <Button
                                        variant="primary"
                                        onClick={handleShow}
                                        style={{
                                            backgroundColor: 'pink',
                                            borderColor: 'pink',
                                            borderRadius: '50px',
                                            padding: '10px',
                                            display: 'inline-block',
                                        }}
                                    >
                                        Dodaj swoją ofertę!
                                    </Button>
                                </div>
                                {filteredOffers.map(
                                    (
                                        offer: readOfferInterface,
                                        index: number,
                                    ) => (
                                        <MyOfferCard
                                            offer={offer}
                                            key={index}
                                        />
                                    ),
                                )}
                            </div>
                        </div>
                    </>
                ) : (
                    <p>Brak ofert.</p>
                )}
            </div>
        </div>
    );
}

export default Offers;
