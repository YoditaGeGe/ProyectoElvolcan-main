import { useEffect } from "react";
import { useParams } from "react-router-dom";
import DetalleProducto from "../components/organisms/DetalleProducto";

function Producto(props) {
  const params = useParams();

  useEffect(function () {
    document.title = "Gas El Volcán | Producto";
  }, []);

  var producto = props.productos.find(function (item) {
    return item.codigo == params.codigo;
  });

  var esFavorito = false;
  if (producto && props.favoritos.indexOf(producto.codigo) != -1) {
    esFavorito = true;
  }

  return (
    <main>
      <DetalleProducto
        producto={producto}
        esFavorito={esFavorito}
        onFavorito={props.onFavorito}
        agregarAlCarrito={props.agregarAlCarrito}
      />
    </main>
  );
}

export default Producto;
