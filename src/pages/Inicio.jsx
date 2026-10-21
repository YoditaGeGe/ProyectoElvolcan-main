import { useEffect } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import Banner from "../components/organisms/Banner";
import Presentacion from "../components/organisms/Presentacion";
import Galeria from "../components/organisms/Galeria";
import BloqueInfo from "../components/organisms/BloqueInfo";
import VideoSeguridad from "../components/organisms/VideoSeguridad";

function Inicio() {
  useEffect(function () {
    document.title = "Gas El Volcán | Inicio";
  }, []);

  return (
    <main>
      <Banner />
      <TituloSeccion
        titulo="Distribuidora de gas en Chillán"
        texto="Somos una tienda de gas licuado en Chillán, Región de Ñuble. Vendemos cilindros de 5, 11 y 15 kg y hacemos despacho a domicilio."
      />
      <Presentacion />
      <Galeria />
      <BloqueInfo />
      <VideoSeguridad />
    </main>
  );
}

export default Inicio;
