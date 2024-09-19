import { Page, Locator, expect } from "@playwright/test";


export default class ProductPage {

    readonly page: Page;

    readonly selectorCantidadProducto: Locator;
    readonly botonAnadirAlCarrito: Locator;
    readonly botonVolver: Locator;

    readonly nombreProducto: Locator;
    readonly imagenProducto: Locator;
    readonly precioProducto: Locator;
    readonly stockProducto: Locator;
    readonly cantidadProducto: Locator;
    readonly resenasProducto: Locator;
    readonly textoSinResenas: Locator;
    readonly formularioResenas: Locator;
    readonly textoEscribirResena: Locator;
    readonly selectorCalificacionProducto: Locator;
    readonly selectorCuadroTextoResenia: Locator;
    readonly botonEnviarResenia: Locator;
    readonly reseniaAgregada: Locator;




    constructor(page: Page) {
        this.page = page;
        //Localizadores de los elementos de la página

        this.selectorCantidadProducto = page.locator('#product-qty-select');
        this.botonAnadirAlCarrito = page.locator('.col-md-3 #add-to-cart-button');
        this.botonVolver = page.getByRole('link', { name: 'Volver' });
        this.nombreProducto = page.locator('.col-md-3 #product-name');
        this.imagenProducto = page.locator('.col-md-6 #product-image');
        this.precioProducto = page.locator('.col-md-3 #product-price');
        this.stockProducto = page.getByText('Stock disponible');
        this.cantidadProducto = page.locator('#product-qty-select');
        this.resenasProducto = page.getByRole('heading', { name: 'Reseñas' });
        this.textoSinResenas = page.getByText('Sin reseñas');
        this.formularioResenas = page.getByRole('heading', { name: 'Escribir una reseña de' });
        this.textoEscribirResena = page.getByText('Por favor, Ingrese para');
        this.selectorCalificacionProducto = page.locator('#review-rating-select');
        this.selectorCuadroTextoResenia = page.locator('#review-comment-textarea');
        this.botonEnviarResenia = page.getByRole('button', { name: 'Enviar' });
        this.reseniaAgregada = page.locator('#review-66eae04b8389c98198954ae8');
    }

    //Acciones sobre los elementos de la página

    async seleccionarCantidadProducto(cantidad: string) {
        await this.selectorCantidadProducto.selectOption(cantidad);
    }
    //Método para agregar productos al carrito de compras
    async agregarAlCarrito() {
        await this.botonAnadirAlCarrito.click()
    }

    async volverAProductos() {
        this.botonVolver.click();
    }

    //Método para seleccionar la calificación del producto
    async calificarProductoSeleccionado(datosUsuario: any) {
        await this.selectorCalificacionProducto.selectOption(datosUsuario.reseniaUsuarioNuevo.calificacion);
        await this.selectorCuadroTextoResenia.fill(datosUsuario.reseniaUsuarioNuevo.textoResenia);
    }

    //Método para enviar la reseña ingresada
    async enviarResenia() {
        await this.botonEnviarResenia.click();
    }
    
    // Método para verificar que la reseña se ha añadido correctamente
    async verificarReseniaAgregada(nombre: string, correo: string, comentario: string) {
        const reseniaTexto = await this.reseniaAgregada.innerText();
        expect(reseniaTexto).toContain(nombre);
        expect(reseniaTexto).toContain(correo);
        expect(reseniaTexto).toContain(comentario);
    }

}









