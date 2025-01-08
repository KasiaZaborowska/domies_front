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

function EditOfferForm() {
    const { offerId } = useParams(); // offerId match the offerId from App.tsx
    console.log(offerId);
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
    console.log(offerAnimalTypesToArray);

    const loggedInUserEmail = userData.Email;
    // const role = userData.Role;

    const [offferToUpdate] = useUpdateOfferMutation();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<offerInterface>({
        name: dataOffer.result.name,
        host: loggedInUserEmail,
        description: dataOffer.result.description,
        country: dataOffer.result.country,
        city: dataOffer.result.city,
        street: dataOffer.result.street,
        postalCode: dataOffer.result.postalCode,
        price: dataOffer.result.price,
        file: dataOffer.result.photo,
        offerAnimalTypes: offerAnimalTypesToArray,
    });

    const { data, isLoading } = useGetAnimalTypesQuery(null);
    const [preview, setPreview] = useState<string | null>(null);

    useEffect(() => {
        if (!isLoading) {
            dispatch(setAnimalType(data.result));
        }
        console.log('Dane załadowane:', formData);
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
        formDataToSend.append('description', formData.description);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('city', formData.city);
        formDataToSend.append('street', formData.street);
        formDataToSend.append('postalCode', formData.postalCode);
        formDataToSend.append('price', formData.price.toString());
        // formDataToSend.append(
        //     'offerAnimalTypes',
        //     JSON.stringify(formData.offerAnimalTypes),
        // );
        // formData.offerAnimalTypes.forEach((type: string) => {
        //     formDataToSend.append('offerAnimalTypes', type);
        // });

        formDataToSend.append(
            'offerAnimalTypes',
            formData.offerAnimalTypes.join(', '),
        ); // Dodajemy typy zwierząt (jako string)

        // Jeśli mamy plik, dodajemy go do formData
        if (formData.file) {
            formDataToSend.append('file', formData.file); // Dodajemy plik
        }

        try {
            const response: offerInterface = await offferToUpdate({
                data: formDataToSend,
                userId: loggedInUserEmail,
            }).unwrap();
            console.log(response);
            alert('dodane!');
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
        return <div>Loading...</div>;
    }

    return (
        <Form onSubmit={handleEditOffer}>
            <Form.Group className="mb-2" controlId="name">
                <Form.Label>Nazwa</Form.Label>
                <Form.Control
                    placeholder="Wpisz tytuł"
                    name="name"
                    value={formData.name}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="">
                <Form.Label>Opis</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="opis"
                    name="description"
                    value={formData.description}
                    onChange={handleUserInput}
                />
            </Form.Group>
            <Form.Group className="mb-2" controlId="">
                <Form.Label>Cena</Form.Label>
                <Form.Control
                    placeholder="cena"
                    name="price"
                    value={formData.price}
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
            <Form.Group controlId="formAnimalTypes">
                <Form.Label>Typy zwierząt</Form.Label>
                <DropdownButton
                    title={renderSelected() || 'wybierz typy  zwierząt'}
                >
                    {data.result.map((type: animalTypeInterface) => (
                        <Form.Check
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
                        <p>Podgląd obrazu:</p>
                        <img
                            src={preview ?? undefined}
                            alt="brak obrazu"
                            style={{
                                maxWidth: '300px',
                                maxHeight: '100px',
                                marginTop: '15px',
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
