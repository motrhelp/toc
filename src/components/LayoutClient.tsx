"use client";

import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
  Toolbar
} from "@mui/material";
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";

// Example fonts from your snippet
import { Geist, Geist_Mono } from "next/font/google";
import { useRouter } from "next/navigation";

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

function handleMenuChoice(popupState: any, router: any, path: string) {
  popupState.close();
  router.push(path);
}

export default function LayoutClient({ children }: LayoutClientProps) {
  const router = useRouter();

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
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                      Clouds Menu
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                      <MenuItem onClick={() => handleMenuChoice(popupState, router, "/clouds/")}>Make a cloud</MenuItem>
                      <MenuItem onClick={() => handleMenuChoice(popupState, router, "/listOfClouds/")}>List of clouds</MenuItem>
                      <MenuItem onClick={() => handleMenuChoice(popupState, router, "/login/")}>Login/Logout</MenuItem>
                    </Menu>
                  </React.Fragment>
                )}
              </PopupState>
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
