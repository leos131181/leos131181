import { Page, Locator, expect } from "@playwright/test";

export default class OrderPage {
    readonly page: Page;
    readonly botonDescargarFactura: Locator;
  

    constructor(page: Page) {
        this.page = page;
        this.botonDescargarFactura = page.locator('.col-md-4 .list-group-item #button-download-invoice');
     
    }

    async decargarFactura(){
        await this.botonDescargarFactura.click();
    }
   
  
}
