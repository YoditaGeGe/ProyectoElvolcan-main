import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import Campo from "../molecules/Campo";
import Mensaje from "../atoms/Mensaje";
import Boton from "../atoms/Boton";
import admin from "../../datos/admin";

function FormLogin(props) {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [tipo, setTipo] = useState("");

  function entrar(e) {
    e.preventDefault();

    var correoOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var correoLimpio = correo.trim();

    setMensaje("");
    setTipo("");

    if (correoLimpio == "") {
      setMensaje("El correo es obligatorio.");
      setTipo("error");
      return;
    }

    if (!correoOk.test(correoLimpio)) {
      setMensaje("El correo no tiene un formato válido.");
      setTipo("error");
      return;
    }

    if (clave == "") {
      setMensaje("La contraseña es obligatoria.");
      setTipo("error");
      return;
    }

    if (clave.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      setTipo("error");
      return;
    }

    // credencial fija del enunciado
    if (correoLimpio == admin.correo && clave == admin.clave) {
      localStorage.setItem("sesion", "si");
      localStorage.setItem("esAdmin", "si");
      localStorage.setItem("usuario", JSON.stringify({
        nombre: admin.nombre,
        apellido: admin.apellido,
        correo: admin.correo,
        telefono: admin.telefono,
        direccion: admin.direccion,
        comuna: admin.comuna,
        tipoCliente: admin.tipoCliente,
        referencia: admin.referencia,
        cambioCilindro: admin.cambioCilindro,
        fecha: admin.fecha
      }));
      props.setSesion(true);
      props.setEsAdmin(true);
      alert("Inicio de sesión correcto.");
      navigate("/");
      return;
    }

    var correoGuardado = localStorage.getItem("correo");
    var claveGuardada = localStorage.getItem("clave");

    if (correoLimpio == correoGuardado && clave == claveGuardada) {
      localStorage.setItem("sesion", "si");
      localStorage.removeItem("esAdmin");
      localStorage.setItem("usuario", JSON.stringify({
        nombre: localStorage.getItem("nombre"),
        apellido: localStorage.getItem("apellido"),
        correo: correoGuardado,
        telefono: localStorage.getItem("telefono"),
        direccion: localStorage.getItem("direccion"),
        comuna: localStorage.getItem("comuna") || "",
        tipoCliente: localStorage.getItem("tipoCliente") || "",
        referencia: localStorage.getItem("referencia") || "",
        cambioCilindro: localStorage.getItem("cambioCilindro") || "",
        fecha: localStorage.getItem("fecha") || ""
      }));
      props.setEsAdmin(false);
      props.setSesion(true);
      alert("Inicio de sesión correcto.");
      navigate("/");
      return;
    }

    setMensaje("Correo o contraseña incorrectos. Si no tienes cuenta, regístrate.");
    setTipo("error");
  }

  return (
    <Form className="formulario" onSubmit={entrar} noValidate>
      <Mensaje texto={mensaje} tipo={tipo} />

      <Campo
        id="correo"
        label="Correo"
        value={correo}
        onChange={function (e) { setCorreo(e.target.value); }}
      />
      <Campo
        id="clave"
        label="Contraseña"
        tipo="password"
        value={clave}
        onChange={function (e) { setClave(e.target.value); }}
      />

      <Boton type="submit">Entrar</Boton>

      <p className="enlace-form">
        ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
      </p>
      <p className="enlace-form">
        <Link to="/">Volver al inicio</Link>
      </p>
    </Form>
  );
}

export default FormLogin;
