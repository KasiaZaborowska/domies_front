import { ReactNode } from 'react';
import './MyOfferDetails.css';
import React from 'react';

interface OfferDetailsStyleProps {
    children: ReactNode;
}

function OfferDetailsStyle({ children }: OfferDetailsStyleProps) {
    return <div className="responsive_box">{children}</div>;
}

export default OfferDetailsStyle;
