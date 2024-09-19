import { Page, Locator, expect, BrowserContext } from "@playwright/test";

//importaciones:
//Page: Representa una página del navegador en Playwright. Todas las interacciones con la página 
//(como hacer clic, navegar, esperar elementos, etc.) se realizan a través de un objeto Page.
//Locator: Es un objeto en Playwright que representa un elemento (o elementos) en la página. 
//Un Locator proporciona métodos para interactuar con ese elemento, como hacer clic, 
//escribir texto, esperar hasta que aparezca, etc.


//creamos la clase HomePage que representa la pagina de inicio de la aplicación o página web
export default class HomePage {
    //declaracion de las propiedades de la clase
    //Las propiedades son variables que pertenecen a la clase. Se utilizan para almacenar información sobre los objetos.
    //Los métodos son funciones que pertenecen a la clase. Son las acciones que los objetos de esa clase pueden realiza
    readonly page: Page;  //Es un objeto que representa la página web y a través del cual se realizarán todas las interacciones.
    //En Playwright, un objeto Page representa una pestaña del navegador o una página web que se está automatizando.
    readonly botonIngresar: Locator; //Representa el botón "Ingresar" en la página. 
    readonly botonPerfilUsuario: Locator;
    readonly botonSalir: Locator;
    readonly emailInput: Locator;
    readonly subscribeButton: Locator;
    readonly botonEscenarios: Locator;
    readonly entryBuscarProducto: Locator;
    readonly botonBuscarProducto: Locator;
    readonly selectorPrimerProducto: Locator;
    readonly selectorSegundoProducto: Locator;
    readonly listaProductosCarrito: Locator;
    readonly botonCarrito: Locator;
    readonly comboboxCategoria: Locator;
    readonly selectorListaPorCategoria : Locator;
    readonly selectorListaPorMarca : Locator;
    readonly botonVerProductoRecomendadoSeleccionado: Locator;
    readonly botonFlechaDesplazarHaciaArriba: Locator;
    readonly selectorElementoVisibleArriba: Locator;




    //si yo quisiera inicializar una clase ya creada seria
    //  import Utils from .....                importamos la clase
    // readonly utils: Utils;                  agregamos el objeto que representa la clase Utils 
    // this.utils = new Utils(page);            inicializamos las propiedades del objeto




    //Constructor: Se utiliza para inicializar las propiedades del objeto.
    constructor(page: Page) {
        this.page = page;
        this.botonIngresar = page.getByRole('link', { name: 'Ingresar' });
        this.botonPerfilUsuario = page.getByRole('button', { name: 'Leonardo' });
        this.botonSalir = page.getByRole('button', { name: 'Salir' });
        this.emailInput = page.getByPlaceholder('Ingrese su dirección de correo');
        this.subscribeButton = page.getByRole('button', { name: 'Suscribirse' });
        this.botonEscenarios = page.getByRole('link', { name: 'Escenarios de Prueba' });
        this.entryBuscarProducto = page.getByPlaceholder('Buscar productos...');
        this.botonBuscarProducto = page.getByRole('button', { name: 'Buscar' });
        this.selectorPrimerProducto = page.locator('.product-list .col-sm-12').first(); //probe con el resto de los elementos de la lista y funciona .nth(1) 
        this.selectorSegundoProducto = page.locator('.product-list .col-sm-12').nth(1);
        this.listaProductosCarrito = page.locator('.col-md-8 .list-group-item'); // localizador de los productos agregados al carrito
        this.botonCarrito = page.locator('.navbar-collapse.collapse #link-carrito');
        this.comboboxCategoria = page.getByRole('combobox').nth(1);
        this.selectorListaPorCategoria = page.locator('.product-list .my-3.p-3.rounded.card'); // localizador de los elementos seleccionados por categoría
        this.selectorListaPorMarca = page.getByRole('combobox').first(); 
        this.botonVerProductoRecomendadoSeleccionado = page.getByRole('button', { name: 'Ver Producto' }).first();
        this.botonFlechaDesplazarHaciaArriba = page.locator('.back-to-top');
        this.selectorElementoVisibleArriba = page.getByText('AteneaShop');
    }
    /*
    // Función para crear un contexto que ignore los certificados SSL
    async crearContextoIgnorarSSL(): Promise<{ context: BrowserContext, newPage: Page | null }> {
        const context = await this.page.context().browser()?.newContext({
            ignoreHTTPSErrors: true
        });
        if (!context) throw new Error("No se pudo crear el contexto");

        const newPage = await context.newPage();
        if (!newPage) return { context, newPage: null };

        await newPage.goto('https://qa.atenea.uno/');
        await newPage.waitForLoadState();
        return { context, newPage };
    }
    */


    //Creamos un método para poder ir a la página web
    async irALaPagina() {

        await this.page.goto('https://qa.atenea.uno/');
        await this.page.waitForLoadState();
    }


    // Método para coroborar que determinado texto este visible en la pagina actual
    async corroborarTextoPagina(textoPagina: string) {
        await expect(this.page).toHaveTitle(textoPagina);
    }
    //Método para ir a la página de login
    async irALaPaginaLogin() {
        await this.botonIngresar.click();
    }

    //le incorporé como argumento de la función el nombre del usuario requerido para cada caso
    async verificarUsuarioVisible(nombreUsuario: string) {
        await expect(this.page.getByRole('button', { name: nombreUsuario })).toBeVisible();

    }
    // Método para cerrar la sesión del ususario
    async cerrarSesion() {
        await this.botonPerfilUsuario.click();
        await this.botonSalir.click();
    }

     // Método para desplazarse hacia abajo en la homepage y realizar la suscripción con email
     async desplazarceHaciaAbajo() {
        await this.emailInput.scrollIntoViewIfNeeded(); 
    }

    //Metodo para desplazarce hacia arriba usando la flecha
    async desplazarceHaciaArribaFlecha(){
        await this.botonFlechaDesplazarHaciaArriba.click()
       
    }

    // Método para desplazarse hacia abajo en la homepage y realizar la suscripción con email
    async subscribeToNewsletter(email: string) {
        // Desplazar hacia abajo para que el campo de correo sea visible
        await this.emailInput.scrollIntoViewIfNeeded();
        // Introducir el correo electrónico
        await this.emailInput.fill(email);
        // Hacer clic en el botón "Suscribirse"
        await this.subscribeButton.click();
    }

    //Método para ir a la página de escenarios
    async irAEscenarios() {
        await this.botonEscenarios.click();
    }

    //Método para buscar productos
    async realizarBusquedaProducto(producto: string) {
        await this.entryBuscarProducto.fill(producto);
        await this.botonBuscarProducto.click();


    }

    async seleccionarPrimerProducto(): Promise<string> {
        // Esperar hasta que el primer producto esté visible
        await this.page.waitForSelector('.product-list .col-sm-12', { state: 'visible' });

        // Obtener el nombre del producto antes de seleccionarlo
        const nombreProducto = await this.selectorPrimerProducto.locator('.product-title').textContent();

        // Verificar que el nombre del producto no sea null
        if (!nombreProducto) {
            throw new Error('No se pudo obtener el nombre del producto.');
        }

        // Imprimir el nombre del producto seleccionado en la consola
        console.log(`Producto seleccionado: ${nombreProducto}`);

        // Hacer clic en el primer producto
        await this.selectorPrimerProducto.click();

        // Retornar el nombre del producto seleccionado
        return nombreProducto.trim(); // Asegúrate de eliminar espacios en blanco adicionales
    }



    // Método para seleccionar el segundo producto de la lista
    async seleccionarSegundoProducto() {
        await this.selectorSegundoProducto.click();
    }

    // Método para contar los elementos list-group-item
    async contarElementosListaProductosCarrito(): Promise<number> {
        return await this.listaProductosCarrito.count();
    }

    // Método para verificar que el recuento sea igual a 1
    async verificarRecuentoListaProductosCarrito(recuentoEsperado: number) {
        const count = await this.contarElementosListaProductosCarrito();
        expect(count).toBe(recuentoEsperado);
    }

    //Método para acceder al carrito de compras

    async irAlCarritoDeCompras() {
        await this.botonCarrito.click();

    }
    // Método para seleccionar la categoría de los productos, ejemplo hecho con la categoría Drones
    async seleccionarCategoriaProducto(){
        await this.comboboxCategoria.selectOption('Drones');
    }
   
     // Método para verificar que la cantidad de productos en la categoría "Drones" sea 2 en este caso
     async verificarCantidadDeProductosPorCategoria(cantidadEsperada: number) {
        // Esperamos que los productos de la categoría sean visibles (mi error estaba en esta parte, no esperaba que se cargaran los elementos)
        await this.page.waitForSelector('.product-list .my-3.p-3.rounded.card', { state: 'visible' });
        const cantidadProductos = await this.selectorListaPorCategoria.count();
        console.log(`Número de productos encontrados en la categoría seleccionada: ${cantidadProductos}`);
        expect(cantidadProductos).toBe(cantidadEsperada);
    }

    // Método para seleccionar la Marca de los productos, ejemplo hecho son la marca Dell
    async seleccionarMarcaProducto(){
        await this.selectorListaPorMarca.selectOption('Dell');
    }

      // Método para desplazarse hacia abajo en la homepage y realizar la suscripción con email
      async seleccionarPrimerProductoRecomendado() {
        // Desplazar hacia abajo para que el campo de artículo recomendado este visible
        await this.emailInput.scrollIntoViewIfNeeded();
        await this.botonVerProductoRecomendadoSeleccionado.click();
    }



}




/*
Clase: molde o plantilla que define las propiedades (atributos) y métodos (comportamientos) que los objetos 
creados a partir de esa clase tendrán.
Un objeto de clase: Es una instancia concreta de una clase. La clase define qué datos y comportamientos tendrá 
el objeto, mientras que el objeto es la realización específica de esos datos y comportamientos.
*/