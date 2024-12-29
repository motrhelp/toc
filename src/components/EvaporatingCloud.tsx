import Grid from '@mui/material/Grid2';
import React from 'react';

const EvaporatingCloud: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Grid size={4} />
                <Grid size={4} />
                <Grid size={4} />
            </Grid>
        </Grid>
    );
};

export default EvaporatingCloud;
