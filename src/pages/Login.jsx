import { useEffect } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import FormLogin from "../components/organisms/FormLogin";

function Login(props) {
  useEffect(function () {
    document.title = "Gas El Volcán | Login";
  }, []);

  return (
    <main>
      <TituloSeccion
        titulo="Iniciar sesión"
        texto="Ingresa con tu correo y contraseña."
      />
      <FormLogin setSesion={props.setSesion} setEsAdmin={props.setEsAdmin} />
    </main>
  );
}

export default Login;
