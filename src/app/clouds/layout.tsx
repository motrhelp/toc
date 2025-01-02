import AddCloudFab from '@/components/clouds/AddCloudFab';
import CloudsContextProvider from '@/context/clouds/CloudsContextProvider';
import React from 'react';



export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <CloudsContextProvider>
                <AddCloudFab />
                {children}
            </CloudsContextProvider>
        </div>
    );
}