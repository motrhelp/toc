import { Typography } from '@mui/material';
import React from 'react';


const Page: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '84vh',
            }}
        >
            <Typography variant='h2'>Clouds at your fingertips</Typography>
        </div>
    );
};

export default Page;