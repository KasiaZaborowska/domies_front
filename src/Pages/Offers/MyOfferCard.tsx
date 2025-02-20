import React, { useState } from 'react';
import { offerByIdInterface, readOfferInterface } from '../../Interfaces';
import { Link } from 'react-router-dom';
import { useDeleteOfferMutation } from '../../Apis/offerApi';
import { Form, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import GradeIcon from '@mui/icons-material/Grade';
interface Props {
    offer: readOfferInterface;
}

function MyOfferCard(props: Props) {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteOffer, isLoadingDelete] = useDeleteOfferMutation();

    const handleDelete = async (id: number) => {
        console.log('ID: ', id);
        if (id !== null && id !== undefined) {
            try {
                console.log(`Usuwam ofertę o ID: ${id}`);
                await deleteOffer(id);
                setShowDeleteModal(false);
            } catch (error) {
                console.error('Błąd podczas usuwania:', error);
            }
        } else {
            console.error('Brak ID do usunięcia.');
        }
    };

    const getAverageRating = (offer: offerByIdInterface) => {
        if (!offer.applications || offer.applications.length === 0)
            return 'Brak ocen';

        const allRatings = offer.applications.flatMap((app) =>
            (app.opinions ?? []).map((o) => o.rating ?? 0),
        );
        console.log('allRatings');
        console.log(allRatings);

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
            <div
                className="card"
                style={{ boxShadow: '0 1px 7px 0 rgb(0 0 0 / 50%)' }}
            >
                <div className="card-body pt-2">
                    <div className=" d-flex p-2 justify-content-center">
                        <Link to={`/myOfferDetails/${props.offer.id}`}>
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
                        // className="bi bi-star btn"
                        style={{
                            position: 'absolute',
                            top: '15px',
                            left: '15px',
                            padding: '5px 10px',
                            borderRadius: '3px',
                            outline: 'none !important',
                            cursor: 'pointer',
                            backgroundColor: '#f1dede',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <GradeIcon
                            fontSize="medium"
                            style={{
                                alignContent: 'center',
                                marginBottom: '5px',
                                marginRight: '5px',
                                color: 'black',
                            }}
                        />
                        {getAverageRating(props.offer)}
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
                        onClick={() => setShowDeleteModal(true)}
                    ></i>

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
                            {props.offer.offerAnimalTypes}
                        </p>
                    </div>

                    <div className="row text-center">
                        <p>{props.offer.city}</p>
                    </div>
                </div>
            </div>

            <Modal
                show={showDeleteModal}
                onHide={() => setShowDeleteModal(false)}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Czy napewno chcesz usunąć tą ofertę? Nie da się tego cofnąć.
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => setShowDeleteModal(false)}
                    >
                        Zamknij
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDelete(Number(props.offer.id))}
                    >
                        {isLoadingDelete ? 'Usuń' : 'Usuwanie...'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyOfferCard;
