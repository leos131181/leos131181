import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';
import ProductPage from '../pages/ProductPage';
import CartPage from '../pages/CartPage';
import LoginPage from '../pages/LoginPage';
import ShippingPage from '../pages/ShippingPage ';
import RegisterPage from '../pages/RegisterPage';
import * as testData from '../tests/fixtures/TestData.json'
import PaymentPage from '../pages/PaymentPage';
import PlaceOrderPage from '../pages/PlaceOrderPage';
import OrderPage from '../pages/OrderPage';





let homepage: HomePage;
let utils: Utils;
let productPage: ProductPage;
let carPage: CartPage;
let loginPage: LoginPage;
let shippingPage: ShippingPage;
let registerPage: RegisterPage;
let paymentPage: PaymentPage;
let placeOrderPage: PlaceOrderPage;
let orderPage: OrderPage;



//HOOKS: Códigos repetidos para los casos de prueba lo podemos ejecutar de la siguiente forma



test.beforeEach(async ({ page }) => {
  homepage = new HomePage(page);
  utils = new Utils(page);
  productPage = new ProductPage(page);
  carPage = new CartPage(page);
  loginPage = new LoginPage(page);
  shippingPage = new ShippingPage(page);
  registerPage = new RegisterPage(page);
  paymentPage = new PaymentPage(page);
  placeOrderPage = new PlaceOrderPage(page);
  orderPage = new OrderPage(page);
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');


})


test('Caso de Prueba 10: Añadir un Producto al Carrito', async ({ page }) => {
  //3.Seleccionar un producto de la lista
  await homepage.seleccionarPrimerProducto();
  // Seleccionar cantidad de productos
  await productPage.seleccionarCantidadProducto('1');
  //4.Hacer clic en 'Añadir al carrito'
  await productPage.agregarAlCarrito();
  //5.Verificar que el usuario sea redirigido a 'http://localhost:3000/cart'
  await utils.verificarPagina('atenea.uno/cart');
  //6.Verificar que el producto añadido aparezca en la pantalla del carrito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  //7.Verificar que el icono del carrito en la esquina superior derecha tenga un número 1
  // Localiza el elemento del DOM usando el selector adecuado
  const contadorCarrito = page.locator('#link-carrito .badge');
  // Verifica que el texto del elemento sea "1"
  await expect(contadorCarrito).toHaveText('1');
  //8.Verificar que el texto 'Subtotal (1) artículos' sea visible
  await expect(page.getByRole('heading', { name: /Subtotal \(1\) artículos/ })).toBeVisible();
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 11: Añadir dos Productos Diferentes al Carrito', async ({ page }) => {
  //3.Seleccionar el primer producto de la lista
  await homepage.seleccionarPrimerProducto();
  //4.Hacer clic en 'Añadir al carrito'
  await productPage.agregarAlCarrito();
  //5.Verificar que el usuario sea redirigido a 'http://localhost:3000/cart'
  await utils.verificarPagina('atenea.uno/cart');
  //6.Verificar que el producto añadido aparezca en la pantalla del carrito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  //7.Navegar de nuevo a la página principal
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');
  //8.Seleccionar el segundo producto de la lista
  await homepage.seleccionarSegundoProducto();
  //9.Hacer clic en 'Añadir al carrito'
  await productPage.agregarAlCarrito();
  //10.Verificar que el usuario sea redirigido a 'http://localhost:3000/cart'
  await utils.verificarPagina('atenea.uno/cart');
  //11.  Verificar que ambos productos añadidos aparezcan en la pantalla del carrito
  await homepage.verificarRecuentoListaProductosCarrito(2)
  //12.Verificar que el icono del carrito en la esquina superior derecha tenga un número 2
  // Localiza el elemento del DOM usando el selector adecuado
  const contadorCarrito = page.locator('#link-carrito .badge');
  await expect(contadorCarrito).toHaveText('2');
  //13.Verificar que el texto 'Subtotal (2) artículos' sea visible
  await expect(page.getByRole('heading', { name: /Subtotal \(2\) artículos/ })).toBeVisible();
  //14.Verificar que el precio de ambos productos añadidos sea visible en el carrito
  await homepage.verificarRecuentoListaProductosCarrito(2);
  // mejorar este código, es dependiente de el producto actual en la posición 1 y 2 de la lista, si el producto cambia, no funciona
  await expect(page.locator('div').filter({ hasText: /^Microsoft Surface Pro 7\$1299\.991234567$/ }).first()).toBeVisible();
  await expect(page.locator('div').filter({ hasText: /^LG Gram 17 Laptop\$1599\.9912345$/ }).first()).toBeVisible();

  await page.waitForTimeout(2000);

});

test('Caso de Prueba 12: Añadir Producto al Carrito y Proceder con la Compra', async ({ page }) => {
  //4. Verificar que la página muestra 'Últimos productos'
  await utils.verificarTextoVisible('Últimos productos');
  //5. Seleccionar un producto de la lista
  await homepage.seleccionarPrimerProducto();
  //6. Hacer clic en 'Añadir al carrito'
  await productPage.agregarAlCarrito();
  //7.Verificar que el producto se añada al carrito con éxito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  //8. Hacer clic en el icono del carrito
  await homepage.irAlCarritoDeCompras();
  //9. Verificar que la URL sea https://atenea.uno/cart
  await utils.verificarPagina('/cart');
  //10. Verificar que la página del carrito muestra 'Carrito de compras'
  await utils.verificarTextoVisible('Carrito de compras');
  //11. Verificar que el producto añadido está en la lista del carrito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  //12. Verificar que el subtotal muestra la cantidad correcta
  await expect(page.getByRole('heading', { name: 'Subtotal (1) artículos' })).toBeVisible();
  //13. Hacer clic en 'Realizar Pedido'
  await carPage.realizarPedido();
  //14. Verificar que la URL sea https://atenea.uno/login?redirect=/shipping
  await utils.verificarPagina('/shipping');

  await page.waitForTimeout(2000);
});

test('Caso de Prueba 13: Registro Durante la Compra', async ({ page }) => {
  //3.Añadir un producto al carrito
  await homepage.seleccionarPrimerProducto();
  await productPage.agregarAlCarrito();
  await homepage.irAlCarritoDeCompras();
  //4.Hacer clic en 'Realizar Pedido'
  await carPage.realizarPedido();
  //5.Verificar que la URL sea https://atenea.uno/login?redirect=/shipping
  await utils.verificarPagina('/shipping');
  //6.Verificar que la página de inicio de sesión muestra 'Ingresar'
  await page.getByRole('heading', { name: 'Ingresar' });
  //7.Hacer clic en el enlace '¿Nuevo cliente? Registrarse'
  await shippingPage.irANuevoCliente();
  //8.Verificar que la URL sea https://atenea.uno/register?redirect=/shipping
  await utils.verificarPagina('/register');
  //9.Verificar que la página de registro muestra 'Registrar'
  await utils.verificarTextoVisibleEstricto('Registrar');
  //10.Completar el formulario de registro
  await registerPage.registroCompleto(testData.usuarioNuevo);
  //11.Hacer clic en 'Registrarse'
  await registerPage.registrarse();
  //12.Verificar que el registro se complete con éxito y se redirige a https://atenea.uno/shipping
  await utils.verificarPagina('/shipping');
  //13.Verificar que la página de envío muestra 'Envío'
  await page.waitForTimeout(2000);

  await shippingPage.verificarTextoH1Envio();

});

test('Caso de Prueba 14: Verificar y Editar Detalles de Envío', async ({ page }) => {
  //3.Completar el registro y redirigirse a la página de envío
  await homepage.seleccionarPrimerProducto();
  await productPage.agregarAlCarrito();
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  await page.getByRole('heading', { name: 'Ingresar' });
  await shippingPage.irANuevoCliente();
  await registerPage.registroCompleto(testData.usuarioNuevo);
  await registerPage.registrarse();
  //4.Verificar que la URL sea https://atenea.uno/shipping
  await utils.verificarPagina('/shipping');
  //5.Verificar que la página de envío muestra 'Envío'
  await shippingPage.verificarTextoH1Envio();
  //6.Verificar que los detalles de envío coinciden con los datos de registro... ver la pagina no muestra ambos datos
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  //7.Hacer clic en 'Continuar'
  await shippingPage.cargarDatosEnvio();
  //8.Verificar que la URL sea https://atenea.uno/payment
  await utils.verificarPagina('/payment');
  //9.Verificar que la página de pago muestra 'Método de pago'
  await utils.verificarTextoVisibleEstricto('Método de pago');
  await page.waitForTimeout(2000);
});

test('Caso de Prueba 15: Seleccionar Método de Pago', async ({ page }) => {
  await homepage.seleccionarPrimerProducto();
  await productPage.agregarAlCarrito();
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  await page.getByRole('heading', { name: 'Ingresar' });
  await shippingPage.irANuevoCliente();
  await registerPage.registroCompleto(testData.usuarioNuevo);
  await registerPage.registrarse();
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await utils.verificarPagina('/payment');
  //5.Verificar que la página de pago muestra 'Método de pago'
  await utils.verificarTextoVisibleEstricto('Método de pago');
  //6.Seleccionar 'PayPal' como método de pago... PUEDO ELEGIR SOLO EFECTIVO O TARJETA DE CREDITO

  // Pago con tarjeta de credito
  //await paymentPage.elegirTarjetaCredito();
  //await paymentPage.completarDatosTarjeta(testData.detallesPagoUsuarioNuevo);
  //7.Hacer clic en 'Continuar'
  //await paymentPage.continuarPago();
  //Verificar leyenda "La tarjeta no permite realizar operaciones"
  //await utils.verificarTextoVisibleEstricto('La tarjeta no permite realizar operaciones');

  // Pago en efectivo
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(6000); //aumenté el tiempo para que se cargue bien la página
  //8.Verificar que la URL sea https://atenea.uno/placeorder
  await utils.verificarPagina('/placeorder');
  //9.Verificar que la página de confirmación muestra 'Resumen de pedido'
  await utils.verificarTextoVisibleEstricto('Resumen de pedido');
  await page.waitForTimeout(2000);
});

test('Caso de Prueba 16: Verificar Información de Pedido y Realizar Pedido', async ({ page }) => {
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  await page.getByRole('heading', { name: 'Ingresar' });
  await shippingPage.irANuevoCliente();
  await registerPage.registroCompleto(testData.usuarioNuevo);
  await registerPage.registrarse();
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await utils.verificarPagina('/payment');
  await utils.verificarTextoVisibleEstricto('Método de pago');
  // Pago en efectivo
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(10000);
  await utils.verificarPagina('/placeorder');
  //5.Verificar la información de pedido en la página de confirmación
  await utils.verificarTextoVisible('Pago en efectivo seleccionado. El pago se completará en persona');
  //6.Verificar que la página de confirmación muestra 'Resumen de pedido'
  await utils.verificarTextoVisibleEstricto('Resumen de pedido');
  //7.Verificar que el producto y los detalles de envío y método de pago son correctos
  //Verificar datos de envío
  await shippingPage.verificarDatosEnvioEnConfirmacion(testData.usuarioNuevo);
  // Verifica el método de pago en la página de confirmación
  await placeOrderPage.verificarMetodoPago('Efectivo');
  //Verificar Nombre de Producto
  await placeOrderPage.compararNombreProducto(nombreProductoSeleccionado);
  //8.Hacer clic en 'Realizar Pedido'
  await placeOrderPage.realizarPedido();
  await utils.verificarTextoVisible('Orden creada exitosamente');
  await page.waitForTimeout(6000);
  //9.Verificar que se abre el modal de PayPal... no aparece lo de PayPal en la página
  await utils.verificarPagina('/order');

});

test('Caso de Prueba 17: Realizar Pedido: Registro antes de la Compra', async ({ page }) => {
  //3.Registrarse en el sitio web
  await homepage.irALaPaginaLogin();
  await loginPage.irARegistrarse();
  await registerPage.registroCompleto(testData.usuarioNuevo);
  await registerPage.registrarse();
  //4.Añadir un producto al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //5.Hacer clic en 'Proceder con la compra'
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  //6.Completar los detalles de envío
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(10000);
  //7.Verificar que el pedido se realice con éxito
  await shippingPage.verificarDatosEnvioEnConfirmacion(testData.usuarioNuevo);
  await placeOrderPage.verificarMetodoPago('Efectivo');
  await placeOrderPage.compararNombreProducto(nombreProductoSeleccionado);
  await placeOrderPage.realizarPedido();
  await utils.verificarTextoVisible('Orden creada exitosamente');
  await page.waitForTimeout(6000);
  await utils.verificarPagina('/order');

});

test('Caso de Prueba 18: Realizar Pedido: Inicio de Sesión antes de la Compra', async ({ page }) => {
  //3.Iniciar sesión en el sitio web
  await homepage.irALaPaginaLogin();
  await loginPage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //4.Añadir un producto al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //5.Hacer clic en 'Proceder con la compra'
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  //6.Completar los detalles de envío
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(10000);
  //7.Verificar que el pedido se realice con éxito
  await shippingPage.verificarDatosEnvioEnConfirmacion(testData.usuarioNuevo);
  await placeOrderPage.verificarMetodoPago('Efectivo');
  await placeOrderPage.compararNombreProducto(nombreProductoSeleccionado);
  await placeOrderPage.realizarPedido();
  await utils.verificarTextoVisible('Orden creada exitosamente');
  await page.waitForTimeout(6000);
  await utils.verificarPagina('/order');

});

test('Caso de Prueba 19: Eliminar Productos del Carrito', async ({ page }) => {
  //3.Añadir un producto al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //4.Navegar a la página del carrito
  await homepage.irAlCarritoDeCompras();
  //5.Eliminar el producto del carrito
  await carPage.eliminarProductoDelCarrito();
  //6.Verificar que el producto se elimine correctamente (ver si se puede verificar de otra forma)
  await utils.verificarTextoVisible('Tu carrito está vacío');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 20: Ver Productos por Categoría', async ({ page }) => {
  //3.Hacer clic en 'Categorías' en el menú de navegación
  //4.Seleccionar una categoría de la lista
  await homepage.seleccionarCategoriaProducto();
  //5.Verificar que los productos de la categoría seleccionada sean visibles, hecho con la categoría Drones (funciona para otras)
  await homepage.verificarCantidadDeProductosPorCategoria(2);
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 21: Ver Productos por Marca y Carrito', async ({ page }) => {
  //3.Hacer clic en 'Marcas' en el menú de navegación
  //4.Seleccionar una marca de la lista
  await homepage.seleccionarMarcaProducto();
  //5.Verificar que los productos de la marca seleccionada sean visibles
  await homepage.verificarCantidadDeProductosPorCategoria(2);
  //6.Añadir un producto de la marca seleccionada al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //7.Verificar que el producto se añada al carrito con éxito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 22: Buscar Productos y Verificar el Carrito después del Inicio de Sesión', async ({ page }) => {
  //3.Iniciar sesión en el sitio web
  await homepage.irALaPaginaLogin();
  await loginPage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //4.Buscar un producto utilizando la barra de búsqueda
  await homepage.realizarBusquedaProducto('LG Gram');
  //5.Añadir un producto de los resultados de búsqueda al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //6.Verificar que el producto se añada al carrito con éxito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 23: Añadir Reseña a un Producto', async ({ page }) => {
  //Iniciar sesión en el sitio web
  await homepage.irALaPaginaLogin();
  await loginPage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //3.Seleccionar un producto de la lista
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  //4.Desplazarse hacia abajo hasta la sección de reseñas
  //5.Añadir una reseña con nombre, correo electrónico y comentario
  await productPage.calificarProductoSeleccionado(testData);
  //6.Hacer clic en el botón 'Enviar'
  await productPage.enviarResenia();
  //7.Verificar que la reseña se añada correctamente
  await productPage.verificarReseniaAgregada('Leonardo Sánchez', 'leo131181@gmail.com', 'Producto recomendable');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 24: Añadir Producto desde Artículos Recomendados', async ({ page }) => {
  //3.Desplazarse hacia abajo hasta la sección de artículos recomendados
  //4.Seleccionar un producto recomendado
  await homepage.seleccionarPrimerProductoRecomendado();
  //5.Añadir el producto al carrito
  await productPage.agregarAlCarrito();
  //6.Verificar que el producto se añada al carrito con éxito
  await homepage.verificarRecuentoListaProductosCarrito(1)
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 25: Verificar los Detalles de la Dirección en la Página de Pago', async ({ page }) => {
  //Hacemos el login al inicio
  await homepage.irALaPaginaLogin();
  await loginPage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //3.Añadir un producto al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //4.Hacer clic en 'Proceder con la compra'
  await carPage.realizarPedido();
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(10000);
  //5.Verificar que los detalles de la dirección se muestren correctamente en la página de pago
  await shippingPage.verificarDatosEnvioEnConfirmacion(testData.usuarioNuevo);
  await placeOrderPage.verificarMetodoPago('Efectivo');
  await placeOrderPage.compararNombreProducto(nombreProductoSeleccionado);
  await page.waitForTimeout(2000);
});

test('Caso de Prueba 26: Descargar Factura después de Realizar un Pedido', async ({ page }) => {
  //Hacemos el login al inicio
  await homepage.irALaPaginaLogin();
  await loginPage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //3.Añadir un producto al carrito
  const nombreProductoSeleccionado = await homepage.seleccionarPrimerProducto();
  if (!nombreProductoSeleccionado) {
    throw new Error('No se pudo obtener el nombre del producto seleccionado.'); //para manejar error si no hay texto para recuperar o no esta visible
  }
  await productPage.agregarAlCarrito();
  //4.Hacer clic en 'Proceder con la compra'
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  await homepage.irAlCarritoDeCompras();
  await carPage.realizarPedido();
  //5.Completar los detalles de envío y pago
  await shippingPage.datosEnvio(testData.usuarioNuevo);
  await shippingPage.cargarDatosEnvio();
  await paymentPage.elegirPagoEfectivo();
  await paymentPage.continuarPago();
  await page.waitForTimeout(10000);
  //6.Realizar el pedido
  await placeOrderPage.realizarPedido();
  await utils.verificarTextoVisible('Orden creada exitosamente');
  await page.waitForTimeout(6000);
  await utils.verificarPagina('/order');
  //7.Verificar que se muestre la opción de descargar la factura
  await utils.verificarTextoVisible('Descargar factura');
  //8.Hacer clic en 'Descargar Factura'
    //Hacer clic en 'Descargar Factura' y capturar la descarga
  const [download] = await Promise.all([
    page.waitForEvent('download'), // Esperar a que inicie la descarga
    orderPage.decargarFactura(),   // Hacer clic en el botón de descarga
  ]);

  //9.Verificar que la factura se descargue correctamente
  const filePath = await download.path();
  if (!filePath) {
    throw new Error('La descarga no se realizó correctamente o no se encontró el archivo.');
  }
  console.log(`El archivo se descargó correctamente: ${filePath}`);

  await page.waitForTimeout(2000);

});

test('Caso de Prueba 27: Verificar el Desplazamiento hacia Arriba usando el Botón Flecha', async ({ page }) => {
  //3.Desplazarse hacia abajo en la página
  await homepage.desplazarceHaciaAbajo();
  await expect(homepage.selectorElementoVisibleArriba).not.toBeInViewport(); //el elemento no es visible cuando estamos en la parte inferior de la página
  //4.Hacer clic en el botón 'Flecha hacia arriba'
  await homepage.desplazarceHaciaArribaFlecha();
  //5.Verificar que la página se desplace hacia arriba correctamente
  await expect(homepage.selectorElementoVisibleArriba).toBeInViewport();  //elemento sisible arriba de la pagina (AteneaShop)
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 28: Verificar el Desplazamiento hacia Arriba sin usar el Botón Flecha', async ({ page }) => {
  //3.Desplazarse hacia abajo en la página
  await homepage.desplazarceHaciaAbajo();
  await expect(homepage.selectorElementoVisibleArriba).not.toBeInViewport(); //el elemento no es visible cuando estamos en la parte inferior de la página
  //4.Hacer clic en el botón 'Flecha hacia arriba'
  await page.evaluate(() => window.scrollTo(0, 0)); //con este método nos desplazamos hacia la parte superior de la página
  //5.Verificar que la página se desplace hacia arriba correctamente
  await expect(homepage.selectorElementoVisibleArriba).toBeInViewport();  //elemento sisible arriba de la pagina (AteneaShop)
  await page.waitForTimeout(2000);

});