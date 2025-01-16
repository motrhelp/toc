import React from 'react';
import Grid from '@mui/material/Grid2';
import CloudNode from './CloudNode';
import { Cloud } from '@/context/clouds/CloudsContext';

// Define a prop interface if this component receives a cloud from outside
interface EvaporatingCloudProps {
  cloud: Cloud;
}

// Default placeholders if cloud text is empty
const PLACEHOLDERS = {
  A: 'Reduce cost per unit',
  B: 'Reduce setup cost per unit',
  C: 'Reduce carrying cost per unit',
  D: 'Run large batches',
  D_: 'Run small batches',
};

const EvaporatingCloud: React.FC<EvaporatingCloudProps> = ({ cloud }) => {
  return (
    <Grid container spacing={2}>
      <Grid container size={12}>
        <Grid size={4} />
        <Grid size={4}>
          <CloudNode text={cloud.A} placeholder={PLACEHOLDERS.A} />
        </Grid>
        <Grid size={4}>
          <CloudNode text={cloud.B} placeholder={PLACEHOLDERS.B} />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <CloudNode text={cloud.D} placeholder={PLACEHOLDERS.D} />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4} />
        <Grid size={4}>
          <CloudNode text={cloud.C} placeholder={PLACEHOLDERS.C} />
        </Grid>
        <Grid size={4}>
          <CloudNode text={cloud.D_} placeholder={PLACEHOLDERS.D_} />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EvaporatingCloud;
