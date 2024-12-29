'use client';

import { Paper, TextField } from '@mui/material';
import React, { useState } from 'react';

const CloudNode: React.FC<{ text: string; onTextChange?: (newText: string) => void }> = ({
    text,
    onTextChange,
}) => {
    const [editableText, setEditableText] = useState(text);

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newText = e.target.value;
        setEditableText(newText);
        if (onTextChange) {
            onTextChange(newText);
        }
    };

    return (
        <Paper
            sx={{
                aspectRatio: '1',
                display: 'flex',
                bgcolor: 'primary.main',
                overflow: 'hidden',
                maxHeight: '210px',
            }}
        >
            <TextField
                value={editableText}
                onChange={handleTextChange}
                multiline
                fullWidth
                color='secondary'
                sx={{
                    flex: 1,
                    // Make the root fill the Paper and enable flex layout
                    '& .MuiInputBase-root': {
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',      // vertically center text
                        justifyContent: 'center',  // horizontally center text
                    },
                    // Optionally center-align the text in each line
                    '& .MuiInputBase-input': {
                        textAlign: 'center',
                    },
                    overflow: 'scroll',
                }}
            />
        </Paper>
    );
};

export default CloudNode;
