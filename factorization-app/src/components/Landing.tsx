import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Container, Typography, Box, Button, Grid, Card, CardContent, CardActions } from "@mui/material";

import KeyIcon from '@mui/icons-material/Key';
import LockOpenIcon from '@mui/icons-material/LockOpen';

function Landing() {
  const sectionItems = [
    {
      id: 1,
      title: 'RSA',
      subtitle: 'Key Generation',
      icon: <KeyIcon sx={{ fontSize: 22, paddingTop: '5px' }}/>,
      sentence: 'Generate an RSA public-private key pair within minutes',
    },
    {
      id: 2,
      title: 'Factorization',
      subtitle: "Key Breaking Using Pollard's Rho",
      icon: <LockOpenIcon sx={{ fontSize: 22, paddingTop: '5px' }}/>,
      sentence: 'Factor integers upto 100 bits within minutes using an interesting algorithm',
    }
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ pt: 5, pb: 2, textAlign: 'left', borderBottom: 'solid 1px lightgray' }}>
        Hello!
      </Typography>
      <CssBaseline/>
      <Typography sx={{ mt: 2 }}>
        Welcome to RSACryptools! This site contains a suite of tools that will 
        help you generate RSA keys and factor prime integers.<br/>
        If you like, you can view the source code on GitHub.
        <br/><br/>
        Check out the tools below to get started!
      </Typography>

      <Box sx={{ flexGrow: 1, minHeight: '400px', marginTop: '20px'}}>
        <Grid container spacing={4}>
          {sectionItems.map((item) => (
            <Grid
              item
              xs={12}
              md={6}
              minHeight={200}
              key={item.id}
            >
              <Card sx={{ minWidth: 275, padding: '10px' }} variant="outlined">
                <CardContent>
                  <Typography variant="h5" component="div">
                    {item.icon}{item.title}
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {item.subtitle}
                  </Typography>
                  <Typography>
                    {item.sentence}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">
                    <a href={'/'+item.title} id='LearnMoreLink'>Learn More</a>
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Landing;
