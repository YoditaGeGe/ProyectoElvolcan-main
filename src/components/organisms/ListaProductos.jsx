import TarjetaProducto from "../molecules/TarjetaProducto";

function ListaProductos(props) {
  return (
    <section id="productos">
      {props.productos.map(function (producto) {
        var esFavorito = props.favoritos.indexOf(producto.codigo) != -1;

        return (
          <TarjetaProducto
            key={producto.codigo}
            producto={producto}
            esFavorito={esFavorito}
            onFavorito={props.onFavorito}
          />
        );
      })}
    </section>
  );
}

export default ListaProductos;
