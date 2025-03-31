import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Row,
    Col,
    DropdownButton,
    Dropdown,
} from 'react-bootstrap';
import {
    useGetOfferByIdQuery,
    useUpdateOfferMutation,
} from '../../Apis/offerApi';
import { useDispatch, useSelector } from 'react-redux';
import {
    animalTypeInterface,
    offerInterface,
    userAccountInterface,
} from '../../Interfaces';
import { RootState } from '../../Store/Redux/store';
import inputHelperUtility from '../../Utils/inputHelperUtility';
import { useGetAnimalTypesQuery } from '../../Apis/animalTypeApi';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import { useParams } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';
import { useGetFacilitiesQuery } from '../../Apis/facilityApi';
import facilityInterface from '../../Interfaces/facilityInterface';
import toastNotify from '../../Components/toastNotify';

function EditOfferForm() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    // console.log(offerId);
    const { data: dataOffer } = useGetOfferByIdQuery({ id: offerId });

    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    const offerAnimalTypesToArray =
        dataOffer.result.offerAnimalTypes.split(', ');

    const temp = dataOffer.result.facilities;
    const offerFacilitiesDescriptionsArray = temp.map(
        (facility: any) => facility.facilitiesDescription,
    );

    const [validated, setValidated] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string[]>([]);

    const loggedInUserEmail = userData.Email;

    const [offferToUpdate] = useUpdateOfferMutation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<offerInterface>({
        name: dataOffer.result.name,
        host: loggedInUserEmail,
        offerDescription: dataOffer.result.offerDescription,
        petSitterDescription: dataOffer.result.petSitterDescription,
        country: dataOffer.result.country,
        city: dataOffer.result.city,
        street: dataOffer.result.street,
        postalCode: dataOffer.result.postalCode,
        price: dataOffer.result.price.toString().replace('.', ','),
        file: dataOffer.result.photo,
        offerAnimalTypes: offerAnimalTypesToArray,
        facilities: dataOffer.result.facilities.map(
            (facility: any) => facility.id,
        ),
    });

    const facilitiesIdArray: number[] = formData.facilities.map(
        (facility: any) => facility.id,
    );
    const { data, isLoading } = useGetAnimalTypesQuery(null);

    const [preview, setPreview] = useState<string | null>();

    useEffect(() => {
        if (!isLoading || !isLoadingFacilities) {
            dispatch(setAnimalType(data.result));
        }

        if (dataOffer.result.photo) {
            setPreview(dataOffer.result.photo);
        }
    }, [isLoading, data, dispatch]);

    const renderSelected = () => {
        return formData.offerAnimalTypes.join(', ') || 'Wybierz cechy';
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

    const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tempData = inputHelperUtility(e, formData);
        setFormData(tempData);
    };

    const handleEditOffer = async (e: React.FormEvent<HTMLFormElement>) => {
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
            formDataToSend.append('file', formData.file);
        }

        try {
            const response: offerInterface = await offferToUpdate({
                data: formDataToSend,
                userId: loggedInUserEmail,
                id: offerId,
            }).unwrap();
            // window.location.href = `/myOfferDetails/${offerId}`;
            toastNotify('Edytowanie oferty zakończone sukcesem!');
        } catch (error: any) {
            console.error('Błąd przy edytowaniu:', error);
            if (error?.data?.errors) {
                setErrorMessage(error.data.errors);
            } else {
                setErrorMessage(['Wystąpił  błąd.']);
            }
        }
        setLoading(false);
    };
    const { data: facilities, isLoading: isLoadingFacilities } =
        useGetFacilitiesQuery(null);
    function getErrorMessage(key: any) {
        // console.log(errorMessage);
        return errorMessage.hasOwnProperty(key) ? errorMessage[key][0] : '';
    }

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
                    return myFacility
                        ? myFacility.facilitiesDescription
                        : 'błąd';
                })
                .join(', ') || 'Wybierz'
        );
    };
    const handleCheckboxChangeFacilities = (id: number) => {
        const selectedFacility = facilities.result.find(
            (facility: facilityInterface) => facility.id === id,
        )?.id;
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //setFormData((prev) => ({ prev, file: e.target.file[0] }));
        const photo = e.target.files?.[0];
        if (photo) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string); // ustawienie prewizualizacji wybranego obrazu
            };
            reader.readAsDataURL(photo);
            setFormData((prev) => ({ ...prev, file: photo }));

            //setPhoto(photo); // ustawienie wybranego pliku
        }
    };
    if (isLoading || isLoadingFacilities) {
        return <MainLoader />;
    }

    return (
        <Form noValidate validated={validated} onSubmit={handleEditOffer}>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="name"
            >
                <Col sm={2}>
                    <Form.Label>Imię opiekuna</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="Wpisz tytuł"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleUserInput}
                    />{' '}
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('Name') || 'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
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
                    />{' '}
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('OfferDescription') ||
                            'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-2" controlId="">
                <Col sm={2}>
                    <Form.Label>Opis opiekuna</Form.Label>
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
                    />{' '}
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('PetSitterDescription') ||
                            'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId=""
            >
                <Col sm={2}>
                    <Form.Label>Cena za 24h</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="cena"
                        name="price"
                        required
                        value={formData.price}
                        onChange={handleUserInput}
                    />
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('Price') || 'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
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
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('Country') || 'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
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
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('City') || 'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
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
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('Street') || 'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
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
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('PostalCode') ||
                            'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="formAnimalTypes"
            >
                <Col sm={2}>
                    <Form.Label>Typy zwierząt</Form.Label>
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
                    <Form.Control.Feedback type="invalid">
                        {getErrorMessage('OfferAnimalTypes') ||
                            'To pole jest wymagane.'}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="facilities"
            >
                <Col sm={2}>
                    <Form.Label>Udogodnienia</Form.Label>{' '}
                </Col>
                <Col sm={10}>
                    <DropdownButton
                        title={
                            renderSelectedFacilities() || 'wybierz udogodnienia'
                        }
                    >
                        <div className="d-flex flex-column flex-md-row">
                            {facilities.result.map(
                                (facility: facilityInterface) => (
                                    <Form.Check
                                        className="m-2 d-block"
                                        key={facility.id}
                                        type="checkbox"
                                        label={facility.facilitiesDescription}
                                        value={facility.id}
                                        checked={formData.facilities.some(
                                            (selectedFacility: number) =>
                                                selectedFacility ===
                                                facility.id,
                                        )}
                                        onChange={() =>
                                            handleCheckboxChangeFacilities(
                                                facility.id,
                                            )
                                        }
                                    />
                                ),
                            )}
                        </div>
                    </DropdownButton>
                </Col>
            </Form.Group>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="File"
            >
                <Form.Label column sm={2}>
                    Wybrany plik
                </Form.Label>
                <Col sm={10}>
                    <Form.Control
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                    <div>
                        <p className="pt-3"> Podgląd obrazu:</p>
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
                Edytuj ofertę
            </Button>
        </Form>
    );
}

export default EditOfferForm;
