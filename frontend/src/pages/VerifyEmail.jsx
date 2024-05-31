import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const VerifyEmail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      // Guardar el token en el almacenamiento local
      localStorage.setItem("authToken", token);
      enqueueSnackbar("Correo verificado exitosamente", { variant: "success" });
      // Redirigir a la página de perfil
      navigate("/profile");
    } else {
      enqueueSnackbar("Token inválido o expirado", { variant: "error" });
    }
  }, [token, enqueueSnackbar, navigate]);

  return null;
};

export default VerifyEmail;
