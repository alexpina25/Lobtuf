import { useEffect, useState } from 'react';
import { Container, Typography, Box, Alert } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

const VerifyAccount = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await axios.get(`/auth/verify/${token}`);
        setMessage(response.data.message);
      } catch (error) {
        setMessage(error.response.data.message || 'Error en la verificación');
      }
    };

    verifyUser();
  }, [token]);

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Verificación de Cuenta
        </Typography>
        <Alert severity={message.includes('Error') ? 'error' : 'success'}>{message}</Alert>
      </Box>
    </Container>
  );
};

export default VerifyAccount;
