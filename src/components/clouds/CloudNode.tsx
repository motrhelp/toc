import { Paper, Typography } from '@mui/material';
import React from 'react';

const CloudNode: React.FC<{ text: string }> = ({ text }) => {
    return (
        <Paper
            style={{
                aspectRatio: 'auto 2 / 1',
            }}
        >
            <Typography>
                {text}
            </Typography>
        </Paper>
    );
};

export default CloudNode;