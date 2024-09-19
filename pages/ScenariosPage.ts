import { Page, Locator, expect } from "@playwright/test";

export default class ScenariosPage {
    readonly page: Page;
    readonly sliderElement: Locator;
    readonly testCases: Locator;
    readonly botonSwitch: Locator;

    constructor(page: Page) {
        this.page = page;
        // Localizador del span que muestra el estado visual del switch
        this.sliderElement = page.locator('#cases-toggle .slider');
        // Localizador de los casos de prueba
        this.testCases = page.locator('.list-group-item');
        // Localizador del Switch
        this.botonSwitch = page.locator('#cases-toggle span');

    }



    // Verificar que el switch esté en la posición "Casos Funcionales" o "Casos API"
    async verificarEstadoDelSwitchEsperado(colorEsperado: string) {
        // Esperar a que el slider sea visible
        await this.sliderElement.waitFor({ state: 'visible' });

        // Verificar el estilo aplicado al slider
        const backgroundColor = await this.sliderElement.evaluate((slider) => {
            return window.getComputedStyle(slider).backgroundColor;
        });

        console.log(`Color de fondo del slider: ${backgroundColor}`); // Agregar un log para depuración

        // Asegurarse de que el color de fondo coincide con el esperado
        expect(backgroundColor).toBe(colorEsperado);
    }

    // Método para contar los casos de prueba en el DOM 
    async verificarCantidadDeCasosDePrueba(cantidadEsperada: number) {
        const numeroDeCasos = await this.testCases.count();
        console.log(`Número de casos de prueba encontrados: ${numeroDeCasos}`);
        expect(numeroDeCasos).toBe(cantidadEsperada);
    }

    // Método para cambiar el switch de Casos Funcionales a Casos Api
    async accionarSwitch(){
        this.botonSwitch.click();
    }

}




