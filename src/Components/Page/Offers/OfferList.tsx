import React from 'react';
import { useState, useEffect } from 'react';
import { readOfferInterface } from '../../../Interfaces';
import OfferCardMainPage from './OfferCardMainPage';

function OfferList() {
    const [offers, setOffers] = useState<readOfferInterface[]>([]);

    useEffect(() => {
        fetch('https://localhost:7098/api/offer')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setOffers(data.result);
            });
    }, []);

    return (
        <div className="container row">
            {offers.length > 0 &&
                offers.map((offer, index) => (
                    <OfferCardMainPage offer={offer} key={index} />
                ))}
        </div>
    );
}

export default OfferList;
