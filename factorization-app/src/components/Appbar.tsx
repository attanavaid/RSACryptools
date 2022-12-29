import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles.css';

import {
  AppBar, 
  Container, 
  Typography, 
  Box, 
  Toolbar, 
  Menu,
  MenuItem, 
  IconButton
} from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';



const pages = {
  'RSA': <KeyIcon sx={{ fontSize: 22, paddingTop: '8px' }}/>, 
  'Factorization': <LockOpenIcon sx={{ fontSize: 22, paddingTop: '8px' }}/>
};

function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    //sx={{ bgcolor: "text.secondary" }}
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BuildCircleIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}/>
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
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RSACryptools
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {Object.keys(pages).map((k, index) => (
                <MenuItem key={index} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <NavLink to={'/' + k} id='NavLink'>
                      {Object.values(pages)[index]}{k}
                    </NavLink>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <BuildCircleIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            RSACryptools
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {Object.keys(pages).map((k, index) => (
              <MenuItem key={index} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">
                  <NavLink to={'/' + k} id='NavLink'>
                    {Object.values(pages)[index]}{k}
                  </NavLink>
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;