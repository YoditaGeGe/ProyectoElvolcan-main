import { Alert } from "react-bootstrap";

function Mensaje(props) {
  if (!props.texto) {
    return null;
  }

  var variante = "danger";
  if (props.tipo == "ok") {
    variante = "success";
  }

  return <Alert variant={variante}>{props.texto}</Alert>;
}

export default Mensaje;
