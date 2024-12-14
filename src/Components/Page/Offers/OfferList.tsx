import React from 'react';
import { useState, useEffect } from 'react';
import { offerInterface } from '../../../Interfaces';

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

    return <div></div>;
}

export default OfferList;
