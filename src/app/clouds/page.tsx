"use client";

import { useContext } from "react";
import { Grid, Box, Typography } from "@mui/material";
import CloudsContext from "@/context/clouds/CloudsContext";

const AllCloudsGallery: React.FC = () => {
    const { clouds } = useContext(CloudsContext) || {};

    if (!clouds || clouds.length === 0) {
        return <Typography>No clouds available. Add some clouds to get started!</Typography>;
    } else {
        console.log("CLOUDS", clouds);
    }

    return (
        <Grid container spacing={3}>
            {clouds.map((cloud) => (
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
    );
};

const styles = {
    tile: {
        position: "relative",
        width: "100%",
        paddingTop: "100%",
        background:
            `linear-gradient(
      to bottom right,
      #fcbe03 0%,
      #fcbe03 20%,
      #0343fc 80%,
      #0343fc 100%
    )`,
        overflow: "hidden",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    text: {
        color: "#fff",
        fontWeight: "bold",
        textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
        position: "absolute",
    },
    topLeft: {
        top: "10px",
        left: "10px",
    },
    bottomRight: {
        bottom: "10px",
        right: "10px",
    },
    vsImage: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10,
        width: "60px",
        height: "60px",
    },
};

export default AllCloudsGallery;
