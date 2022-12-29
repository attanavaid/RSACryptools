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
  InputLabel, 
  FormControl, 
  MenuItem, 
  SelectChangeEvent,
  Grid, 
  CardHeader, 
  Card, 
  CardContent, 
  IconButton, 
  Snackbar
} from "@mui/material";

import Select from '@mui/material/Select';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function RSA() {
  const [size, setSize] = useState<string>('');
  const [genKeyBtnDisabled, setGenKeyBtnDisabled] = useState<boolean>(true);
  const [backdrop, setBackdrop] = React.useState<boolean>(false);
  const [copyPrivateKeyBtnDisabled, setCopyPrivateKeyBtnDisabled] = useState<boolean>(true);
  const [copyPublicKeyBtnDisabled, setCopyPublicKeyBtnDisabled] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [privateKey, setPrivateKey] = useState<string>('None');
  const [publicKey, setPublicKey] = useState<string>('None');
  const [time, setTime] = useState<string>('');

  const copyPrivateKeyOnClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(privateKey);
  };

  const copyPublicKeyOnClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(publicKey);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSize(event.target.value as string);
    setGenKeyBtnDisabled(!event.target.value);
  };

  const genKeyPairOnClick = () => {
    setBackdrop(true);

    fetch('http://localhost:5000/keygen', {
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
      setPrivateKey(data['private_key']); 
      setPublicKey(data['public_key']); 
      setTime('Generated in ' + data['time'] + ' seconds');
      setBackdrop(false);
      setCopyPrivateKeyBtnDisabled(false);
      setCopyPublicKeyBtnDisabled(false);
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
        RSA
      </Typography>
      <CssBaseline/>
      <Typography sx={{ mt: 2 }}> 
        RSA is a public key cryptography algorithm first introduced in 1978. It
        is an interesting mathematical problem because the algorithm relies on
        principles in number theory, making it an application of “pure” math.
        It is also interesting because despite its simplicity, no one has managed 
        to prove that RSA or the underlying integer factorization problem cannot be cracked. 
        RSA cryptography has become the standard crypto-system in many areas due to the 
        great demand for encryption and certification on the internet. The basis for RSA 
        cryptography is the apparent difficulty in factoring large semi-primes. Although there
        are many algorithms that can factor very large numbers of a certain
        form, a general purpose algorithm is still unknown.
      </Typography>

      <Box sx={{ mt: 3, minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel>Key Length</InputLabel>
          <Select
            value={size}
            label="Key Length"
            sx={{ paddingRight: '200px' }}
            onChange={handleChange}
          >
            <MenuItem value={64}>64</MenuItem>
            <MenuItem value={128}>128</MenuItem>
            <MenuItem value={256}>256</MenuItem>
            <MenuItem value={512}>512</MenuItem>
            <MenuItem value={1024}>1024</MenuItem>
            <MenuItem value={2048}>2048</MenuItem>
            <MenuItem value={4096}>4096</MenuItem>
          </Select>
        </FormControl>
        <Button
          disabled={genKeyBtnDisabled}
          variant="contained"
          color="primary"
          size="large"
          sx={{ my: 1.5 }}
          onClick={genKeyPairOnClick}
        >
          Generate Key Pair
        </Button>
      </Box>

      <Box sx={{ flexGrow: 1, minHeight: '400px', marginTop: '20px'}}>
        <Grid container spacing={{ xs: 1, md: 2 }} columns={{ xs: 6, sm: 6, md: 12 }}>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275, my: 1.5, padding: '10px' }} variant="outlined">
              <CardHeader
                title="Private Key"
                subheader={time}
                sx={{ borderBottom: 'solid 1px lightgray' }}
                action={
                  <IconButton
                    disabled={copyPrivateKeyBtnDisabled}
                    onClick={copyPrivateKeyOnClick}
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
                <Typography color="text.secondary" sx={{ fontSize: '12px', wordWrap: 'break-word' }}>
                  <i>{privateKey}</i>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6}>
            <Card sx={{ minWidth: 275, my: 1.5, padding: '10px' }} variant="outlined">
              <CardHeader
                title="Public Key"
                subheader={time}
                sx={{ borderBottom: 'solid 1px lightgray' }}
                action={
                  <IconButton
                    disabled={copyPublicKeyBtnDisabled}
                    onClick={copyPublicKeyOnClick}
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
                <Typography color="text.secondary" sx={{ fontSize: '12px', wordWrap: 'break-word' }}>
                  <i>{publicKey}</i>
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

export default RSA;