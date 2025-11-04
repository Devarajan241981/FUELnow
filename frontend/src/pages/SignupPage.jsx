import React, { useState } from 'react';
import {
  Box, Card, CardContent, Typography, TextField, Button, Divider
} from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

function SignupPage({ role }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOTP] = useState('');
  const [kycCode, setKycCode] = useState('');
  const [pan, setPan] = useState('');
  const [gstOrLicence, setGstOrLicence] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Dynamic placeholders/labels per role
  const isMerchant = role === "merchant";
  const isAggregator = role === "aggregator";

  const kycLabel = isMerchant ? "Vendor Code" : isAggregator ? "Payer Code" : "";
  const kycPlaceholder = isMerchant ? "Enter your vendor code" : isAggregator ? "Enter your payer code" : "";
  const gstOrLicenceLabel = isMerchant ? "GST Number" : isAggregator ? "Licence Number" : "";
  const gstOrLicencePlaceholder = isMerchant ? "e.g 12AAAPL1234C1Z1" : isAggregator ? "Enter your Licence Number" : "";

  // Validate extra fields
  const isKYCRequired = isMerchant || isAggregator;

  function validateKycFields() {
    if (!kycCode.trim() || !pan.trim() || !gstOrLicence.trim()) {
      return "All KYC fields are required.";
    }
    if (!/^([A-Z]{5}[0-9]{4}[A-Z])$/.test(pan.trim().toUpperCase())) {
      return "Invalid PAN format.";
    }
    // Merchant: Validate GST, Aggregator: require only present for Licence (skip format)
    if (isMerchant && !/^([0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1})$/.test(gstOrLicence.trim().toUpperCase())) {
      return "Invalid GST format.";
    }
    if (isAggregator && gstOrLicence.trim().length < 4) {
      return "Licence Number is required for Aggregator.";
    }
    return "";
  }

  // Request OTP
  const requestOTP = async () => {
    setLoading(true);
    setMessage('');
    if (!name.trim()) {
      setMessage('Please enter your full name');
      setLoading(false);
      return;
    }
    if (!/^\d{10}$/.test(phone)) {
      setMessage('Enter a valid 10-digit phone number');
      setLoading(false);
      return;
    }
    if (isKYCRequired) {
      const err = validateKycFields();
      if (err) {
        setMessage(err);
        setLoading(false);
        return;
      }
    }
    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, name })
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

  // Complete Signup (with OTP + KYC if needed)
  const handleSignup = async () => {
    setLoading(true);
    setMessage('');
    if (!/^\d{4,6}$/.test(otp)) {
      setMessage('Please enter a valid OTP.');
      setLoading(false);
      return;
    }
    if (isKYCRequired) {
      const err = validateKycFields();
      if (err) {
        setMessage(err);
        setLoading(false);
        return;
      }
    }
    try {
      const payload = { name, phone, otp };
      if (isKYCRequired) {
        payload.kycCode = kycCode;
        payload.pan = pan.toUpperCase();
        payload.gstOrLicence = gstOrLicence.toUpperCase();
      }
      const endpoint =
        isMerchant ? '/api/merchant-signup'
        : isAggregator ? '/api/aggregator-signup'
        : '/api/verify-otp';
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('isLoggedIn', 'true');
        if (!isMerchant && !isAggregator) {
          localStorage.setItem('role', 'user');
          setMessage('Sign Up successful!');
          navigate("/dashboard");
        } else if (isMerchant) {
          localStorage.setItem('role', 'merchant');
          setMessage('Sign Up successful as Merchant!');
          navigate("/merchant-dashboard");
        } else if (isAggregator) {
          localStorage.setItem('role', 'aggregator');
          setMessage('Sign Up successful as Aggregator!');
          // navigate('/aggregator-dashboard'); // for future
        }
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (err) {
      setMessage('Network error, try again!');
    }
    setLoading(false);
  };

  const handleGoogleLoginSuccess = () => {
    try {
      localStorage.setItem('isLoggedIn', 'true');
      if (!isMerchant && !isAggregator) {
        localStorage.setItem('role', 'user');
        navigate("/dashboard");
      } else if (isMerchant) {
        localStorage.setItem('role', 'merchant');
        navigate("/merchant-dashboard");
      } else if (isAggregator) {
        localStorage.setItem('role', 'aggregator');
        // navigate("/aggregator-dashboard"); // for future
      }
    } catch (e) {
      alert('Google Auth processing error!');
    }
  };

  // Role-aware login link
  let loginHref = "/login";
  if (isMerchant) loginHref = "/merchant-login";
  if (isAggregator) loginHref = "/aggregator-login"; // for future

  return (
    <Box sx={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#fff'
    }}>
      <Card sx={{
        minWidth: 350, maxWidth: 400, borderRadius: 4, boxShadow: 6
      }}>
        <CardContent>
          <Typography variant="h5" align="center" sx={{ mt: 2, color: '#e23744', fontWeight: 700 }}>
            Sign Up
          </Typography>
          <Box sx={{ mt: 3 }}>
            {/* Name/Phone always visible */}
            <TextField
              label="Full Name"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={showOTP}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              sx={{ mb: 2 }}
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
              inputProps={{ maxLength: 10 }}
              disabled={showOTP}
            />
            {/* Merchant & Aggregator fields show inline */}
            {isKYCRequired && (
              <>
                <TextField
                  label={kycLabel}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={kycCode}
                  onChange={(e) => setKycCode(e.target.value)}
                  placeholder={kycPlaceholder}
                  disabled={showOTP}
                />
                <TextField
                  label="PAN Number"
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={pan}
                  onChange={(e) => setPan(e.target.value.toUpperCase())}
                  placeholder="e.g AAAPL1234C"
                  inputProps={{ maxLength: 10 }}
                  disabled={showOTP}
                />
                <TextField
                  label={gstOrLicenceLabel}
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={gstOrLicence}
                  onChange={(e) => setGstOrLicence(e.target.value.toUpperCase())}
                  placeholder={gstOrLicencePlaceholder}
                  inputProps={{ maxLength: isMerchant ? 15 : 25 }}
                  disabled={showOTP}
                />
              </>
            )}
            {/* OTP entry shows when requested */}
            {showOTP &&
              <TextField
                label="Enter OTP"
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
                value={otp}
                onChange={(e) => setOTP(e.target.value.replace(/[^0-9]/g, ''))}
                inputProps={{ maxLength: 6 }}
              />
            }
            <Button fullWidth variant="contained" sx={{
              bgcolor: '#e23744', color: '#fff', borderRadius: 99,
              fontWeight: 700, fontSize: '1rem', py: 1.2,
              '&:hover': { bgcolor: '#b81a34' }
            }}
              disabled={loading}
              onClick={showOTP ? handleSignup : requestOTP}
            >
              {showOTP ? (loading ? "Verifying..." : "Sign Up") : (loading ? "Requesting..." : "Request OTP")}
            </Button>
            {message && <Typography color="error" sx={{ mt: 2 }}>{message}</Typography>}
          </Box>
          <Divider sx={{ my: 3 }}>OR</Divider>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => {
              alert('Google Auth Failed');
            }}
            width="100%"
            useOneTap
          />
          <Typography variant="body2" align="center" sx={{ mt: 2 }}>
            Already have an account? <a href={loginHref} style={{ color: '#e23744', textDecoration: 'none' }}>Login</a>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default SignupPage;
