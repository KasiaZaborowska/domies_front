import React from 'react';
import { useState, useEffect } from 'react';
import { offerInterface, readOfferInterface } from '../../Interfaces';
import OfferCardMainPage from './OfferCardMainPage';
import './OfferList.css';

interface OfferListProps {
    offers: readOfferInterface[];
    searchString: string;
    selectedTypes: string[];
}
function OfferList({ offers, searchString, selectedTypes }: OfferListProps) {
    const filteredOffers = offers.filter((offer) => {
        const matchesCity = offer.city
            .toLowerCase()
            .includes(searchString.toLowerCase());

        const offerTypes = offer.offerAnimalTypes.map((t: any) =>
            t.trim().toLowerCase(),
        );

        const matchesType =
            selectedTypes.length === 0 ||
            selectedTypes.some((selectedType) =>
                offerTypes.includes(selectedType.toLowerCase()),
            );
        return matchesCity && matchesType;
    });

    return (
        <>
            <div className="container row">
                {filteredOffers.length > 0 &&
                    filteredOffers.map((offer, index) => (
                        <OfferCardMainPage offer={offer} key={index} />
                    ))}
            </div>
        </>
    );
}

export default OfferList;
