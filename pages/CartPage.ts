import { Page, Locator, expect } from "@playwright/test";


export default class CartPage {
 
    readonly page: Page;
    readonly botonRealizarPedido: Locator; 
    readonly botonEliminarProducto: Locator; 
                    

   

    constructor (page: Page){
        this.page = page;
        //Localizadores de los elementos de la página
        this.botonRealizarPedido = page.getByRole('button', { name: 'Realizar pedido' });
        this.botonEliminarProducto = page.locator('.col-md-2 .btn.btn-light');

   

    }
     //Acciones sobre los elementos de la página
    async realizarPedido(){
        await this.botonRealizarPedido.click();
    }

    async eliminarProductoDelCarrito(){
        await this.botonEliminarProducto.click();
    }

    



}




