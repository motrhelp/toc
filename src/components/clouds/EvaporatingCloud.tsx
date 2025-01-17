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
  A: 'A\nWhat common objective will be achieved by meeting both need B and need C?',
  B: 'B\nWhat need is satisfied by their action in D?',
  C: 'C\nWhat need is satisfied by my action?',
  D: 'D\nWhat action does the other side want to do/do I feel under pressure to do?',
  D_: 'D\'\nWhat is the action I want to do?',
};

const EvaporatingCloud: React.FC<EvaporatingCloudProps> = ({ cloud }) => {
  const { updateCloud } = useContext(CloudsContext)!;

  return (
    <Grid container spacing={2}>
      <Grid container size={12}>
        <Grid size={4} />
        <Grid size={4}>
          <CloudNode
            text={cloud.B}
            placeholder={PLACEHOLDERS.B}
            onTextChange={(newText) => updateCloud(cloud.id, { B: newText })}
          />
        </Grid>
        <Grid size={4}>
          <CloudNode
            text={cloud.D}
            placeholder={PLACEHOLDERS.D}
            onTextChange={(newText) => updateCloud(cloud.id, { D: newText })}
          />
        </Grid>
      </Grid>

      <Grid container size={12}>
        <Grid size={4}>
          <CloudNode
            text={cloud.A}
            placeholder={PLACEHOLDERS.A}
            onTextChange={(newText) => updateCloud(cloud.id, { A: newText })}
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
