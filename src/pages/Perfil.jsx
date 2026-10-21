import { useEffect, useState } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import FormPerfil from "../components/organisms/FormPerfil";

function leerUsuario() {
  var texto = localStorage.getItem("usuario");
  if (!texto) {
    return null;
  }
  return JSON.parse(texto);
}

function Perfil() {
  const [usuario, setUsuario] = useState(leerUsuario);

  useEffect(function () {
    document.title = "Gas El Volcán | Mi perfil";
  }, []);

  return (
    <main>
      <TituloSeccion
        titulo="Mi perfil"
        texto="Estos son los datos de tu cuenta y del despacho."
      />

      {usuario ? (
        <FormPerfil usuario={usuario} onGuardar={setUsuario} />
      ) : (
        <p className="carrito-vacio">No encontramos los datos de tu cuenta.</p>
      )}
    </main>
  );
}

export default Perfil;
