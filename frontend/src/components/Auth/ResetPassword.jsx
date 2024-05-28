import { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from '../../utils/axiosConfig';

const ResetPassword = () => {
  const { token } = useParams();
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/users/reset-password/${token}`, { password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Resetear Contraseña
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nueva Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Resetear Contraseña
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ResetPassword;
