'use client';

import { Card, CardActionArea, CardContent, Typography } from '@mui/material';
import React from 'react';

// Utility function to calculate dynamic font size based on screen width
const calculateFontSize = (width: number): string => {
    const baseFontSize = 16; // Base font size in px
    const scaleFactor = 0.02; // Adjust this factor to control the scaling
    const calculatedSize = baseFontSize + width * scaleFactor;
    return `${Math.min(Math.max(calculatedSize, 12), 48)}px`; // Clamp between 12px and 48px
};

const CloudNode: React.FC<{ text: string }> = ({ text }) => {
    // Get screen width dynamically
    const [windowWidth, setWindowWidth] = React.useState<number>(window.innerWidth);

    React.useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const fontSize = calculateFontSize(windowWidth);

    return (
        <Card
            style={{
                aspectRatio: '2 / 1',
            }}
            onClick={() => {}}
        >
            <CardActionArea>
                <CardContent
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        aspectRatio: '2 / 1',
                    }}
                >
                    <Typography variant="h4" style={{ fontSize }}>
                        {text}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default CloudNode;