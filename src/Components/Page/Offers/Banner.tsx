import React, { useState } from 'react';
import './banner.css';

interface BannerProps {
    searchString: string;
    setSearchString: (value: string) => void;
}
function Banner({ searchString, setSearchString }: BannerProps) {
    return (
        <div className="custom-banner">
            <div
                className="m-auto d-flex align-items-center"
                style={{
                    width: '500px',
                    height: '55vh',
                }}
            >
                <div
                    className="d-flex align-items-center"
                    style={{ width: '100%' }}
                >
                    <input
                        type={'text'}
                        className="form-control rounded-pill"
                        style={{
                            width: '100%',
                            padding: '20px 20px',
                        }}
                        placeholder="Wyszukaj po mieście..."
                        value={searchString}
                        onChange={(e) => setSearchString(e.target.value)}
                    />
                    <span style={{ position: 'relative', left: '-43px' }}>
                        <i className="bi bi-search"></i>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Banner;
