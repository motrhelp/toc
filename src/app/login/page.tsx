"use client"
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const Page: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: Add your logic to handle the username login
        setIsLoggedIn(true);
        console.log(`Username: ${username}`);
    };

    function handleLogout() {
        console.log(`Logout for: ${username}`);
        setUsername("");
        setIsLoggedIn(false);
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '84vh',
            }}
        >
            {isLoggedIn ? (
                <Button
                    variant="contained"
                    onClick={handleLogout}>
                    Log out {username}
                </Button>
            ) : (
                <>
                    <Typography variant="h3" gutterBottom>
                        Login
                    </Typography>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <TextField
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </form>
                </>
            )}
        </div>
    );
};

export default Page;
