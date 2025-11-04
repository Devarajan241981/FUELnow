import React from "react";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import StorefrontIcon from '@mui/icons-material/Storefront';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useNavigate } from "react-router-dom";

export default function MerchantDashboard() {
  const navigate = useNavigate();

  return (
    <Box sx={{ background: "#f7f9fa", minHeight: "100vh", p: 4 }}>
      <Typography variant="h4" fontWeight={700} color="#b81a34" mb={2}>
        Merchant Dashboard
      </Typography>
      <Typography fontSize={17} color="text.secondary" mb={4}>
        Welcome! Here you can manage orders, see your sales summary, and track analytics.
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <StorefrontIcon sx={{ color: "#e23744", fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography fontWeight={700}>My Store</Typography>
                  <Typography color="text.secondary" fontSize={15}>Profile & stats</Typography>
                </Box>
              </Box>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }} color="error">
                Store Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ShoppingCartIcon sx={{ color: "#e23744", fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography fontWeight={700}>Orders</Typography>
                  <Typography color="text.secondary" fontSize={15}>Incoming orders</Typography>
                </Box>
              </Box>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 2, bgcolor: "#e23744" }}
                onClick={() => navigate("/merchant-dashboard/orders")}
              >
                View Orders
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3, boxShadow: 4 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <AnalyticsIcon sx={{ color: "#e23744", fontSize: 40, mr: 2 }} />
                <Box>
                  <Typography fontWeight={700}>Sales Analytics</Typography>
                  <Typography color="text.secondary" fontSize={15}>Performance insights</Typography>
                </Box>
              </Box>
              <Button fullWidth variant="outlined" sx={{ mt: 2 }} color="error">
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box mt={6}>
        <Typography variant="h6" fontWeight={600} mb={2}>Quick Actions</Typography>
        <Button variant="contained" sx={{ mr: 2, bgcolor: "#e23744", borderRadius: 3 }}>
          + Add Product
        </Button>
        <Button variant="outlined" color="error" sx={{ borderRadius: 3 }}>
          Withdraw Earnings
        </Button>
      </Box>
    </Box>
  );
}
