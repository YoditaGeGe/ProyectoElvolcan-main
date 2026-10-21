function TituloSeccion(props) {
  return (
    <section className="titulo">
      <h2>{props.titulo}</h2>
      <p>{props.texto}</p>
    </section>
  );
}

export default TituloSeccion;
