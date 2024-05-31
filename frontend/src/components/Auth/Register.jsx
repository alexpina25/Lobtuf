import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  MenuItem,
  Grid,
  Select,
  InputLabel,
  FormControl,
  InputAdornment,
  Checkbox,
  Chip,
  Autocomplete,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { Formik, Form } from "formik";
import { validationSchema } from "../../utils/validations/registerValidation";
import { positions, platforms } from "../../utils/data/formData";
import axios from "../../utils/axiosConfig";
import countries from "../../utils/countries";
import ReactCountryFlag from "react-country-flag";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [countryFlag, setCountryFlag] = useState("");

  const handleCountryChange = (event, value, setFieldValue) => {
    setFieldValue("country", value ? value.name : "");
    setFieldValue("countryCode", value ? `+${value.phoneCode}` : "");
    setCountryFlag(value ? value.id : "");
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await axios.post("/auth/register", values);
      enqueueSnackbar(
        "Registro exitoso, por favor verifica tu correo electrónico",
        { variant: "success" }
      );
      navigate(`/verify-otp?email=${values.email}`);
    } catch (error) {
      enqueueSnackbar(error.response.data.message || "Error en el registro", {
        variant: "error",
      });
    }
    setSubmitting(false);
  };

  return (
    <Container maxWidth="md">
      <Box mt={8} mb={4}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Registro
        </Typography>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            phone: "",
            country: "",
            countryCode: "",
            positions: [],
            platforms: [],
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            setFieldValue,
            isSubmitting,
          }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre de Usuario"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Autocomplete
                    options={countries}
                    getOptionLabel={(option) => option.name}
                    onChange={(event, value) =>
                      handleCountryChange(event, value, setFieldValue)
                    }
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        <ReactCountryFlag
                          countryCode={option.id}
                          svg
                          style={{ marginRight: 10 }}
                        />
                        {option.name}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="País"
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="country"
                        value={values.country}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.country && Boolean(errors.country)}
                        helperText={touched.country && errors.country}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Número de Teléfono (Opcional)"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {countryFlag && (
                            <ReactCountryFlag
                              countryCode={countryFlag}
                              svg
                              style={{ marginRight: 5 }}
                            />
                          )}
                          {values.countryCode}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel>Posición</InputLabel>
                    <Select
                      label="Posición"
                      name="positions"
                      multiple
                      value={values.positions}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              positions.find(
                                (position) => position.value === value
                              )?.label
                            }
                          />
                        ))
                      }
                    >
                      {positions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox
                            checked={
                              values.positions.indexOf(option.value) > -1
                            }
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.positions && errors.positions && (
                      <Typography color="error" variant="body2">
                        {errors.positions}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl variant="outlined" margin="normal" fullWidth>
                    <InputLabel>Plataforma</InputLabel>
                    <Select
                      label="Plataforma"
                      name="platforms"
                      multiple
                      value={values.platforms}
                      onChange={handleChange}
                      renderValue={(selected) =>
                        selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              platforms.find(
                                (platform) => platform.value === value
                              )?.label
                            }
                          />
                        ))
                      }
                    >
                      {platforms.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          <Checkbox
                            checked={
                              values.platforms.indexOf(option.value) > -1
                            }
                          />
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {touched.platforms && errors.platforms && (
                      <Typography color="error" variant="body2">
                        {errors.platforms}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Confirmar Contraseña"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={
                      touched.confirmPassword && Boolean(errors.confirmPassword)
                    }
                    helperText={
                      touched.confirmPassword && errors.confirmPassword
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    disabled={isSubmitting}
                  >
                    Registrarse
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default Register;
