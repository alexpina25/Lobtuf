import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "../utils/axiosConfig";

const VerifyOtpPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState("");
  const email = new URLSearchParams(location.search).get("email");

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/verify-otp", { email, otp });
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
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Verificación de Correo
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Código OTP"
            variant="outlined"
            margin="normal"
            fullWidth
            value={otp}
            onChange={handleChange}
            required
          />
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
