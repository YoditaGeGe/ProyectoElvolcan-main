import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Campo from "../molecules/Campo";
import Mensaje from "../atoms/Mensaje";
import Boton from "../atoms/Boton";

function FormProducto(props) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [kilos, setKilos] = useState("");
  const [tipo, setTipo] = useState("");
  const [stock, setStock] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(function () {
    setMensaje("");

    if (props.producto) {
      setNombre(props.producto.nombre);
      setDescripcion(props.producto.descripcion);
      setPrecio(props.producto.precio);
      setKilos(props.producto.kilos);
      setTipo(props.producto.tipo);
      setStock(props.producto.stock);
    } else {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setKilos("");
      setTipo("");
      setStock("");
    }
  }, [props.producto]);

  function guardar(e) {
    e.preventDefault();

    if (nombre.trim() == "" || nombre.trim().length < 3) {
      setMensaje("El nombre debe tener al menos 3 caracteres.");
      return;
    }

    if (descripcion.trim() == "" || descripcion.trim().length < 10) {
      setMensaje("La descripción debe tener al menos 10 caracteres.");
      return;
    }

    if (precio === "" || Number(precio) <= 0) {
      setMensaje("Ingresa un precio mayor a 0.");
      return;
    }

    if (kilos === "" || Number(kilos) <= 0) {
      setMensaje("Ingresa los kilos del cilindro.");
      return;
    }

    if (tipo == "") {
      setMensaje("Selecciona el tipo de uso.");
      return;
    }

    if (stock === "" || Number(stock) < 0) {
      setMensaje("El stock no puede ser negativo.");
      return;
    }

    props.onGuardar({
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: Number(precio),
      kilos: Number(kilos),
      tipo: tipo,
      stock: Number(stock)
    });

    if (!props.producto) {
      setNombre("");
      setDescripcion("");
      setPrecio("");
      setKilos("");
      setTipo("");
      setStock("");
    }
  }

  var textoBoton = "Agregar producto";
  if (props.producto) {
    textoBoton = "Guardar cambios";
  }

  return (
    <Form className="formulario" onSubmit={guardar} noValidate>
      <h3>{props.producto ? "Editar producto" : "Nuevo producto"}</h3>
      <p className="enlace-form">La foto queda genérica. No se sube archivo.</p>
      <Mensaje texto={mensaje} tipo="error" />

      <Campo id="nombreProducto" label="Nombre" value={nombre} onChange={function (e) { setNombre(e.target.value); }} />
      <Campo id="descripcionProducto" label="Descripción" tipo="textarea" value={descripcion} onChange={function (e) { setDescripcion(e.target.value); }} />
      <Campo id="precioProducto" label="Precio" tipo="number" value={precio} onChange={function (e) { setPrecio(e.target.value); }} />
      <Campo id="kilosProducto" label="Kilos del cilindro" tipo="number" value={kilos} onChange={function (e) { setKilos(e.target.value); }} />

      <Campo id="tipoProducto" label="Tipo de uso" tipo="select" value={tipo} onChange={function (e) { setTipo(e.target.value); }}>
        <option value="">Selecciona</option>
        <option value="Casa">Casa</option>
        <option value="Departamento">Departamento</option>
        <option value="Negocio">Negocio</option>
      </Campo>

      <Campo id="stockProducto" label="Stock" tipo="number" value={stock} onChange={function (e) { setStock(e.target.value); }} />

      <Boton type="submit">{textoBoton}</Boton>
      {props.producto && (
        <Boton secundario onClick={props.onCancelar}>Cancelar</Boton>
      )}
    </Form>
  );
}

export default FormProducto;
