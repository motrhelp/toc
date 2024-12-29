import React from 'react';
import { Box, Card, CardContent, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';

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
