import { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from '../../utils/axiosConfig';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    country: '',
    position: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post('/auth/register', formData);
      console.log(response);
      setSuccess('Registro exitoso, por favor verifica tu correo electrónico');
    } catch (error) {
      setError(error.response.data.message || 'Error en el registro');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={8}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrarse
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            margin="normal"
            fullWidth
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <TextField
            label="Apellido"
            variant="outlined"
            margin="normal"
            fullWidth
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            margin="normal"
            fullWidth
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            label="Email"
            variant="outlined"
            margin="normal"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            label="Número de Teléfono"
            variant="outlined"
            margin="normal"
            fullWidth
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <TextField
            label="País"
            variant="outlined"
            margin="normal"
            fullWidth
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
          <TextField
            label="Posición"
            variant="outlined"
            margin="normal"
            fullWidth
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
          <TextField
            label="Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
            Registrarse
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;
