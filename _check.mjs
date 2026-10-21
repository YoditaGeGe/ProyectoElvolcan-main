import { chromium } from "playwright-core";
import fs from "fs";

const base = "http://localhost:5175";
const out = "C:/Users/yodit/AppData/Local/Temp/volcan-check";
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: true
});

const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errores = [];
page.on("dialog", (d) => d.accept());
page.on("pageerror", (err) => errores.push("pageerror: " + err.message));
page.on("console", (msg) => {
  if (msg.type() === "error") errores.push("console: " + msg.text());
});

function assert(cond, msg) {
  if (!cond) throw new Error(msg);
}

await page.goto(base + "/", { waitUntil: "networkidle" });
await page.screenshot({ path: out + "/01-inicio.png", fullPage: true });
assert(await page.locator("h1").innerText() === "Gas El Volcán", "titulo logo");
assert((await page.locator("h2").innerText()).includes("Chillán"), "h2 inicio");
const banner = page.locator("img.banner");
assert(await banner.evaluate((img) => img.naturalWidth > 0), "banner carga");

await page.getByRole("link", { name: "Productos" }).first().click();
await page.waitForURL("**/productos");
assert(await page.locator("article.producto").count() === 3, "3 productos");
await page.locator("select").selectOption("5");
assert(await page.locator("article.producto").count() === 1, "filtro 5kg");
assert((await page.locator("article.producto h3").innerText()) === "Gas 5 kg", "nombre 5kg");
await page.getByRole("button", { name: "Favorito", exact: true }).click();
await page.getByRole("button", { name: "Ver favoritos" }).click();
assert(await page.locator("article.producto").count() === 1, "solo favorito");
await page.screenshot({ path: out + "/02-productos.png", fullPage: true });

await page.getByRole("link", { name: "Ver producto" }).click();
await page.waitForURL("**/producto/5");
await page.getByRole("button", { name: "Ver más información" }).click();
assert(await page.locator(".info-extra").isVisible(), "info extra");
await page.locator("#cantidad").fill("2");
await page.getByRole("button", { name: "Calcular total" }).click();
assert((await page.locator("#total").innerText()).includes("20.000"), "total 2x10000");
await page.screenshot({ path: out + "/03-detalle.png", fullPage: true });
await page.getByRole("button", { name: "Agregar", exact: true }).click();
await page.waitForURL("**/carrito");
assert(await page.locator(".item-carrito").count() === 1, "item en carrito");
assert((await page.locator(".total-carrito").innerText()).includes("20.000"), "total carrito");

await page.getByRole("button", { name: "Confirmar pedido" }).click();
assert(await page.locator(".alert").isVisible(), "validacion checkout");
await page.locator("#recibe").fill("Juan Perez");
await page.locator("#direccionPago").fill("Calle Uno 123");
await page.locator("#comunaPago").selectOption("Chillán");
await page.locator("#pago").selectOption("Efectivo");
await page.locator("#horario").selectOption("Mañana");
await page.getByRole("button", { name: "Confirmar pedido" }).click();
assert((await page.locator(".carrito-vacio").innerText()).includes("Pedido registrado"), "pedido ok");
await page.screenshot({ path: out + "/04-carrito.png", fullPage: true });

await page.goto(base + "/panel");
await page.waitForURL("**/login");
await page.screenshot({ path: out + "/05-login.png", fullPage: true });
await page.locator("#correo").fill("malo@gmail.com");
await page.locator("#clave").fill("123456");
await page.getByRole("button", { name: "Entrar" }).click();
assert((await page.locator(".alert").innerText()).includes("incorrectos"), "login malo");

await page.locator("#correo").fill("admin@gaselvolcan.cl");
await page.locator("#clave").fill("admin123");
await page.getByRole("button", { name: "Entrar" }).click();
await page.waitForURL(base + "/");

await page.goto(base + "/panel");
await page.waitForURL("**/panel");
await page.locator("#nombreProducto").fill("Gas 45 kg");
await page.locator("#descripcionProducto").fill("Cilindro grande para negocio con mucho consumo.");
await page.locator("#precioProducto").fill("45000");
await page.locator("#kilosProducto").fill("45");
await page.locator("#tipoProducto").selectOption("Negocio");
await page.locator("#stockProducto").fill("4");
await page.getByRole("button", { name: "Agregar producto" }).click();
assert((await page.locator(".alert").innerText()).includes("agregado"), "aviso panel");
assert(await page.locator(".item-carrito", { hasText: "Gas 45 kg" }).count() === 1, "lista admin");
await page.screenshot({ path: out + "/06-panel.png", fullPage: true });

await page.locator(".item-carrito", { hasText: "Gas 45 kg" }).getByRole("button", { name: "Editar" }).click();
await page.locator("#precioProducto").fill("48000");
await page.getByRole("button", { name: "Guardar cambios" }).click();
assert((await page.locator(".item-carrito", { hasText: "Gas 45 kg" }).innerText()).includes("48.000"), "editado");

await page.goto(base + "/productos");
await page.locator("select").selectOption("otros");
assert(await page.locator("article.producto", { hasText: "Gas 45 kg" }).count() === 1, "nuevo en catalogo");
const imgNueva = page.locator("article.producto img").first();
assert(await imgNueva.evaluate((img) => img.naturalWidth > 0 && img.src.includes("gas11kg")), "imagen generica");

await page.goto(base + "/perfil");
assert((await page.locator(".dato-perfil").first().innerText()).includes("Admin"), "perfil admin");
await page.locator("#telefonoPerfil").fill("422998877");
await page.getByRole("button", { name: "Guardar datos" }).click();
assert((await page.locator(".alert").innerText()).includes("guardados"), "perfil guardado");
await page.screenshot({ path: out + "/07-perfil.png", fullPage: true });

await page.getByRole("button", { name: "Cerrar sesión" }).click();
await page.goto(base + "/panel");
await page.waitForURL("**/login");

await page.goto(base + "/registro");
await page.getByRole("button", { name: "Registrarse" }).click();
assert((await page.locator(".alert").innerText()).includes("nombre"), "validacion registro");
await page.screenshot({ path: out + "/08-registro.png", fullPage: true });

await page.goto(base + "/esto-no-existe");
assert((await page.locator("h2").innerText()).includes("no encontrada"), "404");
await page.screenshot({ path: out + "/09-404.png", fullPage: true });

await page.getByRole("button", { name: "Modo oscuro" }).click();
assert(await page.evaluate(() => document.body.classList.contains("oscuro")), "tema oscuro");
await page.screenshot({ path: out + "/10-oscuro.png", fullPage: true });

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(base + "/", { waitUntil: "networkidle" });
const columna = await page.locator("#encabezado .contenedor").evaluate((el) => getComputedStyle(el).flexDirection);
assert(columna === "column", "header mobile en columna");
await page.screenshot({ path: out + "/11-mobile-inicio.png", fullPage: true });
await page.goto(base + "/productos", { waitUntil: "networkidle" });
const productosDir = await page.locator("#productos").evaluate((el) => getComputedStyle(el).flexDirection);
assert(productosDir === "column", "productos mobile en columna");
await page.screenshot({ path: out + "/12-mobile-productos.png", fullPage: true });

await page.goto(base + "/login");
await page.locator("#correo").fill("admin@gaselvolcan.cl");
await page.locator("#clave").fill("admin123");
await page.getByRole("button", { name: "Entrar" }).click();
await page.waitForURL(base + "/");
await page.goto(base + "/panel");
await page.locator(".item-carrito", { hasText: "Gas 45 kg" }).getByRole("button", { name: "Eliminar" }).click();
await page.waitForTimeout(300);
assert(await page.locator(".item-carrito", { hasText: "Gas 45 kg" }).count() === 0, "eliminado");

if (errores.length) {
  console.log("ERRORES CONSOLA:");
  console.log(errores.join("\n"));
}

console.log("OK");
await browser.close();
