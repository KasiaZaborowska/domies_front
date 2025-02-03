import React, { useEffect, useState } from 'react';
import { Banner, OfferList } from '../Components/Page/Offers';
import { offerByIdInterface, readOfferInterface } from '../Interfaces';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [offers, setOffers] = useState<readOfferInterface[]>([]);

    const [searchString, setSearchString] = useState('');
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    // const [value, setValue] = useState([1, 3]);
    const handleChange = (newValue: string, checked: boolean) => {
        if (checked) {
            setSelectedTypes((prev) => [...prev, newValue]); // Dodajemy nowy typ
        } else {
            setSelectedTypes((prev) =>
                prev.filter((type) => type !== newValue),
            ); // Usuwamy typ
        }
    };
    useEffect(() => {
        fetch('https://localhost:7098/api/offer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const tempData = data.result.map((result: any) => ({
                    ...result,
                    offerAnimalTypes: result.offerAnimalTypes.split(', '),
                }));

                console.log('tempData.offerAnimalTypes');
                console.log(tempData);

                setOffers(tempData);
            });
    }, []);
    return (
        <div>
            <Banner
                searchString={searchString}
                setSearchString={setSearchString}
            />
            <div
                className="containerTypes"
                style={{ justifyContent: 'center' }}
            >
                <ToggleButtonGroup
                    style={{
                        alignContent: 'center',
                        padding: '10px',
                    }}
                    type="checkbox"
                    value={selectedTypes}
                    //onChange={handleChange}
                >
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            color: 'black',
                            display: 'flex',
                            alignItems: 'center',
                            backgroundColor: selectedTypes.includes('Pies')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-1"
                        value="Pies"
                        onChange={(e) => handleChange('Pies', e.target.checked)}
                    >
                        <FontAwesomeIcon
                            icon={faDog}
                            size="2x"
                            style={{ marginRight: '10px' }}
                        />
                        Pies
                    </ToggleButton>
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            backgroundColor: selectedTypes.includes('Kot')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-2"
                        value="Kot"
                        onChange={(e) => handleChange('Kot', e.target.checked)}
                    >
                        Kot
                    </ToggleButton>
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            backgroundColor: selectedTypes.includes('Gryzoń')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-3"
                        value="Gryzoń"
                        onChange={(e) =>
                            handleChange('Gryzoń', e.target.checked)
                        }
                    >
                        Gryzoń
                    </ToggleButton>
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            backgroundColor: selectedTypes.includes('Gad')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-4"
                        value="Gad"
                        onChange={(e) => handleChange('Gad', e.target.checked)}
                    >
                        Gad
                    </ToggleButton>
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            backgroundColor: selectedTypes.includes('Płaz')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-5"
                        value="Płaz"
                        onChange={(e) => handleChange('Płaz', e.target.checked)}
                    >
                        Płaz
                    </ToggleButton>
                    <ToggleButton
                        style={{
                            marginInline: '20px',
                            backgroundColor: selectedTypes.includes('Rybki')
                                ? 'darkgray'
                                : 'lightgray',
                        }}
                        id="tbg-btn-6"
                        value="Rybki"
                        onChange={(e) =>
                            handleChange('Rybki', e.target.checked)
                        }
                    >
                        Rybki
                    </ToggleButton>
                </ToggleButtonGroup>
            </div>
            <div className="container p-2">
                <OfferList
                    offers={offers}
                    searchString={searchString}
                    selectedTypes={selectedTypes}
                />
            </div>
        </div>
    );
}

export default Home;
