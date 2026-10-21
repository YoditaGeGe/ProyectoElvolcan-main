import { useEffect, useState } from "react";
import TituloSeccion from "../components/molecules/TituloSeccion";
import FormProducto from "../components/organisms/FormProducto";
import ListaAdmin from "../components/organisms/ListaAdmin";
import Mensaje from "../components/atoms/Mensaje";

function Panel(props) {
  const [editando, setEditando] = useState(null);
  const [aviso, setAviso] = useState("");

  useEffect(function () {
    document.title = "Gas El Volcán | Panel";
  }, []);

  function guardar(datos) {
    if (editando) {
      props.editarProducto(editando.codigo, datos);
      setEditando(null);
      setAviso("Producto actualizado.");
    } else {
      props.agregarProducto(datos);
      setAviso("Producto agregado al catálogo.");
    }
  }

  function borrar(codigo) {
    var seguro = window.confirm("¿Seguro que quieres eliminar este producto?");
    if (!seguro) {
      return;
    }

    props.eliminarProducto(codigo);

    if (editando && editando.codigo == codigo) {
      setEditando(null);
    }

    setAviso("Producto eliminado.");
  }

  return (
    <main>
      <TituloSeccion
        titulo="Panel de control"
        texto="Agrega o modifica los cilindros del catálogo. La imagen de los productos nuevos es genérica."
      />

      <FormProducto
        producto={editando}
        onGuardar={guardar}
        onCancelar={function () { setEditando(null); }}
      />

      {aviso && (
        <section className="carrito-seccion">
          <Mensaje texto={aviso} tipo="ok" />
        </section>
      )}

      <ListaAdmin
        productos={props.productos}
        onEditar={setEditando}
        onEliminar={borrar}
      />
    </main>
  );
}

export default Panel;
