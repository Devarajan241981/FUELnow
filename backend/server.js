const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const twilio = require("twilio");

// Import your custom middleware and routes
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const userRoutes = require("./routes/user");
const orderRoutes = require("./routes/order");

// Environment variables
const mongoUri = process.env.MONGODB_URI;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

if (!mongoUri) {
  console.error("MongoDB URI missing! Check .env file for MONGODB_URI");
  process.exit(1);
}
if (!accountSid || !authToken || !twilioPhone) {
  console.error("Twilio config missing! Check .env file for TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER");
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(
  mongoUri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

const app = express();

// Middleware
app.use(logger);
app.use(express.json());

// Mount user and order routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

// Twilio OTP setup
const twilioClient = twilio(accountSid, authToken);
const otpStore = {}; // For demonstration; not persistent

// Send OTP endpoint
app.post("/api/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).send({ success: false, message: "Phone number required" });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[phone] = otp;
  try {
    const msg = await twilioClient.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhone,
      to: phone.startsWith("+") ? phone : `+91${phone}`
    });
    console.log("Twilio send message SID:", msg.sid);
    res.status(200).send({ success: true, message: "OTP sent" });
  } catch (error) {
    console.error(
      `[Twilio Error]
Type: ${error.code || error.name}
Message: ${error.message}
More info: ${error.moreInfo || "n/a"}
Stack:`, error.stack
    );
    res.status(500).send({
      success: false,
      message: "Failed to send OTP",
      details: error.message,
      code: error.code || null,
      moreInfo: error.moreInfo || null
    });
  }
});

// OTP verify endpoint
app.post("/api/verify-otp", (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    return res.status(400).send({ success: false, message: "Phone and OTP required" });
  }
  if (otpStore[phone] === otp) {
    delete otpStore[phone];
    res.status(200).send({ success: true, message: "OTP verified" });
  } else {
    res.status(401).send({ success: false, message: "Invalid OTP" });
  }
});

// Health check/basic route
app.get("/", (req, res) => {
  res.send("FuelNow backend is running!");
});

// Error handler (after all routes)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
