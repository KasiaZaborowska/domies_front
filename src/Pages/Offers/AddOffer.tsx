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

function AddOfferForm() {
    const dispatch = useDispatch();
    const userData: userAccountInterface = useSelector(
        (state: RootState) => state.userAccountStore,
    );
    //console.log(userData.Email);

    const loggedInUserEmail = userData.Email;
    // const role = userData.Role;

    const [offferToAdd] = useAddOfferMutation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<offerInterface>({
        name: '',
        host: loggedInUserEmail,
        description: '',
        country: '',
        city: '',
        street: '',
        postalCode: '',
        price: 0,
        file: null,
        offerAnimalTypes: [],
    });

    const { data, isLoading } = useGetAnimalTypesQuery(null);
    const [preview, setPreview] = useState<string | null>(null); // Obsługa podglądu zdjęcia

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
        console.log('Dane załadowane:', formData);
    }, [isLoading, data, dispatch]);

    const renderSelected = () => {
        return formData.offerAnimalTypes.join(', ') || 'Wybierz';
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
        // // Znajdź nazwę typu na podstawie TypeId
        // const selectedType = data.result.find(
        //     (type: animalTypeInterface) => type.animalTypeId === animalTypeId,
        // )?.type;

        // if (selectedType) {
        //     setFormData((prev) => {
        //         const isSelected = prev.offerAnimalTypes.includes(selectedType);
        //         const updatedSelectedTypes = isSelected
        //             ? prev.offerAnimalTypes.filter(
        //                   (type) => type !== selectedType,
        //               ) // Usuń
        //             : [...prev.offerAnimalTypes, selectedType]; // Dodaj

        //         return { ...prev, offerAnimalTypes: updatedSelectedTypes };
        //     });
        // }
    };
    // const renderSelected = () => {
    //     if (isLoading) {
    //         return 'Ładowanie...'; // Możesz dodać komunikat o ładowaniu
    //     }

    //     if (!data || !data.result || data.result.length === 0) {
    //         return 'Wybierz cechy'; // Zwracamy domyślny komunikat, jeśli brak danych
    //     }
    //     console.log(data.result);
    //     return (
    //         formData.offerAnimalTypes
    //             .map(
    //                 (animalTypeId) =>
    //                     data.result.find(
    //                         (type: animalTypeInterface) =>
    //                             type.animalTypeId === animalTypeId,
    //                     )?.name,
    //             )
    //             .filter((name) => name)
    //             .join(', ') || 'Wybierz cechy'
    //     );
    // };

    // const handleCheckboxChange = (animalTypeId: number) => {
    //     setFormData((prev) => {
    //         const isSelected = prev.offerAnimalTypes.includes(animalTypeId);
    //         const updatedOfferAnimalTypes = isSelected
    //             ? prev.offerAnimalTypes.filter((id) => id !== animalTypeId) // Usuń cechę
    //             : [...prev.offerAnimalTypes, animalTypeId]; // Dodaj cechę

    //         return { ...prev, offerAnimalTypes: updatedOfferAnimalTypes };
    //     });
    // };

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

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('host', loggedInUserEmail);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('street', formData.street);
        formDataToSend.append('postalCode', formData.postalCode);
        formDataToSend.append('price', formData.price.toString());
        formData.offerAnimalTypes.forEach((type: string) => {
            formDataToSend.append('offerAnimalTypes[]', type);
        });
        // formDataToSend.append(
        //     'offerAnimalTypes',
        //     formData.offerAnimalTypes.join(', '),
        // ); // Dodajemy typy zwierząt (jako string)

        // Jeśli mamy plik, dodajemy go do formData
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Dodajemy plik
        }

        try {
            const response: offerInterface = await offferToAdd({
                data: formDataToSend,
                userId: loggedInUserEmail,
                // data: {
                //     title: formData.title,
                //     host: loggedInUserEmail,
                //     description: formData.description,
                //     country: formData.country,
                //     city: formData.city,
                //     street: formData.street,
                //     postalCode: formData.postalCode,
                //     price: formData.price,
                //     offerAnimalTypes: formData.offerAnimalTypes.join(', '),
                //     file: formData.file,
                // },
            }).unwrap();
            setTimeout(() => {
                // Odświeżenie strony
                window.location.reload();
            }, 60000); // 60 000 ms = 1 minuta
            console.log('Dane, które dodaje:', response, 'and ', response.name);
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
        console.log('Dane załadowane:', formData);
        console.log('Dane send:', Object.fromEntries(formDataToSend));
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
            setFormData((prev) => ({ ...prev, file: photo })); // Przypisanie pliku do formData
            ///setPhoto(photo); // ustawienie wybranego pliku
        }
    };

    //console.log(data);
    if (isLoading) {
        return <MainLoader />;
    }

    return (
        <Form onSubmit={handleAddOffer}>
            <Form.Group
                as={Row}
                className="align-items-center mb-2"
                controlId="name"
            >
                <Col sm={2}>
                    <Form.Label>Nazwa</Form.Label>
                </Col>
                <Col>
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
                    <Form.Label>Opis</Form.Label>
                </Col>
                <Col sm={10}>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="opis"
                        name="description"
                        value={formData.description}
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
                    />
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
                    />
                </Col>
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

            <Form.Group as={Row} className="mb-4" controlId="File">
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
