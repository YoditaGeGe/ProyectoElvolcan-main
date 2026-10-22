import { describe, expect, it, vi } from "vitest";
import Boton from "../src/components/atoms/Boton";
import Mensaje from "../src/components/atoms/Mensaje";
import Filtros from "../src/components/molecules/Filtros";
import TarjetaProducto from "../src/components/molecules/TarjetaProducto";
import TituloSeccion from "../src/components/molecules/TituloSeccion";
import productosIniciales from "../src/datos/productosIniciales";
import { formatoPrecio, normalizarImagen } from "../src/util/ayudas";

describe("utilidades de la tienda", function () {
  it("formatea un precio entero con el signo y separador local", function () {
    // Arrange
    var precio = 10000;

    // Act
    var resultado = formatoPrecio(precio);

    // Assert
    expect(resultado).toBe("$10.000");
  });

  it("convierte valores numéricos almacenados como texto", function () {
    // Arrange
    var precio = "25000";

    // Act
    var resultado = formatoPrecio(precio);

    // Assert
    expect(resultado).toBe("$25.000");
  });

  it("usa la imagen de gas de 11 kg cuando no se informa una imagen", function () {
    // Arrange
    var imagen = "";

    // Act
    var resultado = normalizarImagen(imagen);

    // Assert
    expect(resultado).toBe("/img/gas11kg.png");
  });

  it("normaliza rutas antiguas que contienen la carpeta img", function () {
    // Arrange
    var imagen = "/proyecto/public/img/gas5kg.png";

    // Act
    var resultado = normalizarImagen(imagen);

    // Assert
    expect(resultado).toBe("/img/gas5kg.png");
  });
});

describe("catálogo inicial", function () {
  it("incluye los tres formatos comerciales esperados", function () {
    // Arrange
    var kilos = productosIniciales.map(function (producto) { return producto.kilos; });

    // Act
    var cantidadDeProductos = productosIniciales.length;

    // Assert
    expect(cantidadDeProductos).toBe(3);
    expect(kilos).toEqual([5, 11, 15]);
  });

  it("define datos de venta válidos para cada producto", function () {
    // Arrange
    var productos = productosIniciales;

    // Act
    var productosInvalidos = productos.filter(function (producto) {
      return !producto.codigo || !producto.nombre || producto.precio <= 0 || producto.stock <= 0;
    });

    // Assert
    expect(productosInvalidos).toHaveLength(0);
  });
});

describe("componentes atómicos y de presentación", function () {
  it("crea un botón nativo con tipo button por defecto", function () {
    // Arrange
    var onClick = vi.fn();

    // Act
    var boton = Boton({ onClick: onClick, children: "Comprar" });

    // Assert
    expect(boton.type).toBe("button");
    expect(boton.props.type).toBe("button");
    expect(boton.props.children).toBe("Comprar");
  });

  it("crea un enlace cuando el botón recibe una ruta", function () {
    // Arrange
    var destino = "/productos";

    // Act
    var enlace = Boton({ to: destino, children: "Ver productos" });

    // Assert
    expect(enlace.props.to).toBe(destino);
    expect(enlace.props.className).toBe("boton");
    expect(enlace.props.children).toBe("Ver productos");
  });

  it("oculta el mensaje cuando no hay texto", function () {
    // Arrange
    var props = { texto: "" };

    // Act
    var resultado = Mensaje(props);

    // Assert
    expect(resultado).toBeNull();
  });

  it("muestra un mensaje exitoso con la variante success", function () {
    // Arrange
    var props = { texto: "Sesión iniciada", tipo: "ok" };

    // Act
    var mensaje = Mensaje(props);

    // Assert
    expect(mensaje.props.variant).toBe("success");
    expect(mensaje.props.children).toBe("Sesión iniciada");
  });

  it("renderiza el título y la descripción de una sección", function () {
    // Arrange
    var props = { titulo: "Nuestros productos", texto: "Catálogo disponible" };

    // Act
    var seccion = TituloSeccion(props);
    var hijos = seccion.props.children;

    // Assert
    expect(hijos[0].props.children).toBe("Nuestros productos");
    expect(hijos[1].props.children).toBe("Catálogo disponible");
  });
});

describe("componentes del catálogo", function () {
  it("expone los filtros recibidos como valores controlados", function () {
    // Arrange
    var props = {
      texto: "Gas",
      setTexto: vi.fn(),
      kilos: "11",
      setKilos: vi.fn(),
      soloFav: false,
      onFavoritos: vi.fn()
    };

    // Act
    var filtros = Filtros(props);
    var controles = filtros.props.children;

    // Assert
    expect(controles[0].props.value).toBe("Gas");
    expect(controles[1].props.value).toBe("11");
    expect(controles[2].props.children).toBe("Ver favoritos");
  });

  it("muestra Quitar favorito para un producto marcado", function () {
    // Arrange
    var producto = productosIniciales[0];
    var onFavorito = vi.fn();

    // Act
    var tarjeta = TarjetaProducto({
      producto: producto,
      esFavorito: true,
      onFavorito: onFavorito
    });
    var acciones = tarjeta.props.children;
    var botonFavorito = acciones[5];

    // Assert
    expect(botonFavorito.props.children).toBe("Quitar favorito");
    botonFavorito.props.onClick();
    expect(onFavorito).toHaveBeenCalledWith(producto.codigo);
  });
});
