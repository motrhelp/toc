import React from 'react';
import { Grid, Box, Typography } from '@mui/material';

const tiles = [
    { text1: 'Player 1', text2: 'Player 2' },
    { text1: 'Team A', text2: 'Team B' },
    { text1: 'Hero', text2: 'Villain' },
    { text1: 'Red', text2: 'Blue' },
];

const TileGallery: React.FC = () => {
    return (
        <Box sx={{ padding: '20px' }}>
            <Grid container spacing={3}>
                {tiles.map((tile, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Box sx={styles.tile}>
                            <Typography sx={{ ...styles.text, ...styles.topLeft }}>
                                {tile.text1}
                            </Typography>
                            <Typography sx={{ ...styles.text, ...styles.bottomRight }}>
                                {tile.text2}
                            </Typography>
                            <Box
                                component="img"
                                src="/vs.png"
                                alt="VS"
                                sx={styles.vsImage}
                            />
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

const styles = {
    tile: {
        position: 'relative',
        width: '100%',
        paddingTop: '100%',
        background:
            `linear-gradient(
            to bottom right,
            #fcbe03 0%,
            #fcbe03 20%, /* Solid yellow till 45% */
            #0343fc 80%, /* Gradient band from 45% to 55% */
            #0343fc 100% /* Solid blue after 55% */
        )`,
        overflow: 'hidden',
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        textShadow: '0 1px 4px rgba(0, 0, 0, 0.6)',
        position: 'absolute',
    },
    topLeft: {
        top: '10px',
        left: '10px',
    },
    bottomRight: {
        bottom: '10px',
        right: '10px',
    },
    vsImage: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        width: '60px',
        height: '60px',
    },
};

export default TileGallery;
