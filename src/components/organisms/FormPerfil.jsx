import { useState } from "react";
import { Form } from "react-bootstrap";
import Campo from "../molecules/Campo";
import Mensaje from "../atoms/Mensaje";
import Boton from "../atoms/Boton";

function FormPerfil(props) {
  const usuario = props.usuario;
  const [telefono, setTelefono] = useState(usuario.telefono || "");
  const [direccion, setDireccion] = useState(usuario.direccion || "");
  const [comuna, setComuna] = useState(usuario.comuna || "");
  const [referencia, setReferencia] = useState(usuario.referencia || "");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  function guardar(e) {
    e.preventDefault();
    var numeros = /^[0-9]+$/;

    if (telefono.trim() == "" || !numeros.test(telefono.trim()) || telefono.trim().length < 8) {
      setMensaje("El teléfono debe tener al menos 8 números.");
      setTipo("error");
      return;
    }

    if (direccion.trim() == "") {
      setMensaje("La dirección es obligatoria.");
      setTipo("error");
      return;
    }

    if (comuna == "") {
      setMensaje("Selecciona la comuna.");
      setTipo("error");
      return;
    }

    if (referencia.trim().length < 5) {
      setMensaje("La referencia debe tener al menos 5 caracteres.");
      setTipo("error");
      return;
    }

    var actualizado = {
      ...usuario,
      telefono: telefono.trim(),
      direccion: direccion.trim(),
      comuna: comuna,
      referencia: referencia.trim()
    };

    localStorage.setItem("usuario", JSON.stringify(actualizado));
    localStorage.setItem("telefono", actualizado.telefono);
    localStorage.setItem("direccion", actualizado.direccion);
    localStorage.setItem("comuna", actualizado.comuna);
    localStorage.setItem("referencia", actualizado.referencia);

    setMensaje("Datos guardados.");
    setTipo("ok");
    props.onGuardar(actualizado);
  }

  var cambio = "No indicado";
  if (usuario.cambioCilindro == "si") {
    cambio = "Sí";
  } else if (usuario.cambioCilindro == "no") {
    cambio = "No";
  }

  return (
    <Form className="formulario" onSubmit={guardar} noValidate>
      <Mensaje texto={mensaje} tipo={tipo} />

      <p className="dato-perfil"><strong>Nombre: </strong>{usuario.nombre} {usuario.apellido}</p>
      <p className="dato-perfil"><strong>Correo: </strong>{usuario.correo}</p>
      {usuario.fecha && (
        <p className="dato-perfil"><strong>Fecha de nacimiento: </strong>{usuario.fecha}</p>
      )}
      <p className="dato-perfil"><strong>Tipo de lugar: </strong>{usuario.tipoCliente || "No indicado"}</p>
      <p className="dato-perfil"><strong>Cilindro vacío para cambio: </strong>{cambio}</p>

      <Campo id="telefonoPerfil" label="Teléfono" value={telefono} onChange={function (e) { setTelefono(e.target.value); }} />
      <Campo id="direccionPerfil" label="Dirección de despacho" value={direccion} onChange={function (e) { setDireccion(e.target.value); }} />

      <Campo id="comunaPerfil" label="Comuna" tipo="select" value={comuna} onChange={function (e) { setComuna(e.target.value); }}>
        <option value="">Selecciona una comuna</option>
        <option value="Chillán">Chillán</option>
        <option value="Chillán Viejo">Chillán Viejo</option>
        <option value="San Carlos">San Carlos</option>
        <option value="Bulnes">Bulnes</option>
        <option value="Quillón">Quillón</option>
        <option value="Yungay">Yungay</option>
      </Campo>

      <Campo id="referenciaPerfil" label="Referencia para el despacho" tipo="textarea" value={referencia} onChange={function (e) { setReferencia(e.target.value); }} />

      <Boton type="submit">Guardar datos</Boton>
    </Form>
  );
}

export default FormPerfil;
