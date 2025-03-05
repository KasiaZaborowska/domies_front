import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col, DropdownButton } from 'react-bootstrap';
import { useAddOfferMutation } from '../../Apis/offerApi';
import { useDispatch, useSelector } from 'react-redux';
import {
    animalTypeInterface,
    offerInterface,
    userAccountInterface,
} from '../../Interfaces';
import { RootState } from '../../Store/Redux/store';
import inputHelper from '../../Helper/inputHelper';
import { useGetAnimalTypesQuery } from '../../Apis/animalTypeApi';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import MainLoader from '../../Components/MainLoader';
import facilityInterface from '../../Interfaces/facilityInterface';
import { useGetFacilitiesQuery } from '../../Apis/facilityApi';
import { setFacility } from '../../Store/Redux/facilitySlice';
import toastNotify from '../../Helper/toastNotify';
import * as formik from 'formik';
interface AddOfferFormProps {
    onSuccess: () => void;
}

function AddOfferForm({ onSuccess }: AddOfferFormProps) {
    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    const { Formik } = formik;
    const loggedInUserEmail = userData.Email;
    const [submitted, setSubmitted] = useState(false);
    const [offferToAdd] = useAddOfferMutation();
    const [loading, setLoading] = useState(false);
    const [touched, setTouched] = useState({
        lastName: false,
    });
    const [formData, setFormData] = useState<offerInterface>({
        name: '',
        host: loggedInUserEmail,
        offerDescription: '',
        petSitterDescription: '',
        country: '',
        city: '',
        street: '',
        postalCode: '',
        price: 0,
        file: null,
        offerAnimalTypes: [],
        facilities: [],
    });

    const { data, isLoading } = useGetAnimalTypesQuery(null);
    const { data: facilities, isLoading: isLoadingFacilities } =
        useGetFacilitiesQuery(null);
    const [preview, setPreview] = useState<string | null>(null); // Obsługa podglądu zdjęcia

    const [validated, setValidated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    useEffect(() => {
        if (isLoading || isLoadingFacilities) return;
        dispatch(setAnimalType(data.result));
        // dispatch(setFacility(facilities.result));

        console.log('Dane załadowane:', formData);
    }, [isLoading, isLoadingFacilities, data, dispatch]);

    //RENDER DROPDOWN's
    const renderSelected = () => {
        return formData.offerAnimalTypes.join(', ') || 'Wybierz';
    };

    const renderSelectedFacilities = () => {
        if (
            !Array.isArray(formData.facilities) ||
            formData.facilities.length === 0
        ) {
            return 'Wybierz';
        }
        const facilitiesArray = facilities.result;
        return (
            formData.facilities
                .map((id) => {
                    const myFacility = facilitiesArray.find(
                        (f: any) => f.id === id,
                    );
                    return myFacility ? myFacility.facilitiesDescription : '';
                })
                .join(', ') || 'Wybierz'
        );
    };
    const handleCheckboxChange = (animalTypeId: number) => {
        const selectedType = data.result.find(
            (type: animalTypeInterface) => type.animalTypeId === animalTypeId,
        )?.type;

        if (selectedType) {
            setFormData((prev) => {
                const isSelected = prev.offerAnimalTypes.includes(selectedType);
                const updatedTypes = isSelected
                    ? prev.offerAnimalTypes.filter(
                          (type) => type !== selectedType,
                      )
                    : [...prev.offerAnimalTypes, selectedType];

                return { ...prev, offerAnimalTypes: updatedTypes };
            });
        }
    };
    const handleCheckboxChangeFacilities = (id: number) => {
        const selectedFacility = facilities.result.find(
            (facility: facilityInterface) => facility.id === id,
        )?.id;
        console.log(selectedFacility);
        if (selectedFacility) {
            setFormData((prev) => {
                const isSelected = prev.facilities.includes(selectedFacility);
                const updatedTypes = isSelected
                    ? prev.facilities.filter(
                          (facility) => facility !== selectedFacility,
                      )
                    : [...prev.facilities, selectedFacility];

                return { ...prev, facilities: updatedTypes };
            });
        }
    };
    console.log('facilities');
    console.log(facilities);
    console.log('Selected facilities:', formData.facilities);

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const handleAddOffer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
        }
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('host', loggedInUserEmail);
        formDataToSend.append('offerDescription', formData.offerDescription);
        formDataToSend.append(
            'petSitterDescription',
            formData.petSitterDescription,
        );
        formDataToSend.append('country', formData.country);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('street', formData.street);
        formDataToSend.append('postalCode', formData.postalCode);
        formDataToSend.append('price', formData.price.toString());
        formData.offerAnimalTypes.forEach((type: string) => {
            formDataToSend.append('offerAnimalTypes[]', type);
        });
        formData.facilities.forEach((facility: number) => {
            formDataToSend.append('facilities[]', facility.toString());
        });
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Dodajemy plik
        }
        console.log(formData.file);

        try {
            const response: offerInterface = await offferToAdd({
                data: formDataToSend,
                userId: loggedInUserEmail,
            }).unwrap();
            console.log('Dane, które dodaje:', response, 'and ', response.name);
            onSuccess();
            toastNotify('Dodawanie oferty zakończone sukcesem!');
            // alert('dodane!');
        } catch (error: any) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
            if (error?.data?.errors) {
                setErrorMessage(error.data.errors);
            } else {
                setErrorMessage(['Wystąpił  błąd.']);
            }
        }
        console.log('Dane załadowane:', formData);
        console.log('Dane send:', Object.fromEntries(formDataToSend));

        setLoading(false);
        setSubmitted(true);
        // setValidated(true);
    };

    function getErrorMessage(key: any) {
        console.log(errorMessage);
        console.log(key);
        console.log(errorMessage.hasOwnProperty(key));
        console.log(errorMessage.hasOwnProperty('Name'));
        console.log(errorMessage.hasOwnProperty(['Name'][0]));
        // console.log(errorMessage['Name'][0]);
        // console.log(errorMessage[key][0]);
        return errorMessage.hasOwnProperty(key) ? errorMessage[key][0] : '';
    }
    console.log(getErrorMessage('Name'));
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setFormData((prev) => ({ prev, file: e.target.file[0] }));
        const photo = e.target.files?.[0];
        if (photo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // prewizualizacja wybranego obrazu
            };
            reader.readAsDataURL(photo);
            setFormData((prev) => ({ ...prev, file: photo })); // Przypisanie pliku do formData
            ///setPhoto(photo); // ustawienie wybranego pliku
        }
    };

    //console.log(data);
    if (isLoading || isLoadingFacilities) {
        return <MainLoader />;
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleAddOffer}>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="name"
            >
                <Col sm={2}>
                    <Form.Label>Imię opiekuna:</Form.Label>
                </Col>
                <Col>
                    <Form.Control
                        placeholder="Wpisz tytuł"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleUserInput}
                        // isValid={touched.Name && !errors.Name}
                        // isInvalid={touched.Name && errors.Name}
                    />
                </Col>
                <Form.Control.Feedback>
                    {getErrorMessage('Name')}
                </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="">
                <Col sm={2}>
                    <Form.Label>Opis oferty</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        placeholder="opis oferty"
                        name="offerDescription"
                        value={formData.offerDescription}
                        onChange={handleUserInput}
                    />
                </Col>
                <div className="invalid-feedback">
                    {getErrorMessage('OfferDescription')}
                </div>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="">
                <Col sm={2}>
                    <Form.Label>Opis opiekuna/O mnie</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        required
                        placeholder="opis opiekuna"
                        name="petSitterDescription"
                        value={formData.petSitterDescription}
                        onChange={handleUserInput}
                    />
                </Col>
                <div className="invalid-feedback">
                    {getErrorMessage('PetSitterDescription')}
                </div>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId=""
            >
                <Col sm={2}>
                    <Form.Label>Cena</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="cena"
                        name="price"
                        required
                        value={formData.price}
                        isInvalid={submitted && formData.price === 0}
                        onChange={handleUserInput}
                    />
                </Col>
                <div className="invalid-feedback">
                    {getErrorMessage('Price')}
                </div>
            </Form.Group>
            <div className="invalid-feedback">{getErrorMessage('price')}</div>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId=""
            >
                <Col sm={2}>
                    <Form.Label>Państwo</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="opis"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleUserInput}
                    />
                </Col>
            </Form.Group>
            <div className="invalid-feedback">{getErrorMessage('Country')}</div>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="city"
            >
                <Col sm={2}>
                    <Form.Label>Miasto</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="opis"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleUserInput}
                    />
                </Col>
            </Form.Group>
            <div className="invalid-feedback">{getErrorMessage('City')}</div>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="street"
            >
                <Col sm={2}>
                    <Form.Label>Ulica</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="opis"
                        name="street"
                        required
                        value={formData.street}
                        onChange={handleUserInput}
                    />
                </Col>
            </Form.Group>
            <div className="invalid-feedback">{getErrorMessage('Street')}</div>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="postalCode"
            >
                <Col sm={2}>
                    <Form.Label>Kod pocztowy</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="opis"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleUserInput}
                    />
                </Col>
                <div className="invalid-feedback">
                    {getErrorMessage('PostalCode')}
                </div>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="formAnimalTypes"
            >
                <Col sm={2}>
                    <Form.Label>Typy zwierząt</Form.Label>{' '}
                </Col>
                <Col sm={10}>
                    <DropdownButton
                        title={renderSelected() || 'wybierz typy  zwierząt'}
                    >
                        {data.result.map((type: animalTypeInterface) => (
                            <Form.Check
                                className="m-2"
                                key={type.animalTypeId}
                                type="checkbox"
                                required
                                label={type.type}
                                value={type.animalTypeId}
                                checked={formData.offerAnimalTypes.includes(
                                    type.type,
                                )}
                                onChange={() =>
                                    handleCheckboxChange(type.animalTypeId)
                                }
                            />
                        ))}
                    </DropdownButton>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="facilities"
            >
                <Col sm={2}>
                    <Form.Label>Udogodnienia:</Form.Label>{' '}
                </Col>
                <Col sm={10}>
                    <DropdownButton
                        title={
                            renderSelectedFacilities() || 'wybierz udogodnienia'
                        }
                    >
                        {facilities.result.map(
                            (facility: facilityInterface) => (
                                <Form.Check
                                    className="m-2"
                                    key={facility.id}
                                    type="checkbox"
                                    label={facility.facilitiesDescription}
                                    value={facility.id}
                                    checked={formData.facilities.some(
                                        (selectedFacility: number) =>
                                            selectedFacility === facility.id,
                                    )}
                                    onChange={() =>
                                        handleCheckboxChangeFacilities(
                                            facility.id,
                                        )
                                    }
                                />
                            ),
                        )}
                    </DropdownButton>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-4" controlId="File">
                <Form.Label column sm={2}>
                    Plik
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="file"
                        name="file"
                        required
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div>
                        <p className="pt-3">Podgląd obrazu:</p>
                        <img
                            src={preview ?? undefined}
                            alt="brak obrazu"
                            style={{
                                maxWidth: '300px',
                                maxHeight: '100px',
                                marginTop: '5px',
                            }}
                        />
                    </div>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit">
                Dodaj ofertę
            </Button>
        </Form>
    );
}

export default AddOfferForm;
