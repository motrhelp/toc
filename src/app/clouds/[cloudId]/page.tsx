import EvaporatingCloud from '@/components/clouds/EvaporatingCloud';
import React from 'react';


const Page: React.FC = () => {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '84vh',
            }}
        >
            <EvaporatingCloud />
        </div>
    );
};

export default Page;