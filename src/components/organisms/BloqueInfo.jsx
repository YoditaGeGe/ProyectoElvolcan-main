import TarjetaInfo from "../molecules/TarjetaInfo";

function BloqueInfo() {
  return (
    <section className="informacion">
      <TarjetaInfo
        titulo="Despacho a domicilio"
        texto="Llevamos tu cilindro de gas directamente hasta tu hogar."
      />
      <TarjetaInfo
        titulo="Productos disponibles"
        texto="Contamos con cilindros de 5, 11 y 15 kg."
        to="/productos"
        boton="Ver productos"
      />
      <TarjetaInfo
        titulo="Tu cuenta"
        texto="Crea una cuenta o inicia sesión para usar la tienda."
        to="/registro"
        boton="Registrarse"
      />
    </section>
  );
}

export default BloqueInfo;
