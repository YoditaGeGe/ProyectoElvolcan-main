import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";
import { formatoPrecio, normalizarImagen } from "../../util/ayudas";

function DetalleProducto(props) {
  const navigate = useNavigate();
  const producto = props.producto;
  const [verInfo, setVerInfo] = useState(false);
  const [cantidad, setCantidad] = useState(1);
  const [totalTexto, setTotalTexto] = useState("");

  useEffect(function () {
    if (producto) {
      setCantidad(1);
      setVerInfo(false);
      setTotalTexto("Total: " + formatoPrecio(producto.precio));
    }
  }, [producto]);

  if (!producto) {
    return (
      <section className="titulo">
        <h2>Producto no encontrado</h2>
        <p>Vuelve a la página de productos y elige un cilindro.</p>
        <Boton to="/productos">Volver al catálogo</Boton>
      </section>
    );
  }

  var textoFavorito = "Favorito";
  if (props.esFavorito) {
    textoFavorito = "Quitar favorito";
  }

  var textoInfo = "Ver más información";
  if (verInfo) {
    textoInfo = "Ocultar información";
  }

  function calcularTotal() {
    if (cantidad === "" || parseInt(cantidad) < 1) {
      setTotalTexto("Ingresa una cantidad válida.");
      return;
    }

    var total = producto.precio * parseInt(cantidad);
    setTotalTexto("Total: " + formatoPrecio(total));
  }

  function agregar() {
    if (cantidad === "" || parseInt(cantidad) < 1) {
      alert("Selecciona una cantidad.");
      return;
    }

    var agregado = props.agregarAlCarrito(producto, parseInt(cantidad));
    if (agregado) {
      navigate("/carrito");
    }
  }

  return (
    <section className="detalle-producto">
      <img src={normalizarImagen(producto.imagen)} alt={producto.nombre} />

      <div className="informacion-producto">
        <h2>{producto.nombre}</h2>
        <p>{producto.descripcion}</p>
        <strong>{formatoPrecio(producto.precio)}</strong>
        <p>{producto.extra}</p>
        <p>Stock disponible: {producto.stock}</p>

        <button type="button" className="boton" onClick={function () { setVerInfo(!verInfo); }}>
          {textoInfo}
        </button>

        {verInfo && (
          <div className="info-extra">
            <p>El cilindro se entrega lleno y listo para usar.</p>
            <p>El cambio se puede hacer en tu domicilio.</p>
            <p>Horario de despacho: lunes a sábado de 8:00 a 20:00.</p>
          </div>
        )}

        <label htmlFor="cantidad">Cantidad</label>
        <input
          type="number"
          id="cantidad"
          value={cantidad}
          min="1"
          onChange={function (e) { setCantidad(e.target.value); }}
        />

        <p id="total">{totalTexto}</p>

        <button type="button" className="boton" onClick={calcularTotal}>
          Calcular total
        </button>

        <button type="button" className="boton" onClick={agregar}>
          Agregar
        </button>

        <button type="button" className="boton boton-secundario" onClick={function () { props.onFavorito(producto.codigo); }}>
          {textoFavorito}
        </button>

        <p className="volver">
          <Link to="/productos">Volver al catálogo</Link>
        </p>
      </div>
    </section>
  );
}

export default DetalleProducto;
