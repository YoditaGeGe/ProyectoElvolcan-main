import { useEffect } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import FormRegistro from "../components/organisms/FormRegistro";

function Registro() {
  useEffect(function () {
    document.title = "Gas El Volcán | Registro";
  }, []);

  return (
    <main>
      <TituloSeccion
        titulo="Crear cuenta"
        texto="Regístrate para usar la tienda y pedir gas."
      />
      <FormRegistro />
    </main>
  );
}

export default Registro;
