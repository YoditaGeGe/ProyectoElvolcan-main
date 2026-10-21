import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import productosIniciales from "./datos/productosIniciales";
import Encabezado from "./components/organisms/Encabezado";
import Pie from "./components/organisms/Pie";
import RutaPrivada from "./components/RutaPrivada";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Producto from "./pages/Producto";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Carrito from "./pages/Carrito";
import Perfil from "./pages/Perfil";
import Panel from "./pages/Panel";
import Error404 from "./pages/Error404";

function leerLista(clave, valorInicial) {
  var texto = localStorage.getItem(clave);
  if (!texto) {
    return valorInicial;
  }
  return JSON.parse(texto);
}

function App() {
  const [productos, setProductos] = useState(function () {
    return leerLista("productos", productosIniciales);
  });
  const [carrito, setCarrito] = useState(function () {
    return leerLista("carrito", []);
  });
  const [favoritos, setFavoritos] = useState(function () {
    return leerLista("favoritos", []);
  });
  const [temaOscuro, setTemaOscuro] = useState(function () {
    return localStorage.getItem("temaOscuro") == "si";
  });
  const [sesion, setSesion] = useState(function () {
    return localStorage.getItem("sesion") == "si";
  });
  const [esAdmin, setEsAdmin] = useState(function () {
    return localStorage.getItem("esAdmin") == "si";
  });

  useEffect(function () {
    localStorage.setItem("productos", JSON.stringify(productos));
  }, [productos]);

  useEffect(function () {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  useEffect(function () {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(function () {
    localStorage.setItem("temaOscuro", temaOscuro ? "si" : "no");

    if (temaOscuro) {
      document.body.classList.add("oscuro");
    } else {
      document.body.classList.remove("oscuro");
    }
  }, [temaOscuro]);

  function agregarAlCarrito(producto, cantidad) {
    var enCarrito = 0;
    var nuevo = carrito.map(function (item) {
      return { ...item };
    });

    var existe = nuevo.find(function (item) {
      return item.codigo == producto.codigo;
    });

    if (existe) {
      enCarrito = Number(existe.cantidad);
    }

    if (enCarrito + cantidad > Number(producto.stock)) {
      alert("No hay suficiente stock. Quedan " + producto.stock + ".");
      return false;
    }

    if (existe) {
      existe.cantidad = existe.cantidad + cantidad;
    } else {
      nuevo.push({
        codigo: producto.codigo,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: cantidad
      });
    }

    setCarrito(nuevo);
    return true;
  }

  function eliminarDelCarrito(codigo) {
    var nuevo = carrito.filter(function (item) {
      return item.codigo != codigo;
    });
    setCarrito(nuevo);
  }

  function vaciarCarrito() {
    setCarrito([]);
  }

  function toggleFavorito(codigo) {
    var yaEsta = favoritos.indexOf(codigo) != -1;

    if (yaEsta) {
      setFavoritos(favoritos.filter(function (item) {
        return item != codigo;
      }));
    } else {
      setFavoritos(favoritos.concat(codigo));
    }
  }

  function agregarProducto(datos) {
    // imagen generica para no cargar un archivo
    var nuevoProducto = {
      codigo: String(Date.now()),
      nombre: datos.nombre,
      resumen: datos.descripcion,
      descripcion: datos.descripcion,
      precio: Number(datos.precio),
      imagen: "/img/gas11kg.png",
      extra: "Peso: " + datos.kilos + " kg. Uso: " + datos.tipo + ". Despacho a domicilio en Chillán.",
      kilos: Number(datos.kilos),
      tipo: datos.tipo,
      stock: Number(datos.stock)
    };

    setProductos(productos.concat(nuevoProducto));
  }

  function editarProducto(codigo, datos) {
    var lista = productos.map(function (producto) {
      if (producto.codigo != codigo) {
        return producto;
      }

      return {
        ...producto,
        nombre: datos.nombre,
        resumen: datos.descripcion,
        descripcion: datos.descripcion,
        precio: Number(datos.precio),
        extra: "Peso: " + datos.kilos + " kg. Uso: " + datos.tipo + ". Despacho a domicilio en Chillán.",
        kilos: Number(datos.kilos),
        tipo: datos.tipo,
        stock: Number(datos.stock)
      };
    });

    setProductos(lista);
  }

  function eliminarProducto(codigo) {
    setProductos(productos.filter(function (producto) {
      return producto.codigo != codigo;
    }));
    setFavoritos(favoritos.filter(function (item) {
      return item != codigo;
    }));
  }

  function cerrarSesion() {
    localStorage.removeItem("sesion");
    localStorage.removeItem("esAdmin");
    setSesion(false);
    setEsAdmin(false);
  }

  var cantidadCarrito = 0;
  carrito.forEach(function (item) {
    cantidadCarrito = cantidadCarrito + Number(item.cantidad);
  });

  return (
    <div>
      <Encabezado
        sesion={sesion}
        esAdmin={esAdmin}
        cantidad={cantidadCarrito}
        temaOscuro={temaOscuro}
        onTema={function () { setTemaOscuro(!temaOscuro); }}
        onCerrar={cerrarSesion}
      />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={
            <Productos
              productos={productos}
              favoritos={favoritos}
              onFavorito={toggleFavorito}
            />
          }
        />
        <Route
          path="/producto/:codigo"
          element={
            <Producto
              productos={productos}
              favoritos={favoritos}
              onFavorito={toggleFavorito}
              agregarAlCarrito={agregarAlCarrito}
            />
          }
        />
        <Route path="/login" element={<Login setSesion={setSesion} setEsAdmin={setEsAdmin} />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              onEliminar={eliminarDelCarrito}
              onVaciar={vaciarCarrito}
              vaciarCarrito={vaciarCarrito}
            />
          }
        />
        <Route
          path="/perfil"
          element={
            <RutaPrivada>
              <Perfil />
            </RutaPrivada>
          }
        />
        <Route
          path="/panel"
          element={
            <RutaPrivada soloAdmin>
              <Panel
                productos={productos}
                agregarProducto={agregarProducto}
                editarProducto={editarProducto}
                eliminarProducto={eliminarProducto}
              />
            </RutaPrivada>
          }
        />
        <Route path="*" element={<Error404 />} />
      </Routes>

      <Pie />
    </div>
  );
}

export default App;
