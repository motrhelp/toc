"use client"

import React, { useState } from 'react';
import { Button, TextField, Typography, Alert } from '@mui/material';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/db/firebase';

const Page: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setIsLoggedIn(true);
            console.log(`Logged in as: ${email}`);
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError('Please enter your email to reset your password.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setError('Password reset email sent.');
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setEmail('');
        setPassword('');
        console.log(`Logged out.`);
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
                <Button variant="contained" onClick={handleLogout}>
                    Log out
                </Button>
            ) : (
                <>
                    <Typography variant="h3" gutterBottom>
                        Login
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" variant="contained">
                            Login
                        </Button>
                    </form>

                    <Button
                        style={{ marginTop: '1rem' }}
                        variant="text"
                        onClick={handleForgotPassword}
                    >
                        Forgot Password?
                    </Button>
                </>
            )}
        </div>
    );
};

export default Page;
