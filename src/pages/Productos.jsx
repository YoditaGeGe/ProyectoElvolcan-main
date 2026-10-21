import { useEffect, useState } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import Filtros from "../components/molecules/Filtros";
import ListaProductos from "../components/organisms/ListaProductos";

function Productos(props) {
  const [texto, setTexto] = useState("");
  const [kilos, setKilos] = useState("todos");
  const [soloFav, setSoloFav] = useState(false);

  useEffect(function () {
    document.title = "Gas El Volcán | Productos";
  }, []);

  var lista = props.productos.filter(function (producto) {
    var nombre = producto.nombre.toLowerCase();
    var coincideTexto = nombre.indexOf(texto.toLowerCase()) != -1;

    var coincideKilos = true;
    if (kilos == "otros") {
      coincideKilos = producto.kilos != 5 && producto.kilos != 11 && producto.kilos != 15;
    } else if (kilos != "todos") {
      coincideKilos = String(producto.kilos) == kilos;
    }

    var coincideFav = true;
    if (soloFav) {
      coincideFav = props.favoritos.indexOf(producto.codigo) != -1;
    }

    return coincideTexto && coincideKilos && coincideFav;
  });

  var mensajeVacio = "No hay productos para mostrar.";
  if (soloFav && props.favoritos.length == 0) {
    mensajeVacio = "Todavía no marcas favoritos.";
  }

  return (
    <main>
      <TituloSeccion
        titulo="Nuestros productos"
        texto="Catálogo de cilindros de gas licuado disponibles en la tienda."
      />

      <Filtros
        texto={texto}
        setTexto={setTexto}
        kilos={kilos}
        setKilos={setKilos}
        soloFav={soloFav}
        onFavoritos={function () { setSoloFav(!soloFav); }}
      />

      {lista.length == 0 ? (
        <section className="carrito-seccion">
          <p className="carrito-vacio">{mensajeVacio}</p>
        </section>
      ) : (
        <ListaProductos
          productos={lista}
          favoritos={props.favoritos}
          onFavorito={props.onFavorito}
        />
      )}
    </main>
  );
}

export default Productos;
