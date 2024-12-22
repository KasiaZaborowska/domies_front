import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useAddOfferMutation } from '../../Apis/offerApi';
import { useSelector } from 'react-redux';
import { offerInterface, userAccountInterface } from '../../Interfaces';
import { RootState } from '../../Store/Redux/store';
import inputHelper from '../../Helper/inputHelper';

function AddOfferForm() {
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    console.log(userData.Email);

    const loggedInUserEmail = userData.Email;
    // const role = userData.Role;

    const [offferToAdd] = useAddOfferMutation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        photo: '',
        host: loggedInUserEmail,
        description: '',
        country: '',
        city: '',
        street: '',
        postalCode: '',
        // plantDisease: [], // Tablica na ID wybranych produktów
    });

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const handleAddOffer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!formData) {
            alert('Wszystkie pola są wymagane!');
            setLoading(false);
            return;
        }

        try {
            const response: offerInterface = await offferToAdd({
                data: {
                    title: formData.title,
                    photo: formData.photo,
                    host: loggedInUserEmail,
                    description: formData.description,
                    country: formData.country,
                    city: formData.city,
                    street: formData.street,
                    postalCode: formData.postalCode,
                },
            }).unwrap();
            setTimeout(() => {
                // Odświeżenie strony
                window.location.reload();
            }, 60000); // 60 000 ms = 1 minuta
            console.log(
                'Dane, które dodaje:',
                response,
                'and ',
                response.title,
            );
            setTimeout(() => {
                // Odświeżenie strony
                window.location.reload();
            }, 60000); // 60 000 ms = 1 minuta

            alert('dodane!');
            setTimeout(() => {
                // Odświeżenie strony
                window.location.reload();
            }, 60000); // 60 000 ms = 1 minuta
            // setFormData(formData);
        } catch (error) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
        }
    };

    return (
        <Form onSubmit={handleAddOffer}>
            <Form.Group className="mb-2" controlId="title">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control
                    placeholder="Wpisz tytuł"
                    name="title"
                    value={formData.title}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="photo">
                <Form.Label>Zdjęcie</Form.Label>
                <Form.Control
                    placeholder="dodaj zdjęcie"
                    name="photo"
                    value={formData.photo}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                    placeholder="opis"
                    name="description"
                    value={formData.description}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="">
                <Form.Label>country</Form.Label>
                <Form.Control
                    placeholder="opis"
                    name="country"
                    value={formData.country}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="city">
                <Form.Label>city</Form.Label>
                <Form.Control
                    placeholder="opis"
                    name="city"
                    value={formData.city}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="street">
                <Form.Label>street</Form.Label>
                <Form.Control
                    placeholder="opis"
                    name="street"
                    value={formData.street}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="postalCode">
                <Form.Label>postalCode</Form.Label>
                <Form.Control
                    placeholder="opis"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleUserInput}
                />
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="plantDisease">
                <Form.Label column sm={3}>
                    Atakowane rośliny
                </Form.Label>
                <Col sm={9}>
                    {/* <DropdownButton
                            title={'Wybierz rośliny'}
                            variant="secondary"
                            className="mb-3"
                        ></DropdownButton> */}
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
}

export default AddOfferForm;
