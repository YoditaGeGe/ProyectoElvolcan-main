import { Link } from "react-router-dom";

function Boton(props) {
  var clase = "boton";

  if (props.secundario) {
    clase = "boton boton-secundario";
  }

  if (props.to) {
    return (
      <Link to={props.to} className={clase}>
        {props.children}
      </Link>
    );
  }

  return (
    <button type={props.type || "button"} className={clase} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Boton;
