import { useEffect } from "react";
import Boton from "../components/atoms/Boton";

function Error404() {
  useEffect(function () {
    document.title = "Gas El Volcán | Página no encontrada";
  }, []);

  return (
    <main>
      <section className="titulo pagina-error">
        <h2>Página no encontrada</h2>
        <p>La dirección que escribiste no existe.</p>
        <Boton to="/">Volver al inicio</Boton>
      </section>
    </main>
  );
}

export default Error404;
