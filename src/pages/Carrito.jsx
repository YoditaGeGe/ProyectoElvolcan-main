import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TituloSeccion from "../components/molecules/TituloSeccion";
import ItemCarrito from "../components/molecules/ItemCarrito";
import FormCheckout from "../components/organisms/FormCheckout";
import Boton from "../components/atoms/Boton";
import { formatoPrecio } from "../util/ayudas";

function Carrito(props) {
  const [pedidoHecho, setPedidoHecho] = useState(false);

  useEffect(function () {
    document.title = "Gas El Volcán | Carrito";
  }, []);

  var cantidad = 0;
  var total = 0;

  props.carrito.forEach(function (item) {
    cantidad = cantidad + Number(item.cantidad);
    total = total + item.precio * item.cantidad;
  });

  function confirmar(datos) {
    var pedido = {
      datos: datos,
      total: total,
      productos: props.carrito
    };
    localStorage.setItem("ultimoPedido", JSON.stringify(pedido));
    props.vaciarCarrito();
    setPedidoHecho(true);
  }

  return (
    <main>
      <TituloSeccion
        titulo="Tu carrito"
        texto="Revisa los productos y el total de tu pedido."
      />

      <section className="carrito-seccion">
        {props.carrito.length == 0 ? (
          <p className="carrito-vacio">
            {pedidoHecho ? "Pedido registrado. Te contactaremos para el despacho." : "Tu carrito está vacío."}
          </p>
        ) : (
          props.carrito.map(function (item) {
            return (
              <ItemCarrito
                key={item.codigo}
                item={item}
                onEliminar={props.onEliminar}
              />
            );
          })
        )}

        {props.carrito.length > 0 && (
          <div className="resumen-carrito">
            <p>Total de productos: <strong>{cantidad}</strong></p>
            <p className="total-carrito">Total: <strong>{formatoPrecio(total)}</strong></p>
            <Boton secundario onClick={props.onVaciar}>Vaciar carrito</Boton>
            <Boton to="/productos">Seguir comprando</Boton>
          </div>
        )}

        {props.carrito.length == 0 && !pedidoHecho && (
          <p className="enlace-form centro-texto">
            <Link to="/productos">Ir a productos</Link>
          </p>
        )}
      </section>

      {props.carrito.length > 0 && <FormCheckout onConfirmar={confirmar} />}
    </main>
  );
}

export default Carrito;
