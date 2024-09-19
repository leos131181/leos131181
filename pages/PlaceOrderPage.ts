import { Page, Locator, expect } from "@playwright/test";

export default class PlaceOrderPage {
    readonly page: Page;
    readonly nombreProductoAComprar: Locator;
    readonly botonRealizarPedido: Locator;
    readonly datosEnvio: Locator; // para obtener los datos de envío y poder realizar la comparación
    readonly metodoPagoItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.nombreProductoAComprar = page.locator('#item-link-0'); // O ajusta según el DOM de tu página
        this.botonRealizarPedido = page.getByRole('button', { name: 'Realizar pedido' });
        this.datosEnvio = page.locator('div.list-group-item');
        this.metodoPagoItem = page.locator('div.list-group-item').locator('h2:has-text("Método de pago")').locator('..');
    }

    async compararNombreProducto(nombreProductoSeleccionado: string) {
        // Obtener el nombre del producto desde PlaceOrderPage
        const nombreProductoAComprar = await this.nombreProductoAComprar.innerText();

        // Verificar que el nombre del producto no sea null
        if (!nombreProductoAComprar) {
            throw new Error('No se pudo obtener el nombre del producto desde la página de confirmación.');
        }

        console.log('Nombre del producto en la página de PlaceOrder:', nombreProductoAComprar);

        // Comparar los nombres
        expect(nombreProductoAComprar.trim()).toBe(nombreProductoSeleccionado);  //el metodo trim() elimina posibles espacios vacios en el texto
    }

  

    async verificarMetodoPago(metodoPagoEsperado: string) {
        // Selecciona el div que contiene el método de pago
        const metodoPagoItem = this.page.locator('div.list-group-item:has-text("Método de pago")');
        
        // Asegúrate de que el elemento esté visible
        await expect(metodoPagoItem).toBeVisible();
        
        // Imprime el texto recibido para depuración
        const textoRecibido = await metodoPagoItem.textContent();
        console.log('Texto recibido:', textoRecibido);
    
        // Verifica el contenido exacto del div que contiene el método de pago
        await expect(metodoPagoItem).toContainText(`Método: ${metodoPagoEsperado}`);
    }
    

    async realizarPedido() {
        await this.botonRealizarPedido.click();
    }
}
