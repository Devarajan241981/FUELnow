import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";

export default function OrderHistory({ userId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let url = "/api/orders";
    if (userId) url = `/api/orders/user/${userId}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
        setLoading(false);
      })
      .catch((e) => {
        setError("Could not fetch orders. " + (e.message || ""));
        setLoading(false);
      });
  }, [userId]);

  return (
    <Box minHeight="100vh" bgcolor="#fafafc" py={6} px={2}>
      <Typography variant="h4" fontWeight={800} mb={4}>
        My Orders
      </Typography>
      {loading && <Typography>Loading orders...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !orders.length && !error && (
        <Typography>No orders found.</Typography>
      )}
      <Stack spacing={2}>
        {orders.map(order => (
          <Paper key={order._id || order.id || order.time} sx={{ p: 3, borderRadius: 3 }}>
            <Typography>
              <b>Order ID:</b> {order._id || order.id}
            </Typography>
            <Typography>
              <b>User:</b> {order.user?.email || order.user || "N/A"}
            </Typography>
            <Typography>
              <b>Payment:</b> {order.paymentMethod || "N/A"}
            </Typography>
            <Typography>
              <b>Status:</b> {order.status || "pending"}
            </Typography>
            <Typography>
              <b>Time:</b> {order.time ? new Date(order.time).toLocaleString() : "N/A"}
            </Typography>
            <Typography>
              <b>Address:</b> {order.address}
            </Typography>
            <Typography>
              <b>Fuel Type:</b> {order.fuelType}
            </Typography>
            <Typography>
              <b>Quantity:</b> {order.quantity}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </Box>
  );
}
