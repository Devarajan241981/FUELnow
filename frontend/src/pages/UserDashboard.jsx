import React, { useState, useEffect } from "react";
import {
  AppBar, Toolbar, Typography, Button, Menu, MenuItem, Badge, Box, Grid, Card, CardContent, Drawer
} from "@mui/material";
import ShoppingCartOutlined from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ArrowDropDownOutlined from '@mui/icons-material/ArrowDropDownOutlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import CardGiftcardOutlined from '@mui/icons-material/CardGiftcardOutlined';
import { useNavigate } from "react-router-dom";

// Dynamic imports
let OrderForm, OrderHistory;
try {
  OrderForm = require("../components/ModalForms/OrderForm").default;
} catch {
  OrderForm = ({ open, onClose }) => null;
}
try {
  OrderHistory = require("../components/ModalForms/OrderHistory").default;
} catch {
  OrderHistory = () => <Typography>No Order History available.</Typography>;
}

const navbarBlack = "#111";
const redColor = "#e23744";
const zomatoRed = "#e23744";
const darkRed = "#b02a37";
const lightGray = "#f8f8f8";

function Navbar({ onPlaceOrder, onShowOrders }) {
  const [orderAnchor, setOrderAnchor] = useState(null);
  const [reportsAnchor, setReportsAnchor] = useState(null);
  const [customerServiceAnchor, setCustomerServiceAnchor] = useState(null);
  const [profileAnchor, setProfileAnchor] = useState(null);

  return (
    <AppBar position="static" elevation={0} sx={{
      background: navbarBlack, color: "#fff", minHeight: 48, zIndex: 1200
    }}>
      <Toolbar sx={{
        minHeight: 48, alignItems: "center", px: 2, boxShadow: "none"
      }}>
        <Typography variant="h6" sx={{ color: redColor, fontWeight: 800, fontSize: 20, pr: 2 }}>FUELnow</Typography>
        <Button sx={{ color: "#fff", fontWeight: 600, fontSize: 15, mx: 0.5 }} disableRipple>HOME</Button>
        <Button sx={{ color: "#fff", fontWeight: 600, fontSize: 15, mx: 0.5 }}
          onClick={e => setOrderAnchor(e.currentTarget)}
          endIcon={<ArrowDropDownOutlined sx={{ color: "#fff" }} />}>ORDER</Button>
        <Menu anchorEl={orderAnchor} open={Boolean(orderAnchor)} onClose={() => setOrderAnchor(null)}>
          <MenuItem onClick={() => { setOrderAnchor(null); onPlaceOrder(); }}>Place Order</MenuItem>
          <MenuItem onClick={() => { setOrderAnchor(null); onShowOrders(); }}>My Orders</MenuItem>
        </Menu>
        <Button sx={{ color: "#fff", fontWeight: 600, fontSize: 15, mx: 0.5 }}
          onClick={e => setReportsAnchor(e.currentTarget)}
          endIcon={<ArrowDropDownOutlined sx={{ color: "#fff" }} />}>REPORTS</Button>
        <Menu anchorEl={reportsAnchor} open={Boolean(reportsAnchor)} onClose={() => setReportsAnchor(null)}>
          <MenuItem onClick={() => setReportsAnchor(null)}>Report 1</MenuItem>
          <MenuItem onClick={() => setReportsAnchor(null)}>Report 2</MenuItem>
        </Menu>
        <Button sx={{ color: "#fff", fontWeight: 600, fontSize: 15, mx: 0.5 }}
          onClick={e => setCustomerServiceAnchor(e.currentTarget)}
          endIcon={<ArrowDropDownOutlined sx={{ color: "#fff" }} />}>CUSTOMER SERVICES</Button>
        <Menu anchorEl={customerServiceAnchor} open={Boolean(customerServiceAnchor)} onClose={() => setCustomerServiceAnchor(null)}>
          <MenuItem onClick={() => setCustomerServiceAnchor(null)}>Help</MenuItem>
        </Menu>
        <Box sx={{ flexGrow: 1 }} />
        <Badge badgeContent={0} color="error" sx={{ mx: 1 }}>
          <ShoppingCartOutlined sx={{ color: "#fff", fontSize: 26 }} />
        </Badge>
        <Button
          sx={{ color: "#fff", textTransform: "none", fontWeight: 700, fontSize: 15 }}
          onClick={e => setProfileAnchor(e.currentTarget)}
          startIcon={<AccountCircle sx={{ fontSize: 22, color: "#fff" }} />}
        >Hello, Jai Devarajan</Button>
        <Menu anchorEl={profileAnchor} open={Boolean(profileAnchor)} onClose={() => setProfileAnchor(null)}>
          <MenuItem onClick={() => setProfileAnchor(null)}>Profile</MenuItem>
          <MenuItem onClick={() => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("role");
            window.location.replace("/login");
          }}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

function Dashboard() {
  return (
    <Box sx={{ p: 2, bgcolor: lightGray, minHeight: "100vh" }}>
      <Typography sx={{ fontWeight: 900, fontSize: 24, color: "#e23744", mb: 2 }}>
        Dashboard Loaded!
      </Typography>
      <Grid container spacing={2} sx={{ mb: 1 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 90, borderRadius: 2, bgcolor: zomatoRed, color: "#fff", p: 1 }}>
            <CardContent sx={{ p: "8px!important" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <CardGiftcardOutlined fontSize="small" sx={{ mr: 1, color: "#fff6" }} />
                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>Available Loyalty</Typography>
                <Box sx={{ ml: "auto", fontWeight: 500, fontSize: 13, color: "#ffd5d8" }}>Active</Box>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: 28 }}>₹ 0</Typography>
              <Typography sx={{ fontSize: 11, color: "#fff9" }}>
                Blocked (In Cart, Payment)
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ minHeight: 90, borderRadius: 2, bgcolor: darkRed, color: "#fff", p: 1 }}>
            <CardContent sx={{ p: "8px!important" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AccountBalanceWalletOutlined fontSize="small" sx={{ mr: 1, color: "#fff6" }} />
                <Typography sx={{ fontWeight: 600, fontSize: 15 }}>My Wallet Limit</Typography>
                <Box sx={{ ml: "auto", fontWeight: 500, fontSize: 13, color: "#ffbfc4" }}>Active</Box>
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 800, fontSize: 28 }}>₹ 0</Typography>
              <Typography sx={{ fontSize: 11, color: "#fff9" }}>
                Amount available in your wallet
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card sx={{ minHeight: 90, borderRadius: 2, bgcolor: "#fff", color: zomatoRed, p: 1, boxShadow: 2 }}>
            <CardContent sx={{ p: "8px!important" }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography sx={{ fontWeight: 700, fontSize: 16 }}>
                  Current Order Tracking
                </Typography>
                <Button sx={{
                  ml: "auto", fontWeight: 600, fontSize: 11, borderRadius: 2, color: zomatoRed, borderColor: zomatoRed, height: 20, minWidth: 32, px: 1.5
                }} size="small" variant="outlined">Track</Button>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ color: "#888", fontStyle: "italic", fontSize: 13 }}>
                  Live order tracking will appear here.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card sx={{ borderRadius: 2, bgcolor: "#fff", mt: 2, boxShadow: 1 }}>
        <CardContent sx={{ p: "10px 16px" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: zomatoRed }}>My Assets</Typography>
            <Button sx={{
              ml: "auto", fontWeight: 600, fontSize: 11, borderRadius: 2, color: zomatoRed, borderColor: zomatoRed, height: 20, minWidth: 32, px: 1.5
            }} size="small" variant="outlined">More</Button>
          </Box>
          <Typography sx={{ mt: 2, color: "#888", fontSize: 13 }}>No records found</Typography>
        </CardContent>
      </Card>
      <Box sx={{
        position: "fixed", right: 18, bottom: 95, display: "flex", flexDirection: "column", gap: 1, zIndex: 900
      }}>
        <Button sx={{
          minWidth: "45px", width: 45, height: 45, borderRadius: 999, bgcolor: "#fff", boxShadow: 2, color: zomatoRed, mb: 1, p: 0
        }}>
          <AccountBalanceWalletOutlined sx={{ fontSize: 28 }} />
        </Button>
        <Button sx={{
          minWidth: "45px", width: 45, height: 45, borderRadius: 999, bgcolor: "#fff", boxShadow: 2, color: zomatoRed, mb: 1, p: 0
        }}>
          <ShoppingCartOutlined sx={{ fontSize: 28 }} />
        </Button>
        <Button sx={{
          minWidth: "45px", width: 45, height: 45, borderRadius: 999, bgcolor: "#fff", boxShadow: 2, color: zomatoRed, p: 0
        }}>
          <CardGiftcardOutlined sx={{ fontSize: 28 }} />
        </Button>
      </Box>
    </Box>
  );
}

export default function UserDashboard() {
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  // Get userId from local storage (set at login)
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('role');
    if (!(isLoggedIn && role === "user")) {
      window.location.replace("/login");
    }
  }, []);

  const handlePlaceOrder = () => setShowOrderForm(true);
  const handleShowOrders = () => setShowOrders(true);

  return (
    <>
      <Navbar onPlaceOrder={handlePlaceOrder} onShowOrders={handleShowOrders} />
      <Dashboard />
      <OrderForm open={showOrderForm} onClose={() => setShowOrderForm(false)} />
      <Drawer anchor="right" open={showOrders} onClose={() => setShowOrders(false)}>
        <Box sx={{ width: 400, maxWidth: "100vw", p: 2 }}>
          <OrderHistory userId={userId} />
        </Box>
      </Drawer>
    </>
  );
}
