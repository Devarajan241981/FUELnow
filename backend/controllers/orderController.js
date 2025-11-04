const Order = require('../models/order');

// Place a new order
exports.placeOrder = async (req, res) => {
  try {
    const { address, fuelType, quantity, userId, paymentMethod } = req.body;
    // Use userId from body; should be replaced by req.user.id (auth) later

    if (!userId || !address || !fuelType || !quantity) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const order = new Order({
      user: userId,
      address,
      fuelType,
      quantity,
      paymentMethod: paymentMethod || "N/A",
      status: 'pending',
      time: new Date()
    });

    await order.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders (for merchant/admin dashboard)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'email') // Only populate email
      .sort({ time: -1 }); // Show latest orders first
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for a specific user (for user dashboard)
exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }
    const orders = await Order.find({ user: userId })
      .sort({ time: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
