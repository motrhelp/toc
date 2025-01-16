'use client';

import { Paper, TextField, useMediaQuery, useTheme } from '@mui/material';
import React, { useState } from 'react';

interface CloudNodeProps {
  text?: string;
  placeholder?: string;
  onTextChange?: (newText: string) => void;
}

const CloudNode: React.FC<CloudNodeProps> = ({
  text = '',
  placeholder = '',
  onTextChange,
}) => {
  // Manage display text and whether we’re currently showing the placeholder
  const [editableText, setEditableText] = useState(text);
  const [isPlaceholder, setIsPlaceholder] = useState(!text);

  // Access the theme to use breakpoints
  const theme = useTheme();
  // Check if screen width matches 'sm' breakpoint or below
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFocus = () => {
    // If we’re focusing while showing placeholder text, clear it out
    if (isPlaceholder) {
      setEditableText('');
      setIsPlaceholder(false);
    }
  };

  const handleBlur = () => {
    // If user leaves node and typed nothing, revert to placeholder
    if (editableText.trim() === '') {
      setEditableText('');
      setIsPlaceholder(true);
    }
  };

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
        value={isPlaceholder ? placeholder : editableText}
        onChange={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
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
            // Make the placeholder text look lighter if needed
            color: isPlaceholder ? 'rgba(0,0,0,0.5)' : 'inherit',
          },
        }}
      />
    </Paper>
  );
};

export default CloudNode;
