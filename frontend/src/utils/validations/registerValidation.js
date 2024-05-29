import * as yup from "yup";

export const validationSchema = yup.object().shape({
  firstName: yup.string().required("Nombre es requerido"),
  lastName: yup.string().required("Apellido es requerido"),
  username: yup.string().required("Nombre de usuario es requerido"),
  email: yup.string().email("Email inválido").required("Email es requerido"),
  phone: yup.string().matches(/^[0-9]+$/, "Número de teléfono inválido"),
  country: yup.string().required("País es requerido"),
  positions: yup.array().min(1, "Debe seleccionar al menos una posición").required("Posición es requerida"),
  platforms: yup.array().min(1, "Debe seleccionar al menos una plataforma").required("Plataforma es requerida"),
  password: yup.string().required("Contraseña es requerida"),
  confirmPassword: yup.string()
    .oneOf([yup.ref("password"), null], "Las contraseñas deben coincidir")
    .required("Confirmar contraseña es requerido"),
});
