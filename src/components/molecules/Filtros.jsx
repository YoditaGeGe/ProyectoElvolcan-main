function Filtros(props) {
  return (
    <div className="filtros">
      <input
        type="text"
        placeholder="Buscar cilindro"
        value={props.texto}
        onChange={function (e) { props.setTexto(e.target.value); }}
      />

      <select value={props.kilos} onChange={function (e) { props.setKilos(e.target.value); }}>
        <option value="todos">Todos los kilos</option>
        <option value="5">5 kg</option>
        <option value="11">11 kg</option>
        <option value="15">15 kg</option>
        <option value="otros">Otros</option>
      </select>

      <button type="button" className="boton" onClick={props.onFavoritos}>
        {props.soloFav ? "Ver todos" : "Ver favoritos"}
      </button>
    </div>
  );
}

export default Filtros;
