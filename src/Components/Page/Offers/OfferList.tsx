import React from 'react';
import { useState, useEffect } from 'react';
import { offerInterface } from '../../../Interfaces';
import OfferCard from '../../../Pages/Offers/OfferCard';

function OfferList() {
    const [offers, setOffers] = useState<offerInterface[]>([]);

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
                    <OfferCard offer={offer} key={index} />
                ))}
        </div>
    );
}

export default OfferList;
