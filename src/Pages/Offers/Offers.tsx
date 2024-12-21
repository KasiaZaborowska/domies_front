import React from 'react';
import { OfferList } from '../../Components/Page/Offers';

function Offers() {
    return (
        <div className="container">
            <div>
                <button>Dodaj swoją ofertę!</button>
            </div>
            <OfferList />
        </div>
    );
}

export default Offers;
