"use client";

import React, { useState, useEffect } from "react";
import EvaporatingCloud from "@/components/clouds/EvaporatingCloud";
import CloudsContext, { Cloud } from "@/context/clouds/CloudsContext";

interface PageProps {
  params: Promise<{ cloudId: string }>;
}

const Page: React.FC<PageProps> = ({ params }) => {
  const [cloudId, setCloudId] = useState<string | null>(null);
  const [cloud, setCloud] = useState<Cloud | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 1) Access the context
  const cloudsContext = React.useContext(CloudsContext);
  if (!cloudsContext) {
    return <div>CloudsContext not found</div>;
  }

  const { getCloudById } = cloudsContext;

  // 2) Unwrap `cloudId` from the route param (which is a promise)
  useEffect(() => {
    let isMounted = true;

    params
      .then(({ cloudId }) => {
        // Store the ID locally
        setCloudId(cloudId);

        // If there's no valid ID, show an error
        if (!cloudId) {
          setError("No Cloud ID provided.");
          return;
        }

        // 3) Use getCloudById to load from local state or fetch
        getCloudById(cloudId)
          .then((foundCloud) => {
            if (!isMounted) return;

            if (!foundCloud) {
              setError(`Could not find cloud with ID ${cloudId}`);
            } else {
              setCloud(foundCloud);
            }
          })
          .catch((err) => {
            console.error("Error fetching cloud:", err);
            if (isMounted) {
              setError("Error fetching cloud from the server");
            }
          });
      })
      .catch((err) => {
        console.error("Error resolving route params:", err);
        setError("Error resolving route params");
      });

    return () => {
      isMounted = false;
    };
  }, [params, getCloudById]);

  // 4) Render states
  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }
  if (!cloudId) {
    return <div>Loading Cloud ID...</div>;
  }
  if (!cloud) {
    return <div>Loading Cloud {cloudId}...</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "84vh",
      }}
    >
      <EvaporatingCloud cloud={cloud} />
    </div>
  );
};

export default Page;
