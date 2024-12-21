import React, { useState } from 'react';
import {
    Button,
    Modal,
    Form,
    Row,
    Col,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';

function AddOfferForm() {
    const [formData, setFormData] = useState({
        name: '',
        characteristic: '',
        reasons: '',
        file: null,
        plantDisease: [], // Tablica na ID wybranych produktów
    });

    return (
        <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Tytuł</Form.Label>
                <Form.Control placeholder="Wpisz tytuł" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Zdjęcie</Form.Label>
                <Form.Control placeholder="dodaj zdjęcie" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Opis</Form.Label>
                <Form.Control placeholder="opis" />
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
