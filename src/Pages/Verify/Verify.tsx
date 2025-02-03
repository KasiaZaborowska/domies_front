import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

function EmailVerify() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get('token');
    console.log(token);

    useEffect(() => {});

    return (
        <div className="h-svh text-center pt-5 mt-5">
            <div className="m-auto flex h-full w-full flex-col items-center justify-center gap-2">
                <h1 className="text-[7rem] font-bold leading-tight">
                    Dziękujemy za założenie konta w naszym serwisie!
                </h1>
                <div className="mt-6 flex gap-4 pt-4">
                    {/* <Button onClick={() => navigate(-1)}>Go Back</Button> */}
                    <Button onClick={() => navigate('/')}>
                        Przejdź do strony głównej
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default EmailVerify;
