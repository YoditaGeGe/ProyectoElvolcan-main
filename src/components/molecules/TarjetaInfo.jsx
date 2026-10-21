import Boton from "../atoms/Boton";

function TarjetaInfo(props) {
  return (
    <article>
      <h3>{props.titulo}</h3>
      <p>{props.texto}</p>
      {props.to && <Boton to={props.to}>{props.boton}</Boton>}
    </article>
  );
}

export default TarjetaInfo;
