import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Divider
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const requestOTP = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (data.success) {
        setShowOTP(true);
        setMessage('OTP sent! Please check your mobile.');
      } else {
        setMessage(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      setMessage('Network error, try again!');
    }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('role', 'user');
        setMessage('Login successful!');
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setMessage(data.message || 'OTP verification failed');
      }
    } catch (err) {
      setMessage('Network error, try again!');
    }
    setLoading(false);
  };

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff', position: 'relative'
    }}>
      <Card sx={{
        minWidth: 350, maxWidth: 380, borderRadius: 4, boxShadow: 6
      }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ mt: 2, color: '#e23744', fontWeight: 700 }}>
            Login
          </Typography>
          <Box sx={{ mt: 3 }}>
            {!showOTP ? (
              <>
                <TextField
                  label="Phone Number"
                  variant="outlined"
                  type="tel"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
                  inputProps={{ maxLength: 10 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#e23744',
                    color: '#fff',
                    borderRadius: 99,
                    fontWeight: 700,
                    fontSize: '1rem',
                    py: 1.2,
                    '&:hover': { bgcolor: '#b81a34' }
                  }}
                  disabled={loading || phone.length !== 10}
                  onClick={requestOTP}
                >
                  {loading ? "Requesting..." : "Request OTP"}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  type="number"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={otp}
                  onChange={(e) => setOTP(e.target.value.replace(/[^0-9]/g, ''))}
                  inputProps={{ maxLength: 6 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  sx={{
                    bgcolor: '#e23744',
                    color: '#fff',
                    borderRadius: 99,
                    fontWeight: 700,
                    fontSize: '1rem',
                    py: 1.2,
                    '&:hover': { bgcolor: '#b81a34' }
                  }}
                  disabled={loading || otp.length < 4}
                  onClick={handleLogin}
                >
                  {loading ? "Verifying..." : "Login"}
                </Button>
              </>
            )}
            {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <GoogleLogin
            onSuccess={credentialResponse => {
              localStorage.setItem('isLoggedIn', 'true');
              localStorage.setItem('role', 'user');
              navigate("/dashboard");
            }}
            onError={() => {
              alert('Google Auth Failed');
            }}
            width="100%"
            useOneTap
          />
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don't have an account? <a href="/signup" style={{ color: '#e23744', textDecoration: 'none' }}>Sign Up</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
