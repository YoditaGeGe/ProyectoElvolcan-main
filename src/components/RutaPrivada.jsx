import { Navigate } from "react-router-dom";

function RutaPrivada(props) {
  var sesion = localStorage.getItem("sesion");

  if (sesion != "si") {
    return <Navigate to="/login" replace />;
  }

  if (props.soloAdmin && localStorage.getItem("esAdmin") != "si") {
    return <Navigate to="/" replace />;
  }

  return props.children;
}

export default RutaPrivada;
