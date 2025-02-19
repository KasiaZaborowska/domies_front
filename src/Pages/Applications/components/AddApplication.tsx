import React from 'react';
import { useState } from 'react';
import Application from './Application';

interface Props {
    offerId: number;
}

function AddApplication({ offerId }: Props) {
    const [show, setShow] = useState(false);
    return (
        <>
            {/* CREATE BUTTON  */}
            <button
                className="btn form-control"
                style={{
                    height: '40px',
                    padding: '1px',
                    fontSize: '20px',
                    backgroundColor: '#5e503f',
                    color: 'white',
                }}
                onClick={() => setShow((prev) => !prev)}
            >
                Zarezerwuj
            </button>

            <Application offerId={offerId} show={show} setShow={setShow} />
        </>
    );
}

export default AddApplication;
