//
// Copyright © Steelcut Software Inc.
//
import { createTheme  } from '@mui/material/styles';

export const myTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#fff',
      paper: '#fff',
    }
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: "linear-gradient(180deg, #eeeeee 0%, #dddddd 100%)"
        }
      }
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          border: 'none'
        },
      },
    },
  },
});
