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
import inputHelper from '../../Helper/inputHelper';
import { useGetAnimalTypesQuery } from '../../Apis/animalTypeApi';
import { setAnimalType } from '../../Store/Redux/animalTypeSlice';
import { useParams } from 'react-router-dom';
import MainLoader from '../../Components/MainLoader';
import { useGetFacilitiesQuery } from '../../Apis/facilityApi';
import facilityInterface from '../../Interfaces/facilityInterface';

function EditOfferForm() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    // console.log(offerId);
    const { data: dataOffer } = useGetOfferByIdQuery({ id: offerId });

    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    //console.log(userData.Email);
    //console.log(dataOffer.result.photo);
    //console.log(dataOffer.result.offerAnimalTypes);
    const offerAnimalTypesToArray =
        dataOffer.result.offerAnimalTypes.split(', ');
    // console.log(offerAnimalTypesToArray);
    // console.log(dataOffer);

    // const facilitiesToArray = dataOffer.result.facilities.split(', ');
    // console.log(offerAnimalTypesToArray);

    const loggedInUserEmail = userData.Email;
    // const role = userData.Role;

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
        price: dataOffer.result.price,
        file: dataOffer.result.photo,
        offerAnimalTypes: offerAnimalTypesToArray,
        facilities: dataOffer.result.facilities,
    });

    const { data, isLoading } = useGetAnimalTypesQuery(null);

    const [preview, setPreview] = useState<string | null>();

    const photo = formData.file;

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
        console.log('Dane załadowane:', formData);

        if (dataOffer.result.photo) {
            setPreview(dataOffer.result.photo); // Ustawienie prewizualizacji obrazu z base64
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
        const tempData = inputHelper(e, formData);
        setFormData(tempData);
    };

    const handleEditOffer = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        if (!formData) {
            alert('Wszystkie pola są wymagane!');
            setLoading(false);
            return;
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
            console.log(type);
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
            console.log(response);
            alert('dodane!');
        } catch (error) {
            console.log('Błąd');
            console.error('Błąd przy dodawaniu:', error);
        }
        console.log('Dane załadowane:', formData);
        //console.log('Dane send:', Object.fromEntries(formDataToSend));
    };
    const { data: facilities, isLoading: isLoadingFacilities } =
        useGetFacilitiesQuery(null);

    console.log(formData.facilities);
    const renderSelectedFacilities = () => {
        return (
            formData.facilities
                .map((item: any) => `${item.facilitiesDescription}`)
                .join(', ') || 'Wybierz'
        );
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
    //console.log(photo);

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
    console.log('preview');
    console.log(preview);
    //console.log(data);
    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <Form onSubmit={handleEditOffer}>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="name"
            >
                <Col sm={2}>
                    <Form.Label>Nazwa</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        placeholder="Wpisz tytuł"
                        name="name"
                        value={formData.name}
                        onChange={handleUserInput}
                    />
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
                        placeholder="opis oferty"
                        name="offerDescription"
                        value={formData.offerDescription}
                        onChange={handleUserInput}
                    />
                </Col>
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
                        value={formData.price}
                        onChange={handleUserInput}
                    />
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
                        value={formData.country}
                        onChange={handleUserInput}
                    />
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
                        value={formData.city}
                        onChange={handleUserInput}
                    />
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
                        value={formData.street}
                        onChange={handleUserInput}
                    />{' '}
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
                        value={formData.postalCode}
                        onChange={handleUserInput}
                    />{' '}
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
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="File"
            >
                <Form.Label column sm={2}>
                    Plik
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
