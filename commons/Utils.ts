import{Page, Locator,expect } from '@playwright/test'

export default class Utils {

    readonly page: Page;

    constructor(page: Page){
        this.page = page;
        
    }


    //Creamos funciones que sean comunes a todas las páginas usadas
    
    async verificarTextoVisible(text: string){
        await expect(this.page.getByText(text)).toBeVisible();
     
    }

    async verificarTextoVisibleEstricto(text: string){
        await expect(this.page.locator(`text="${text}"`)).toBeVisible();
     
    }

    async verificarPagina(url: string) {
        const currentUrl_login = this.page.url();
        expect(currentUrl_login).toContain(url);
       
    }



} 