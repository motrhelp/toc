'use client';

import React, { useContext, useEffect, useState } from 'react';
import EvaporatingCloud from '@/components/clouds/EvaporatingCloud';
import CloudsContext, { Cloud } from '@/context/clouds/CloudsContext';

interface PageProps {
  // In some Next.js 13 setups, `params` can be a Promise
  params: Promise<{ cloudId: string }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [cloudId, setCloudId] = useState<string | null>(null);

  // Since 'params' is a Promise, unwrap it here.
  useEffect(() => {
    params.then((resolvedParams) => {
      setCloudId(resolvedParams.cloudId);
    });
  }, [params]);

  const cloudsContext = useContext(CloudsContext);
  if (!cloudsContext) {
    return <div>CloudsContext not found</div>;
  }
  const { clouds, createCloud } = cloudsContext;

  // Wait until the param is fully resolved
  if (!cloudId) {
    return <div>Loading...</div>;
  }

  // Find the matching cloud
  let cloud: Cloud | undefined = clouds.find((c) => c.id === cloudId);

  // If not found, handle accordingly (e.g., show a 404 or create a new cloud)
  if (!cloud) {
    // TODO: Show a 404 page if desired
    cloud = createCloud();
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '84vh',
      }}
    >
      <EvaporatingCloud cloud={cloud} />
    </div>
  );
};

export default Page;