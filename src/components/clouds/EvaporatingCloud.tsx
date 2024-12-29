import Grid from '@mui/material/Grid2';
import React from 'react';
import CloudNode from './CloudNode';

const EvaporatingCloud: React.FC = () => {

    const cloud = {
        A: 'Reduce cost per unit',
        B: 'Reduce setup cost per unit',
        C: 'Reduce carrying cost per unit',
        D: 'Run large batches',
        D_: 'Run small batches',
    }

    return (
        <Grid container spacing={2}>
            <Grid container size={12}>
                <Grid size={4} />
                <Grid size={4}>
                    <CloudNode text={cloud.A} />
                </Grid>
                <Grid size={4}>
                    <CloudNode text={cloud.B} />
                </Grid>
            </Grid>
            <Grid container size={12}>
                <Grid size={4}>
                    <CloudNode text={cloud.D} />
                </Grid>
            </Grid>
            <Grid container size={12}>
                <Grid size={4} />
                <Grid size={4}>
                    <CloudNode text={cloud.C} />
                </Grid>
                <Grid size={4}>
                    <CloudNode text={cloud.D_} />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EvaporatingCloud;
