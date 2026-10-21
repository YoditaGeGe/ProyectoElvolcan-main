import { Link } from "react-router-dom";

function Encabezado(props) {
  var textoCarrito = "Carrito";
  if (props.cantidad > 0) {
    textoCarrito = "Carrito (" + props.cantidad + ")";
  }

  return (
    <header id="encabezado">
      <div className="contenedor">
        <Link to="/" className="logo">
          <img src="/img/header.png" alt="Logo Gas El Volcán" />
          <h1>Gas El Volcán</h1>
        </Link>

        <nav>
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/carrito">{textoCarrito}</Link>

          {props.sesion ? (
            <>
              <Link to="/perfil">Mi perfil</Link>
              {props.esAdmin && (
                <Link to="/panel">Panel</Link>
              )}
              <button type="button" className="nav-boton" onClick={props.onCerrar}>
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          )}

          <button type="button" className="boton-tema" onClick={props.onTema}>
            {props.temaOscuro ? "Modo claro" : "Modo oscuro"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Encabezado;
