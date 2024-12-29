import Grid from '@mui/material/Grid2';
import React from 'react';
import CloudNode from './CloudNode';

const EvaporatingCloud: React.FC = () => {
    return (
        <Grid container spacing={2}>
            <Grid container size={12}>
                <Grid size={4} />
                <Grid size={4}>
                    <CloudNode text="B" />
                </Grid>
                <Grid size={4}>
                    <CloudNode text="D" />
                </Grid>
            </Grid>
            <Grid container size={12}>
                <Grid size={4}>
                    <CloudNode text="A" />
                </Grid>
            </Grid>
            <Grid container size={12}>
                <Grid size={4} />
                <Grid size={4}>
                    <CloudNode text="C" />
                </Grid>
                <Grid size={4}>
                    <CloudNode text="D'" />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EvaporatingCloud;
