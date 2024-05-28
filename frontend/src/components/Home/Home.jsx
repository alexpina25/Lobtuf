import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md">
      <Box mt={8}>
        <Typography variant="h2" component="h1" gutterBottom>
          Bienvenido a Furbol App
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          La plataforma definitiva para la gestión de ligas y torneos de fútbol virtual.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
