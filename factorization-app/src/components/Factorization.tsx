import React from 'react';
import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

import { 
  Container, 
  Typography,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Snackbar,
  TextField
} from "@mui/material";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function Factorization() {
  const [size, setSize] = useState<string>('');
  const [backdrop, setBackdrop] = React.useState<boolean>(false);
  const [factorBtnDisabled, setFactorBtnDisabled] = useState<boolean>(true);
  const [copyBtnDisabled, setCopyBtnDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [fact, setFact] = useState<string>('Unknown');
  const [time, setTime] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as string);
    setFactorBtnDisabled(!event.target.value);
  };

  const copyToKeyboardOnClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(fact);
  };

  const factorOnClick = () => {
    setBackdrop(true);
    fetch('http://localhost:5000/factor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        content:size
      })
    })
    .then(response => { return response.json() })
    .then(data => {
      console.log(data);
      setFact(data['factor']);
      setTime('Found in ' + data['time'] + ' seconds');
      setBackdrop(false);
      setCopyBtnDisabled(false);
    })
    .catch(error => console.log(error));
  };

  return (
    <Container maxWidth="xl">
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}
      >
        <CircularProgress color="inherit"/>
      </Backdrop>
      <Typography variant="h4" sx={{ pt: 5, pb: 2, textAlign: 'left', borderBottom: 'solid 1px lightgray' }}>
        Factorization
      </Typography>
      <CssBaseline/>
      <Typography sx={{ mt: 2 }}> 
      Pollard's rho algorithm is an algorithm for integer factorization. 
      It was invented by John Pollard in 1975. It uses only a small amount 
      of space, and its expected running time is proportional to the square 
      root of the smallest prime factor of the composite number being factorized.
      The algorithm is used to factorize a number n = pq, where p is a non-trivial factor.<br/>
      This algorithm is best for prime integers that are 100 bits or less, as the algorithm takes
      about 6 hours to factor 140 bits and about 6 days to factor 160 bits.
      </Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <TextField 
          fullWidth
          margin="normal"
          type="number"
          variant="outlined"
          label="Number to factor"
          id="noToFac"
          value={size}
          onChange={handleChange}
        />
        <Button
          disabled={factorBtnDisabled}
          variant="contained"
          color="primary"
          size="large"
          sx={{ my: 1.5 }}
          onClick={factorOnClick}
        >
          Factor
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, minHeight: '400px', marginTop: '20px'}}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2, sm: 3, md: 4 }}>
          <Grid item xs={12}>
            <Card sx={{ minWidth: 275, my: 1.5, padding: '10px' }} variant="outlined">
              <CardHeader
                title="Factor"
                subheader={time}
                sx={{ borderBottom: 'solid 1px lightgray' }}
                action={
                  <IconButton
                    disabled={copyBtnDisabled}
                    onClick={copyToKeyboardOnClick}
                    color="primary"
                  >
                    <ContentCopyIcon/>
                  </IconButton>
                }
              />
              <Snackbar
                message="Copied to clipboard!"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                autoHideDuration={2000}
                onClose={() => setOpen(false)}
                open={open}
              />
              <CardContent>
                <Typography color="text.secondary">
                  <b>{fact}</b>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ marginBottom: '100px' }}></Box>
    </Container>
  );
}

export default Factorization;