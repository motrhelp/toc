'use client';

import useCloudsContext from '@/context/clouds/useCloudsContext';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AddCloudFab: React.FC = () => {
    const { createCloud } = useCloudsContext();
    const router = useRouter();

    const handleAddCloud = () => {
        const newCloud = createCloud();
        router.push('/clouds/' + newCloud.id);
    };

    return (
        <div>
            <Fab
                color='primary'
                sx={{
                    position: 'fixed',
                    bottom: 32,
                    right: 32,
                }}
                onClick={handleAddCloud}>
                <AddIcon />
            </Fab>
        </div>
    );
};

export default AddCloudFab;
