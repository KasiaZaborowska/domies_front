import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="h-svh text-center pt-4 mt-4">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-[7rem] font-bold leading-tight">404</h1>
                <span className="font-medium">Oops! Page Not Found!</span>
                <p className="text-center text-muted-foreground">
                    It seems like the page you're looking for <br />
                    does not exist or might have been removed.
                </p>
                <div className="mt-6 flex gap-4">
                    <Button onClick={() => navigate(-1)}>Go Back</Button>
                    <Button onClick={() => navigate('/')}>Back to Home</Button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
