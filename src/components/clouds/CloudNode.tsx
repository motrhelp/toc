'use client';

import { Paper, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface CloudNodeProps {
  text: string;
  onTextChange?: (newText: string) => void;
}

const CloudNode: React.FC<CloudNodeProps> = ({ text, onTextChange }) => {
  const [editableText, setEditableText] = useState(text);

  // Access the theme to use breakpoints
  const theme = useTheme();
  // Check if screen width matches 'sm' breakpoint or below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setEditableText(newText);
    onTextChange?.(newText);
  };

  return (
    <Paper
      sx={{
        aspectRatio: '1',
        display: 'flex',
        bgcolor: 'primary.main',
        maxHeight: '210px',
      }}
    >
      <TextField
        value={editableText}
        onChange={handleTextChange}
        multiline
        fullWidth
        color="secondary"
        // Use a smaller maxRows on small screens, otherwise larger
        maxRows={isSmallScreen ? 4 : 8}
        sx={{
          flex: 1,
          '& .MuiInputBase-root': {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiInputBase-input': {
            textAlign: 'center',
          },
        }}
      />
    </Paper>
  );
};

export default CloudNode;
