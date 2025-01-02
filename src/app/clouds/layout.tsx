import { Fab } from '@mui/material';
import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import CloudsContextProvider from '@/context/clouds/CloudsContextProvider';



export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CloudsContextProvider>
                <Fab
                    color='primary'
                    sx={{
                        position: 'fixed',
                        bottom: 32,
                        right: 32,
                    }}>
                    <AddIcon />
                </Fab>
                {children}
            </CloudsContextProvider>
        </div>
    );
}