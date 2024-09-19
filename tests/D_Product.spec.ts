import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';
import ProductPage from '../pages/ProductPage';





let homepage: HomePage;
let utils: Utils;
let productPage: ProductPage;


//HOOKS: Códigos repetidos para los casos de prueba lo podemos ejecutar de la siguiente forma

test.beforeEach(async ({page}) => {
  homepage = new HomePage(page);
  utils = new Utils(page);
  productPage = new ProductPage(page);
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');


})


// tengo un error en los selectores o algo parecido, antes de los erorres SSL de la pagina estos test funcionaban


test('Caso de Prueba 8: Verificar Todas las Páginas de Productos y Detalles del Producto', async ({ page }) => {
  //Elegir el primer producto de la lista
  await homepage.seleccionarPrimerProducto();
  // Verificar que la url contenga /product
  await utils.verificarPagina('/product');
  // Verificamos que la pagina del producto es visible al evidenciar la presencia del texto 'Descripción' 
  await utils.verificarTextoVisible('Descripción');
  // Verificar que el título del producto este visible
  await expect(productPage.nombreProducto).toBeVisible;
  // Verificar que la imagen del pruducto este visible
  await expect(productPage.imagenProducto).toBeVisible();
  // Verificar que el precio del producto este visible
  await expect(productPage.precioProducto).toBeVisible();
  // Verificar que el stock del producto este visible
  await expect(productPage.stockProducto).toBeVisible();
  // Verificar que la cantidad de producto a seleccionar este visible 
  await expect(productPage.cantidadProducto).toBeVisible();
  // Seleccionar cantidad de productos para verificar que es funcional
  await productPage.seleccionarCantidadProducto('1');
  // Verificar que este visible la sección de Reseñas
  await expect(productPage.resenasProducto).toBeVisible();

  // Verificar que el texto sin reseñas este visible si no hay reseñas... no funciona porque el producto ya tiene reseñas
  //await expect(productPage.textoSinResenas).toBeVisible();

  // Verificar que el formulario para escribir las reseñas este visible
  await expect(productPage.formularioResenas).toBeVisible();
  // Verificar que el mensaje de 'Por favor, Ingrese para escribir una reseña' esté visible si el usuario no está autenticado
  await expect(productPage.textoEscribirResena).toBeVisible();
  // Verificar que el botón 'Volver' esté visible y funcional
  await productPage.volverAProductos();
  //Volvi a seleccionar el producto y la cantidad para poder comprobar que el boton de agregar al carrito era funcional
  //Elegir el primer producto de la lista
  await homepage.seleccionarPrimerProducto();
  // Seleccionar cantidad de productos para verificar que es funcional
  await productPage.seleccionarCantidadProducto('1');
  // Verificar que el boton de agregar al carrito esté visible
  await expect(page.getByRole('button', { name: 'Añadir al carrito' })).toBeVisible();
  // Verificar que es funcional
  await productPage.agregarAlCarrito();
  
  await page.waitForTimeout(2000);
  
});

test('Caso de Prueba 9: Buscar Producto', async ({ page }) => {
  // 4.Ingresar un término de búsqueda en la barra de búsqueda en la sección de filtros a la izquierda de la pantalla
  // 5.Hacer clic en el botón 'Buscar'
  await homepage.realizarBusquedaProducto('LG Gram');
  //6.Verificar que los resultados de búsqueda sean visibles con éxito
  // ver si se puede mejorar
  await page.waitForTimeout(4000);
  await expect(page.getByRole('link', { name: 'LG Gram 17 Laptop' })).toBeVisible();

  await page.waitForTimeout(2000);

});





