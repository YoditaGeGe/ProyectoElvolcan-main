import Boton from "../atoms/Boton";
import { formatoPrecio, normalizarImagen } from "../../util/ayudas";

function ItemCarrito(props) {
  var item = props.item;
  var subtotal = item.precio * item.cantidad;

  return (
    <article className="item-carrito">
      <img src={normalizarImagen(item.imagen)} alt={item.nombre} />
      <div className="detalles-carrito">
        <h3>{item.nombre}</h3>
        <p>Precio unitario: {formatoPrecio(item.precio)}</p>
        <p>Cantidad: {item.cantidad}</p>
        <strong>Subtotal: {formatoPrecio(subtotal)}</strong>
        <Boton secundario onClick={function () { props.onEliminar(item.codigo); }}>
          Eliminar
        </Boton>
      </div>
    </article>
  );
}

export default ItemCarrito;
