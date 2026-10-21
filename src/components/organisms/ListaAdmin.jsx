import Boton from "../atoms/Boton";
import { formatoPrecio, normalizarImagen } from "../../util/ayudas";

function ListaAdmin(props) {
  if (props.productos.length == 0) {
    return <p className="carrito-vacio">No hay productos en el catálogo.</p>;
  }

  return (
    <div className="carrito-seccion">
      {props.productos.map(function (producto) {
        return (
          <article className="item-carrito" key={producto.codigo}>
            <img src={normalizarImagen(producto.imagen)} alt={producto.nombre} />
            <div className="detalles-carrito">
              <h3>{producto.nombre}</h3>
              <p>{producto.descripcion}</p>
              <p>Kilos: {producto.kilos}. Tipo: {producto.tipo}. Stock: {producto.stock}</p>
              <strong>{formatoPrecio(producto.precio)}</strong>
              <Boton onClick={function () { props.onEditar(producto); }}>Editar</Boton>
              <Boton secundario onClick={function () { props.onEliminar(producto.codigo); }}>
                Eliminar
              </Boton>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export default ListaAdmin;
