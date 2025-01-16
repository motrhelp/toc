"use client";

import React, { useState, useEffect } from 'react';
import { Grid, Box, Typography, CircularProgress } from '@mui/material';

type Cloud = {
    A: string;
    B: string;
    C: string;
    D: string;
    D_: string;
    id: string;
};

const AllCloudsGallery: React.FC = () => {
    const [clouds, setClouds] = useState<Cloud[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchClouds = async () => {
            try {
                const user = 'someUserId'; // Replace with the actual user ID
                const response = await fetch(`/api/clouds?user=${user}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data: Cloud[] = await response.json();
                setClouds(data);
            } catch (error) {
                console.error('Error fetching clouds:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchClouds();
    }, []);

    return (
        <Box sx={{ padding: '20px' }}>
            {loading ? (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Grid container spacing={3}>
                    {clouds.map((cloud, index) => (
                        <Grid item xs={12} sm={6} md={4} key={cloud.id}>
                            <Box sx={styles.tile}>
                                <Typography sx={{ ...styles.text, ...styles.topLeft }}>
                                    {cloud.D}
                                </Typography>
                                <Typography sx={{ ...styles.text, ...styles.bottomRight }}>
                                    {cloud.D_}
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
            )}
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

export default AllCloudsGallery;
