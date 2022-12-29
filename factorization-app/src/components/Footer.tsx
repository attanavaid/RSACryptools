import React from 'react';

import { 
    Box,
    Typography
} from '@mui/material';

import BuildCircleIcon from '@mui/icons-material/BuildCircle';
//backgroundColor: '#f2f0f1'

const Footer = () => {
  return (
    <>
    <Box sx={{
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      minHeight: '10vh',
      padding: '20px',
      justifyContent: 'center',
      backgroundColor: '#1976d2',
      flexDirection: 'column',
      bottom: 0,
      left: 0,
      right: 0,
      position: 'fixed',
    }}>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          color: 'white',
          textDecoration: 'none',
          paddingBottom: '10px',
      }}>
        <BuildCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, mt: 0.5 }}/>
        RSACryptools
      </Typography>
      <Typography sx={{ opacity: '0.6' }}>
        &copy; 2023 RSACryptools. All rights reserved.
      </Typography>
    </Box>
    </>
  );
};

export default Footer;