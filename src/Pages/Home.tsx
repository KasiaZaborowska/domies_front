import React from 'react';
import { Banner, OfferList } from '../Components/Page/Offers';

function Home() {
    return (
        <div>
            <Banner />
            <div className="container p-2">
                <OfferList />
            </div>
        </div>
    );
}

export default Home;
