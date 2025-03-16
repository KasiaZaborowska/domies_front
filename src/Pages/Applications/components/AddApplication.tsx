import React from 'react';
import { useState } from 'react';
import Application from './Application';
import Tooltip from '@mui/material/Tooltip';

interface Props {
    offerId: number;
}

function AddApplication({ offerId }: Props) {
    const [show, setShow] = useState(false);
    return (
        <>
            {/* CREATE BUTTON  */}
            <Tooltip title="Zarezerwuj ofertę">
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
                    Zarezerwuj!
                </button>
            </Tooltip>

            <Application offerId={offerId} show={show} setShow={setShow} />
        </>
    );
}

export default AddApplication;
