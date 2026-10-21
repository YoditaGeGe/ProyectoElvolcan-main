import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Campo from "../molecules/Campo";
import Mensaje from "../atoms/Mensaje";
import Boton from "../atoms/Boton";

function FormRegistro() {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [comuna, setComuna] = useState("");
  const [tipoCliente, setTipoCliente] = useState("");
  const [referencia, setReferencia] = useState("");
  const [cambioCilindro, setCambioCilindro] = useState("");
  const [fecha, setFecha] = useState("");
  const [clave, setClave] = useState("");
  const [clave2, setClave2] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  function mostrarError(texto) {
    setMensaje(texto);
    setTipo("error");
  }

  function registrar(e) {
    e.preventDefault();

    var letras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
    var correoOk = /^[^\s@]+@(gmail\.com|hotmail\.com|outlook\.com|live\.com|msn\.com)$/i;
    var numeros = /^[0-9]+$/;

    var nombreLimpio = nombre.trim();
    var apellidoLimpio = apellido.trim();
    var correoLimpio = correo.trim();
    var telefonoLimpio = telefono.trim();
    var direccionLimpia = direccion.trim();
    var referenciaLimpia = referencia.trim();

    setMensaje("");
    setTipo("");

    if (nombreLimpio == "") {
      mostrarError("El nombre es obligatorio.");
      return;
    }

    if (nombreLimpio.length < 2) {
      mostrarError("El nombre debe tener al menos 2 caracteres.");
      return;
    }

    if (nombreLimpio.length > 30) {
      mostrarError("El nombre no puede tener más de 30 caracteres.");
      return;
    }

    if (!letras.test(nombreLimpio)) {
      mostrarError("El nombre solo debe contener letras.");
      return;
    }

    if (apellidoLimpio == "") {
      mostrarError("El apellido es obligatorio.");
      return;
    }

    if (apellidoLimpio.length < 2) {
      mostrarError("El apellido debe tener al menos 2 caracteres.");
      return;
    }

    if (apellidoLimpio.length > 30) {
      mostrarError("El apellido no puede tener más de 30 caracteres.");
      return;
    }

    if (!letras.test(apellidoLimpio)) {
      mostrarError("El apellido solo debe contener letras.");
      return;
    }

    if (correoLimpio == "") {
      mostrarError("El correo es obligatorio.");
      return;
    }

    if (!correoOk.test(correoLimpio)) {
      mostrarError("El correo no tiene un formato válido.");
      return;
    }

    if (telefonoLimpio == "") {
      mostrarError("El teléfono es obligatorio.");
      return;
    }

    if (!numeros.test(telefonoLimpio)) {
      mostrarError("El teléfono solo debe contener números.");
      return;
    }

    if (telefonoLimpio.length < 8) {
      mostrarError("El teléfono debe tener al menos 8 números.");
      return;
    }

    if (direccionLimpia == "") {
      mostrarError("La dirección es obligatoria.");
      return;
    }

    if (comuna == "") {
      mostrarError("La comuna es obligatoria.");
      return;
    }

    if (tipoCliente == "") {
      mostrarError("Indica si eres casa, departamento o negocio.");
      return;
    }

    if (referenciaLimpia == "") {
      mostrarError("La referencia de despacho es obligatoria.");
      return;
    }

    if (referenciaLimpia.length < 5) {
      mostrarError("La referencia debe tener al menos 5 caracteres.");
      return;
    }

    if (cambioCilindro == "") {
      mostrarError("Indica si tienes un cilindro vacío para el cambio.");
      return;
    }

    if (fecha == "") {
      mostrarError("La fecha de nacimiento es obligatoria.");
      return;
    }

    var nacimiento = new Date(fecha + "T00:00:00");
    var hoy = new Date();
    var edad = hoy.getFullYear() - nacimiento.getFullYear();
    var aunNoCumple =
      hoy.getMonth() < nacimiento.getMonth() ||
      (hoy.getMonth() == nacimiento.getMonth() && hoy.getDate() < nacimiento.getDate());

    if (aunNoCumple) {
      edad--;
    }

    if (edad < 18) {
      mostrarError("Debes tener al menos 18 años para registrarte.");
      return;
    }

    if (clave == "") {
      mostrarError("La contraseña es obligatoria.");
      return;
    }

    if (clave.length < 6) {
      mostrarError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (clave2 == "") {
      mostrarError("Debes confirmar la contraseña.");
      return;
    }

    if (clave != clave2) {
      mostrarError("Las contraseñas no coinciden.");
      return;
    }

    localStorage.setItem("nombre", nombreLimpio);
    localStorage.setItem("apellido", apellidoLimpio);
    localStorage.setItem("correo", correoLimpio);
    localStorage.setItem("telefono", telefonoLimpio);
    localStorage.setItem("direccion", direccionLimpia);
    localStorage.setItem("comuna", comuna);
    localStorage.setItem("tipoCliente", tipoCliente);
    localStorage.setItem("referencia", referenciaLimpia);
    localStorage.setItem("cambioCilindro", cambioCilindro);
    localStorage.setItem("fecha", fecha);
    localStorage.setItem("clave", clave);

    alert("Registro correcto. Ahora inicia sesión.");
    navigate("/login");
  }

  return (
    <Form className="formulario" onSubmit={registrar} noValidate>
      <Mensaje texto={mensaje} tipo={tipo} />

      <Campo id="nombre" label="Nombre" value={nombre} onChange={function (e) { setNombre(e.target.value); }} />
      <Campo id="apellido" label="Apellido" value={apellido} onChange={function (e) { setApellido(e.target.value); }} />
      <Campo id="correo" label="Correo electrónico" value={correo} onChange={function (e) { setCorreo(e.target.value); }} />
      <Campo id="telefono" label="Teléfono" value={telefono} onChange={function (e) { setTelefono(e.target.value); }} />
      <Campo id="direccion" label="Dirección de despacho" value={direccion} onChange={function (e) { setDireccion(e.target.value); }} />

      <Campo id="comuna" label="Comuna" tipo="select" value={comuna} onChange={function (e) { setComuna(e.target.value); }}>
        <option value="">Selecciona una comuna</option>
        <option value="Chillán">Chillán</option>
        <option value="Chillán Viejo">Chillán Viejo</option>
        <option value="San Carlos">San Carlos</option>
        <option value="Bulnes">Bulnes</option>
        <option value="Quillón">Quillón</option>
        <option value="Yungay">Yungay</option>
      </Campo>

      <Campo id="tipoCliente" label="Tipo de lugar" tipo="select" value={tipoCliente} onChange={function (e) { setTipoCliente(e.target.value); }}>
        <option value="">Selecciona</option>
        <option value="Casa">Casa</option>
        <option value="Departamento">Departamento</option>
        <option value="Negocio">Negocio</option>
      </Campo>

      <Campo id="referencia" label="Referencia para el despacho" tipo="textarea" value={referencia} onChange={function (e) { setReferencia(e.target.value); }} />

      <Campo id="cambioCilindro" label="¿Tienes cilindro vacío para el cambio?" tipo="select" value={cambioCilindro} onChange={function (e) { setCambioCilindro(e.target.value); }}>
        <option value="">Selecciona</option>
        <option value="si">Sí</option>
        <option value="no">No</option>
      </Campo>

      <Campo id="fecha" label="Fecha de nacimiento" tipo="date" value={fecha} onChange={function (e) { setFecha(e.target.value); }} />
      <Campo id="clave" label="Contraseña" tipo="password" value={clave} onChange={function (e) { setClave(e.target.value); }} />
      <Campo id="clave2" label="Confirmar contraseña" tipo="password" value={clave2} onChange={function (e) { setClave2(e.target.value); }} />

      <Boton type="submit">Registrarse</Boton>

      <p className="enlace-form">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
      <p className="enlace-form">
        <Link to="/">Volver al inicio</Link>
      </p>
    </Form>
  );
}

export default FormRegistro;
