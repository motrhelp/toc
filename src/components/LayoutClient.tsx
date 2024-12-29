"use client";

import {
    AppBar,
    Box,
    Container,
    CssBaseline,
    Toolbar,
    Typography,
} from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

// Example fonts from your snippet
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** 
 * You can tweak these colors to suit your design tastes.
 * #FFC107 is a typical "amber" in MUI, close to mustard yellow.
 * #000000 for black, #FFFFFF for white, etc.
 */
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFC107", 
      contrastText: "#000", // Black text on mustard background
    },
    secondary: {
      main: "#000000", // Pure black
      contrastText: "#FFFFFF", // White text on black
    },
    background: {
      default: "#FFFFFF", // White page background
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000", // Black text
      secondary: "#FFFFFF", // White text
    },
  },
  typography: {
    fontFamily: `${geistSans.style.fontFamily}, ${geistMono.style.fontFamily}, sans-serif`,
  },
});

interface LayoutClientProps {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouterCacheProvider>
        <Box
          className={`${geistSans.variable} ${geistMono.variable}`}
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          {/* Top Navigation Bar */}
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Clouds
              </Typography>
            </Toolbar>
          </AppBar>

          {/* Main content container (narrow, mobile-friendly) */}
          <Container
            component="main"
            maxWidth="md"
            sx={{ flex: 1, py: 2 }}
          >
            {children}
          </Container>
        </Box>
      </AppRouterCacheProvider>
    </ThemeProvider>
  );
}