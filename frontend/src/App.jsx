import React from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import MerchantSignup from "./pages/MerchantSignup";
import AggregatorSignup from "./pages/AggregatorSignup";
import UserDashboard from "./pages/UserDashboard";
import PaymentSelection from "./components/PaymentSelection";
import MerchantDashboard from "./pages/MerchantDashboard/MerchantDashboard";
import MerchantLoginPage from "./pages/MerchantDashboard/MerchantLoginPage";
import OrderHistory from "./components/ModalForms/OrderHistory";

class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 32, color: "#b02a37", background: "#fff3f3", fontWeight: 700 }}>
          Failed to load dashboard. {this.state.error?.message}
        </div>
      );
    }
    return this.props.children;
  }
}

function DashboardCSSWrapper({ children }) {
  const location = useLocation();
  React.useEffect(() => {
    let styleElem = null;
    if (location.pathname === "/dashboard") {
      styleElem = document.createElement("style");
      styleElem.innerHTML = `
        body, html, #root {
          background: #f7f9fa !important;
          min-height: 100vh;
        }
      `;
      document.head.appendChild(styleElem);
    }
    return () => {
      if (styleElem) document.head.removeChild(styleElem);
    };
  }, [location]);
  return children;
}

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  if (!(isLoggedIn && role === "user")) {
    window.location.replace("/login");
    return null;
  }
  return children;
}

function MerchantProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const role = localStorage.getItem("role");
  if (!(isLoggedIn && role === "merchant")) {
    window.location.replace("/merchant-login");
    return null;
  }
  return children;
}

function MainAppBar() {
  return (
    <AppBar position="static" color="default" elevation={1} sx={{ mb: 0, bgcolor: "#fff" }}>
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId="565209562551-8kl75442g9j39u158hpa7j8ns3rrkbma.apps.googleusercontent.com">
      <BrowserRouter>
        <DashboardCSSWrapper>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <DashboardErrorBoundary>
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                </DashboardErrorBoundary>
              }
            />
            <Route
              path="/merchant-dashboard"
              element={
                <MerchantProtectedRoute>
                  <MerchantDashboard />
                </MerchantProtectedRoute>
              }
            />
            <Route
              path="/merchant-dashboard/orders"
              element={
                <MerchantProtectedRoute>
                  <>
                    <MainAppBar />
                    <Container maxWidth="md" sx={{ mt: 4 }}>
                      <OrderHistory />
                    </Container>
                  </>
                </MerchantProtectedRoute>
              }
            />
            <Route
              path="/merchant-login"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <MerchantLoginPage />
                  </Container>
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <HomePage />
                  </Container>
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <LoginPage />
                  </Container>
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <SignupPage />
                  </Container>
                </>
              }
            />
            <Route
              path="/merchant-signup"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <MerchantSignup />
                  </Container>
                </>
              }
            />
            <Route
              path="/aggregator-signup"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <AggregatorSignup />
                  </Container>
                </>
              }
            />
            <Route
              path="/payment"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <PaymentSelection />
                  </Container>
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <MainAppBar />
                  <Container maxWidth="md" sx={{ mt: 4 }}>
                    <HomePage />
                  </Container>
                </>
              }
            />
          </Routes>
        </DashboardCSSWrapper>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
