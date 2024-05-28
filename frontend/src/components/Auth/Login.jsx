import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import axios from '../../utils/axiosConfig';

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });
      console.log(response.data);
      // Aquí puedes manejar la respuesta, por ejemplo, guardando el token
    } catch (error) {
      enqueueSnackbar('Error al iniciar sesión. Verifica tus credenciales.', { variant: 'error', anchorOrigin: { vertical: 'center', horizontal: 'center' }, autoHideDuration: 3000});
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete='email'
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
          <Link component={RouterLink} to="/forgot-password" variant="body2" sx={{ display: 'block', textAlign: 'center', mt: 2 }}>
            He olvidado mi contraseña
          </Link>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
