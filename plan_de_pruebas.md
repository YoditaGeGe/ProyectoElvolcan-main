# Plan de Pruebas

## 1. Objetivo

Validar mediante pruebas unitarias con Vitest las reglas de negocio y los
componentes críticos de la tienda Gas El Volcán. El alcance busca comprobar
que los datos del catálogo se muestran correctamente, que las utilidades
mantienen el formato esperado y que los controles React producen la
configuración y las acciones esperadas.

## 2. Alcance

### Funcionalidades y componentes evaluados

- **Utilidades (`src/util/ayudas.js`)**: formato de precios y normalización
  de rutas de imágenes, incluyendo valores sin imagen y rutas heredadas.
- **Catálogo inicial (`src/datos/productosIniciales.js`)**: cantidad de
  presentaciones, kilos disponibles y consistencia de los datos de venta.
- **Botón (`Boton`)**: renderizado como botón nativo, tipo por defecto y
  navegación mediante enlace.
- **Mensajes (`Mensaje`)**: ausencia de renderizado sin texto y variante de
  éxito para confirmaciones.
- **Título de sección (`TituloSeccion`)**: presentación del título y su
  descripción.
- **Filtros (`Filtros`)**: conservación de texto, kilos y estado de
  favoritos como controles controlados.
- **Tarjeta de producto (`TarjetaProducto`)**: estado de favorito y envío del
  código correcto al callback.

## 3. Escenarios de prueba

| ID | Escenario | Resultado esperado |
| --- | --- | --- |
| UT-01 | Formatear un precio entero | Retorna el precio con `$` y separador de miles chileno. |
| UT-02 | Formatear un precio recibido como texto | Convierte el valor numérico y conserva el formato monetario. |
| UT-03 | Resolver una imagen vacía | Usa la imagen predeterminada de 11 kg. |
| UT-04 | Resolver una ruta antigua de imagen | Devuelve una ruta pública normalizada. |
| UT-05 | Revisar presentaciones iniciales | Existen exactamente los formatos de 5, 11 y 15 kg. |
| UT-06 | Revisar integridad del catálogo | Cada producto tiene identificación, nombre, precio y stock positivos. |
| UT-07 | Crear botón sin ruta | Produce un elemento `button` con tipo `button`. |
| UT-08 | Crear botón con ruta | Produce un enlace con la ruta y texto recibidos. |
| UT-09 | Ocultar mensaje vacío | El componente no produce elemento cuando no hay texto. |
| UT-10 | Confirmar operación exitosa | El mensaje usa la variante `success` y conserva su texto. |
| UT-11 | Renderizar título de sección | Conserva título y descripción en sus elementos correspondientes. |
| UT-12 | Conservar valores de filtros | Input, select y botón reflejan el estado recibido. |
| UT-13 | Marcar producto como favorito | Muestra “Quitar favorito” y notifica el código del producto. |

## 4. Estrategia y criterios

- Las pruebas se escriben con **Vitest** y usan el patrón **AAA**:
  **Arrange** (preparar), **Act** (ejecutar) y **Assert** (verificar).
- Se prueban salidas y callbacks reales de los módulos importados desde
  `src/`; no se reemplaza la lógica de producción con copias de prueba.
- Criterio de aprobación: las 13 pruebas deben finalizar correctamente con
  `npm test`.
- Criterio de regresión: `npm run build` debe continuar generando la
  aplicación sin errores.

## 5. Ejecución

```bash
npm install
npm test
npm run build
```

Para ejecutar Vitest en modo interactivo durante el desarrollo:

```bash
npm run test:watch
```
