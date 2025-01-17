import React, { useContext } from 'react';
import Grid from '@mui/material/Grid2';
import CloudNode from './CloudNode';
import CloudsContext, { Cloud } from '@/context/clouds/CloudsContext';

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
  const { updateCloud } = useContext(CloudsContext)!;

  return (
    <Grid container spacing={2}>
      <Grid container size={12}>
        <Grid size={4} />
        <Grid size={4}>
          <CloudNode
            text={cloud.A}
            placeholder={PLACEHOLDERS.A}
            onTextChange={(newText) => updateCloud(cloud.id, { A: newText })}
          />
        </Grid>
        <Grid size={4}>
          <CloudNode
            text={cloud.B}
            placeholder={PLACEHOLDERS.B}
            onTextChange={(newText) => updateCloud(cloud.id, { B: newText })}
          />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <CloudNode
            text={cloud.D}
            placeholder={PLACEHOLDERS.D}
            onTextChange={(newText) => updateCloud(cloud.id, { D: newText })}
          />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4} />
        <Grid size={4}>
          <CloudNode
            text={cloud.C}
            placeholder={PLACEHOLDERS.C}
            onTextChange={(newText) => updateCloud(cloud.id, { C: newText })}
          />
        </Grid>
        <Grid size={4}>
          <CloudNode
            text={cloud.D_}
            placeholder={PLACEHOLDERS.D_}
            onTextChange={(newText) => updateCloud(cloud.id, { D_: newText })}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default EvaporatingCloud;
