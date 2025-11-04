import React, { useEffect } from 'react';
import {
  Card, CardContent, Typography, Button, Box, Grid
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
  }, []);

  const handleRegister = (role) => {
    if (role === 'customer') {
      navigate('/signup');
    } else if (role === 'merchant') {
      navigate('/merchant-signup');
    } else if (role === 'aggregator') {
      navigate('/aggregator-signup');
    }
  };

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: '#fff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      py: 8,
    }}>
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          bgcolor: "#e23744",
          px: 6,
          py: 2.5,
          fontWeight: 900,
          borderRadius: 3,
          fontFamily: "'Montserrat', Arial, sans-serif",
          boxShadow: 2,
          mb: 5,
          letterSpacing: 1.5
        }}
      >
        Welcome to FUELnow
      </Typography>
      <Typography
        variant="h6"
        sx={{
          color: "#212121",
          fontWeight: 600,
          fontFamily: "'Montserrat', Arial, sans-serif",
          mb: 6,
          letterSpacing: 1,
          textAlign: "center",
        }}>
        Door Delivery of Fuel – Register as
      </Typography>
      <Grid container spacing={4} justifyContent="center" maxWidth="750px">
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 4, textAlign: "center" }}>
            <CardContent>
              <PersonIcon sx={{ fontSize: 48, color: "#e23744", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
                Customer
              </Typography>
              <Button
                onClick={() => handleRegister('customer')}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#e23744",
                  color: "#fff",
                  borderRadius: 99,
                  fontWeight: 700,
                  boxShadow: 1,
                  mt: 2,
                  fontFamily: "'Montserrat', Arial, sans-serif",
                  '&:hover': { bgcolor: "#b81a34" }
                }}
              >
                Register as Customer
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 4, textAlign: "center" }}>
            <CardContent>
              <StoreMallDirectoryIcon sx={{ fontSize: 48, color: "#e23744", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
                Merchant
              </Typography>
              <Button
                onClick={() => handleRegister('merchant')}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#e23744",
                  color: "#fff",
                  borderRadius: 99,
                  fontWeight: 700,
                  boxShadow: 1,
                  mt: 2,
                  fontFamily: "'Montserrat', Arial, sans-serif",
                  '&:hover': { bgcolor: "#b81a34" }
                }}
              >
                Register as Merchant
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ borderRadius: 4, boxShadow: 4, textAlign: "center" }}>
            <CardContent>
              <LocalShippingIcon sx={{ fontSize: 48, color: "#e23744", mb: 1 }} />
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: "#212121" }}>
                Fuel Aggregator
              </Typography>
              <Button
                onClick={() => handleRegister('aggregator')}
                fullWidth
                variant="contained"
                sx={{
                  bgcolor: "#e23744",
                  color: "#fff",
                  borderRadius: 99,
                  fontWeight: 700,
                  boxShadow: 1,
                  mt: 2,
                  fontFamily: "'Montserrat', Arial, sans-serif",
                  '&:hover': { bgcolor: "#b81a34" }
                }}
              >
                Register as Aggregator
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;
