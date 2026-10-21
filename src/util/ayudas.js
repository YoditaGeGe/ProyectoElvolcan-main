function formatoPrecio(precio) {
  return "$" + Number(precio).toLocaleString("es-CL");
}

function normalizarImagen(src) {
  if (!src) {
    return "/img/gas11kg.png";
  }

  var partes = src.split("img/");
  if (partes.length > 1) {
    return "/img/" + partes[1];
  }

  return src;
}

export { formatoPrecio, normalizarImagen };
