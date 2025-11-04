import React, { useState } from "react";
import { Box, Typography, Button, Paper, Stack } from "@mui/material";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';

const PRIMARY_COLOR = "#e23744";

const phonepeUrl = "https://www.phonepe.com/";
const gpayUrl = "https://pay.google.com/";
const paytmUrl = "https://paytm.com/";

// amount is now expected as a prop
export default function PaymentMethods({ amount }) {
  const [showUpiModal, setShowUpiModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showCodConfirm, setShowCodConfirm] = useState(false);

  const handleSelect = (method) => {
    if (method === "UPI") {
      setShowUpiModal(true);
    } else if (method === "CASH ON DELIVERY") {
      setShowCodConfirm(true);
    } else {
      alert(`You selected ${method}`);
    }
  };

  const handleCodContinue = () => {
    const orderDetails = {
      id: Date.now(),
      paymentMethod: "CASH ON DELIVERY",
      status: "Placed",
      time: new Date().toLocaleString(),
      amount: amount, // Uses dynamic amount prop
    };
    const prev = JSON.parse(localStorage.getItem("orders") || "[]");
    localStorage.setItem("orders", JSON.stringify([...prev, orderDetails]));
    setShowSuccessModal(true);
    setShowCodConfirm(false);
  };

  const closeUpiModal = () => setShowUpiModal(false);
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeCodConfirm = () => setShowCodConfirm(false);

  const handleUpiClick = (url) => {
    window.open(url, "_blank");
    setShowUpiModal(false);
  };

  return (
    <Box minHeight="100vh" sx={{
      bgcolor: "#fafafc",
      display: "flex",
      flexDirection: "column"
    }}>
      {/* App Bar imitation */}
      <Box sx={{
        minHeight: 64,
        px: 3,
        display: "flex",
        alignItems: "center",
        bgcolor: "#fff",
        borderBottom: "1.5px solid #ececec",
        boxShadow: "0 2px 8px 0 rgba(215,0,34,.02)",
      }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: PRIMARY_COLOR }}>
          FUELNOW Delivery
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button variant="text" sx={{ color: "#333" }}>HOME</Button>
      </Box>
      {/* Main Content */}
      <Stack alignItems="center" justifyContent="center" flex={1} spacing={3}>
        <Typography variant="h4" sx={{
          fontWeight: 700,
          color: PRIMARY_COLOR,
          mt: 4,
          letterSpacing: ".5px",
          textShadow: "0 4px 12px #eee"
        }}>
          Select Payment Method
        </Typography>
        <Stack spacing={2.5} width={260} mt={2}>
          <Paper elevation={3} sx={{
            p: 1.5,
            bgcolor: "#fff",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 1.5,
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": {
              boxShadow: "0 8px 32px 2px #e2374420",
              transform: "translateY(-2px) scale(1.02)"
            }
          }} onClick={() => handleSelect("CREDIT / DEBIT CARD")}>
            <CreditCardIcon sx={{ color: PRIMARY_COLOR, fontSize: 23 }} />
            <Button variant="text" sx={{ color: PRIMARY_COLOR, fontWeight: 700, fontSize: 15, flex: 1 }}>
              CREDIT / DEBIT CARD
            </Button>
          </Paper>
          <Paper elevation={3} sx={{
            p: 1.5,
            bgcolor: "#fff",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 1.5,
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": {
              boxShadow: "0 8px 32px 2px #e2374420",
              transform: "translateY(-2px) scale(1.02)"
            }
          }} onClick={() => handleSelect("UPI")}>
            <AccountBalanceWalletIcon sx={{ color: "#635BFF", fontSize: 23 }} />
            <Button variant="text" sx={{ color: "#635BFF", fontWeight: 700, fontSize: 15, flex: 1 }}>
              UPI
            </Button>
          </Paper>
          <Paper elevation={3} sx={{
            p: 1.5,
            bgcolor: "#fff",
            borderRadius: 3,
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            gap: 1.5,
            transition: "box-shadow 0.2s, transform 0.2s",
            "&:hover": {
              boxShadow: "0 8px 32px 2px #5ec86f20",
              transform: "translateY(-2px) scale(1.02)"
            }
          }} onClick={() => handleSelect("CASH ON DELIVERY")}>
            <LocalAtmIcon sx={{ color: "#5ec86f", fontSize: 23 }} />
            <Button variant="text" sx={{ color: "#5ec86f", fontWeight: 700, fontSize: 15, flex: 1 }}>
              CASH ON DELIVERY
            </Button>
          </Paper>
        </Stack>
        <Typography variant="caption" align="center" sx={{
          color: "#888", mt: 3, fontSize: 15, fontWeight: 500, letterSpacing: ".05em"
        }}>
          100% secure payments powered by FUELnow
        </Typography>
      </Stack>
      {/* UPI Modal */}
      {showUpiModal && (
        <Box onClick={closeUpiModal}
          sx={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            bgcolor: 'rgba(0,0,0,0.25)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Box onClick={e => e.stopPropagation()}
            sx={{
              background: "#fff",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 32px rgba(0,0,0,0.17)",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#635BFF" }}>
              Select UPI App
            </Typography>
            <Button fullWidth sx={{
              bgcolor: "#6739b7", color: "#fff", my: 1, fontWeight: 600,
              '&:hover': { bgcolor: "#502a90" }
            }} onClick={() => handleUpiClick(phonepeUrl)}>
              PhonePe
            </Button>
            <Button fullWidth sx={{
              bgcolor: "#4285f4", color: "#fff", my: 1, fontWeight: 600,
              '&:hover': { bgcolor: "#3267c2" }
            }} onClick={() => handleUpiClick(gpayUrl)}>
              Google Pay
            </Button>
            <Button fullWidth sx={{
              bgcolor: "#00b9f1", color: "#fff", my: 1, fontWeight: 600,
              '&:hover': { bgcolor: "#0095c7" }
            }} onClick={() => handleUpiClick(paytmUrl)}>
              Paytm
            </Button>
            <Button onClick={closeUpiModal} fullWidth sx={{
              bgcolor: "#eeeeee", color: "#222", mt: 2, fontWeight: 600,
              '&:hover': { bgcolor: "#e0e0e0" }
            }}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {/* COD Confirmation Modal */}
      {showCodConfirm && (
        <Box onClick={closeCodConfirm}
          sx={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            bgcolor: 'rgba(0,0,0,0.25)',
            zIndex: 2100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Box onClick={e => e.stopPropagation()}
            sx={{
              background: "#fff",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 32px rgba(0,0,0,0.17)",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#5ec86f" }}>
              Proceed with Cash on Delivery?
            </Typography>
            {/* Payable Amount */}
            <Typography variant="body1" sx={{ mb: 2, color: "#333", fontSize: 18 }}>
              Payable Amount: <span style={{ color: "#e23744", fontWeight: 600 }}>₹{amount}</span>
            </Typography>
            <Button onClick={handleCodContinue} fullWidth sx={{
              bgcolor: "#5ec86f", color: "#fff", my: 1, fontWeight: 600,
              '&:hover': { bgcolor: "#469955" }
            }}>
              Continue
            </Button>
            <Button onClick={closeCodConfirm} fullWidth sx={{
              bgcolor: "#eeeeee", color: "#222", mt: 2, fontWeight: 600,
              '&:hover': { bgcolor: "#e0e0e0" }
            }}>
              Cancel
            </Button>
          </Box>
        </Box>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <Box onClick={closeSuccessModal}
          sx={{
            position: 'fixed',
            top: 0, left: 0,
            width: '100vw', height: '100vh',
            bgcolor: 'rgba(0,0,0,0.25)',
            zIndex: 2000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <Box onClick={e => e.stopPropagation()}
            sx={{
              background: "#fff",
              p: 4,
              borderRadius: 3,
              boxShadow: "0 4px 32px rgba(0,0,0,0.17)",
              minWidth: 320,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#5ec86f" }}>
              Your order is successfully placed!
            </Typography>
            <Button onClick={closeSuccessModal} fullWidth sx={{
              bgcolor: "#eeeeee", color: "#222", mt: 2, fontWeight: 600,
              '&:hover': { bgcolor: "#e0e0e0" }
            }}>
              Close
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}
