import React from 'react';
import { useState, useEffect } from 'react';
import { offerInterface } from '../../../Interfaces';

interface Props {
    offer: offerInterface;
}

function OfferCard(props: Props) {
    return <div>{props.offer.title}</div>;
}

export default OfferCard;
