import React, { useState } from "react";
import {
  Dialog, DialogTitle, DialogContent, DialogActions,
  Box, TextField, Button, MenuItem, InputAdornment, Grid, Typography, Card, CardContent
} from "@mui/material";
import LocalGasStationOutlinedIcon from '@mui/icons-material/LocalGasStationOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import PinDropOutlinedIcon from '@mui/icons-material/PinDropOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import MapOutlinedIcon from '@mui/icons-material/MapOutlined';
import { useNavigate } from "react-router-dom";

const fuelTypes = [
  { value: 'petrol', label: 'Petrol' },
  { value: 'diesel', label: 'Diesel' }
];

const serviceProviders = [
  { value: 'hp', label: 'HP' },
  { value: 'indian-oil', label: 'Indian Oil' },
  { value: 'bharat-petroleum', label: 'Bharat Petroleum' },
  { value: 'shell', label: 'Shell' },
  { value: 'nayara', label: 'Nayara' },
  { value: 'reliance', label: 'Reliance' }
];

function calculatePrice({ fuelType, quantity, distance }) {
  let pricePerLitre = 0;
  if (fuelType === 'petrol') pricePerLitre = 102.98;
  if (fuelType === 'diesel') pricePerLitre = 95;
  const fuelTotal = quantity && pricePerLitre ? Number(quantity) * pricePerLitre : 0;

  let deliveryFee = 0;
  if (distance > 10) deliveryFee = 45;
  else if (distance > 5) deliveryFee = 35;

  return {
    fuelTotal,
    deliveryFee,
    grandTotal: fuelTotal + deliveryFee
  };
}

export default function OrderForm({ open, onClose }) {
  const [fuelType, setFuelType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [distance, setDistance] = useState("");
  const [date, setDate] = useState("");
  const [pincode, setPincode] = useState("");
  const [provider, setProvider] = useState("");
  const [address, setAddress] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const price = calculatePrice({
    fuelType,
    quantity: Number(quantity),
    distance: Number(distance)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fuelType || !quantity || !distance || !date || !pincode || !provider || !address) {
      setErrorMsg("Please fill all required fields to continue.");
      return;
    }
    if (pincode.length !== 6) {
      setErrorMsg("Pincode must be exactly 6 digits.");
      return;
    }
    setErrorMsg("");
    // Grant payment access after successful order
    window.sessionStorage.setItem("orderPlaced", "true");
    navigate("/payment");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: 700, color: "#e23744", textAlign: "center" }}>
        Place Your Order
      </DialogTitle>
      <DialogContent sx={{ pb: 1 }}>
        <Grid container spacing={2} alignItems="stretch">
          {/* Order Form */}
          <Grid item xs={12} md={7}>
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
              onSubmit={handleSubmit}
            >
              <TextField
                select required label="Fuel Type"
                value={fuelType}
                onChange={e => setFuelType(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalGasStationOutlinedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              >
                {fuelTypes.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
              <TextField
                required label="Quantity" type="number"
                placeholder="e.g. 10"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
                fullWidth
                InputProps={{
                  endAdornment: <InputAdornment position="end">Ltr</InputAdornment>
                }}
              />
              <TextField
                required type="date" label="Delivery Date"
                InputLabelProps={{ shrink: true }}
                value={date}
                onChange={e => setDate(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRangeOutlinedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                required label="Pincode" type="number"
                placeholder="Enter area pincode"
                value={pincode}
                onChange={e => setPincode(e.target.value.slice(0, 6))}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PinDropOutlinedIcon color="action" />
                    </InputAdornment>
                  )
                }}
                inputProps={{ maxLength: 6 }}
              />
              <TextField
                required label="Distance (km)" type="number"
                placeholder="Enter distance to your address"
                value={distance}
                onChange={e => setDistance(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MapOutlinedIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: <InputAdornment position="end">km</InputAdornment>
                }}
              />
              <TextField
                select required label="Service Provider"
                value={provider}
                onChange={e => setProvider(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalShippingOutlinedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              >
                {serviceProviders.map(option => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </TextField>
              <TextField
                required label="Delivery Address"
                placeholder="Enter delivery address"
                value={address}
                onChange={e => setAddress(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnOutlinedIcon color="action" />
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          </Grid>
          {/* Price Calculation Box */}
          <Grid item xs={12} md={5}>
            <Card
              sx={{
                height: "100%",
                ml: { md: 2 },
                mt: { xs: 3, md: 0 },
                bgcolor: "#fff9f9",
                boxShadow: 3,
                borderRadius: 3,
                display: "flex", flexDirection: "column", justifyContent: "center"
              }}
            >
              <CardContent>
                <Typography variant="h6" sx={{ color: "#e23744", mb: 2, fontWeight: 600 }}>
                  Price Calculation
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Fuel Price</Typography>
                  <Typography>
                    {fuelType
                      ? `${quantity || 0} x ₹${fuelType === 'petrol' ? '102.98' : fuelType === 'diesel' ? '95.00' : '0.00'}`
                      : '--'}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Subtotal</Typography>
                  <Typography>₹{price.fuelTotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Delivery Fee</Typography>
                  <Typography>₹{price.deliveryFee}</Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2, fontWeight: 700 }}>
                  <Typography>Total</Typography>
                  <Typography sx={{ color: "#e23744", fontWeight: 700 }}>₹{price.grandTotal.toFixed(2)}</Typography>
                </Box>
                <Typography variant="caption" sx={{ mt: 1, display: "block" }}>
                  * Price includes fuel and delivery. Distance-based delivery auto-calculates.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2, gap: 1, flexDirection: 'column', alignItems: 'stretch' }}>
        {errorMsg && (
          <Typography sx={{ color: "#e23744", fontWeight: 600, mb: 1, textAlign: 'center' }}>
            {errorMsg}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          sx={{
            background: "#e23744",
            fontWeight: 700,
            borderRadius: 3,
            px: 3,
            boxShadow: "none"
          }}
          fullWidth
          onClick={handleSubmit}
        >
          SUBMIT ORDER
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          sx={{
            borderColor: "#e23744",
            color: "#e23744",
            borderRadius: 3,
            px: 3,
            fontWeight: 600
          }}
          fullWidth
        >
          CANCEL
        </Button>
      </DialogActions>
    </Dialog>
  );
}
