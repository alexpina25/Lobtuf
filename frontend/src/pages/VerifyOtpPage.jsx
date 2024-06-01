import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Container, Button, Typography, Box } from "@mui/material";
import PinInput from "react-pin-input";
import axios from "../utils/axiosConfig";

const VerifyOtpPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/verify-otp", { email, otp });
      localStorage.setItem("authToken", response.data.token);
      enqueueSnackbar("Correo verificado exitosamente", { variant: "success" });
      navigate("/profile");
    } catch (error) {
      enqueueSnackbar("Código OTP inválido o expirado", { variant: "error" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8} mb={4}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          align="center"
          sx={{ color: "primary.main", fontWeight: "bold" }}
        >
          Verificación de Correo
        </Typography>
        <Typography
          variant="h6"
          component="h2"
          gutterBottom
          align="center"
          sx={{ color: "text.secondary" }}
        >
          Introduce el código enviado por email a {email}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" justifyContent="center" mb={2}>
            <PinInput
              length={6}
              focus
              type="numeric"
              inputMode="number"
              onChange={(value) => setOtp(value)}
              onComplete={(value) => setOtp(value)}
              style={{ padding: "10px" }}
              inputStyle={{
                borderColor: "grey",
                backgroundColor: "white",
                borderRadius: "8px",
                width: "40px",
                height: "40px",
                margin: "0 5px",
                fontSize: "20px",
                textAlign: "center",
              }}
              inputFocusStyle={{
                borderColor: "blue",
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Verificar Cuenta
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default VerifyOtpPage;
