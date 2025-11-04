import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Divider
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';
import { GoogleLogin } from '@react-oauth/google';

function LoginPage() {
  const [showOTP, setShowOTP] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Request OTP from backend
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

  // Verify OTP with backend
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
        setMessage('Login successful!');
        // You can add redirect logic here
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
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff'
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
                  fullWidth
                  sx={{ mb: 2 }}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <Button fullWidth variant="contained" sx={{
                  bgcolor: '#e23744', color: '#fff', borderRadius: 99,
                  fontWeight: 700, fontSize: '1rem', py: 1.2,
                  '&:hover': { bgcolor: '#b81a34' }
                }} disabled={loading} onClick={requestOTP}>
                  {loading ? "Requesting..." : "Request OTP"}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  label="Enter OTP"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
                <Button fullWidth variant="contained" sx={{
                  bgcolor: '#e23744', color: '#fff', borderRadius: 99,
                  fontWeight: 700, fontSize: '1rem', py: 1.2,
                  '&:hover': { bgcolor: '#b81a34' }
                }} disabled={loading} onClick={handleLogin}>
                  {loading ? "Verifying..." : "Login"}
                </Button>
              </>
            )}
            {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <GoogleLogin
            onSuccess={credentialResponse => {
              alert('Google Auth Success!');
            }}
            onError={() => {
              alert('Google Auth Failed');
            }}
            width="100%"
            useOneTap
          />
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Don&apos;t have an account? <a href="/signup" style={{ color: '#e23744', textDecoration: 'none' }}>Sign Up</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default LoginPage;
