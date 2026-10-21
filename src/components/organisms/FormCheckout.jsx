import { useState } from "react";
import { Form } from "react-bootstrap";
import Campo from "../molecules/Campo";
import Mensaje from "../atoms/Mensaje";
import Boton from "../atoms/Boton";

function FormCheckout(props) {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [pago, setPago] = useState("");
  const [horario, setHorario] = useState("");
  const [comentario, setComentario] = useState("");
  const [mensaje, setMensaje] = useState("");

  function confirmar(e) {
    e.preventDefault();

    if (nombre.trim().length < 2) {
      setMensaje("Escribe el nombre de quien recibe.");
      return;
    }

    if (direccion.trim() == "") {
      setMensaje("La dirección de despacho es obligatoria.");
      return;
    }

    if (comuna == "") {
      setMensaje("Selecciona la comuna.");
      return;
    }

    if (pago == "") {
      setMensaje("Selecciona el medio de pago.");
      return;
    }

    if (horario == "") {
      setMensaje("Selecciona un horario de despacho.");
      return;
    }

    setMensaje("");
    props.onConfirmar({
      nombre: nombre.trim(),
      direccion: direccion.trim(),
      comuna: comuna,
      pago: pago,
      horario: horario,
      comentario: comentario.trim()
    });
  }

  return (
    <Form className="formulario" onSubmit={confirmar} noValidate>
      <h3>Datos para el despacho</h3>
      <Mensaje texto={mensaje} tipo="error" />

      <Campo id="recibe" label="Nombre de quien recibe" value={nombre} onChange={function (e) { setNombre(e.target.value); }} />
      <Campo id="direccionPago" label="Dirección" value={direccion} onChange={function (e) { setDireccion(e.target.value); }} />

      <Campo id="comunaPago" label="Comuna" tipo="select" value={comuna} onChange={function (e) { setComuna(e.target.value); }}>
        <option value="">Selecciona una comuna</option>
        <option value="Chillán">Chillán</option>
        <option value="Chillán Viejo">Chillán Viejo</option>
        <option value="San Carlos">San Carlos</option>
        <option value="Bulnes">Bulnes</option>
        <option value="Quillón">Quillón</option>
        <option value="Yungay">Yungay</option>
      </Campo>

      <Campo id="pago" label="Medio de pago" tipo="select" value={pago} onChange={function (e) { setPago(e.target.value); }}>
        <option value="">Selecciona</option>
        <option value="Efectivo">Efectivo</option>
        <option value="Transferencia">Transferencia</option>
        <option value="Débito">Débito</option>
      </Campo>

      <Campo id="horario" label="Horario de despacho" tipo="select" value={horario} onChange={function (e) { setHorario(e.target.value); }}>
        <option value="">Selecciona</option>
        <option value="Mañana">Mañana (8:00 a 14:00)</option>
        <option value="Tarde">Tarde (14:00 a 20:00)</option>
      </Campo>

      <Campo id="comentario" label="Comentario para el repartidor" tipo="textarea" value={comentario} onChange={function (e) { setComentario(e.target.value); }} />

      <Boton type="submit">Confirmar pedido</Boton>
    </Form>
  );
}

export default FormCheckout;
