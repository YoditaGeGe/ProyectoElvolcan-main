import Boton from "../atoms/Boton";
import { formatoPrecio, normalizarImagen } from "../../util/ayudas";

function TarjetaProducto(props) {
  var producto = props.producto;
  var textoBoton = "Favorito";

  if (props.esFavorito) {
    textoBoton = "Quitar favorito";
  }

  return (
    <article className="producto">
      <img src={normalizarImagen(producto.imagen)} alt={producto.nombre} />
      <h3>{producto.nombre}</h3>
      <p>{producto.resumen || producto.descripcion}</p>
      <strong>{formatoPrecio(producto.precio)}</strong>
      <Boton to={"/producto/" + producto.codigo}>Ver producto</Boton>
      <Boton secundario onClick={function () { props.onFavorito(producto.codigo); }}>
        {textoBoton}
      </Boton>
    </article>
  );
}

export default TarjetaProducto;
