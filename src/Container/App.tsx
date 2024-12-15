import React from 'react';
import { Header, Footer } from '../Components/Layout';
import { Home, NotFound } from '../Pages';
import { Route, Routes } from 'react-router-dom';
import AnimalTypes from '../Pages/AnimalTypes';

function App() {
    return (
        <div className="">
            <Header />
            <div>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/animmaltypes"
                        element={<AnimalTypes />}
                    ></Route>
                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </div>
            <Footer />
        </div>
    );
}

export default App;
