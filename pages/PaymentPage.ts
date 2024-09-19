import { Page, Locator, expect } from "@playwright/test";

export default class PaymentPage {
    readonly page: Page;
    readonly radioButtonTarjetaCredito: Locator;
    readonly radioButtonPagoEfectivo: Locator;
    readonly botonContinuar: Locator;

    // Elementos de la tarjeta de crédito
    readonly inputNombreTitularTarjeta: Locator;
    readonly inputPrimeros4DigitosTarjeta: Locator;
    readonly inputSegundos4DigitosTarjeta: Locator;
    readonly inputTerceros4DigitosTarjeta: Locator;
    readonly inputCuartos4DigitosTarjeta: Locator;
    readonly inputMesExpiracion: Locator;
    readonly inputAnioExpiracion: Locator;
    readonly inputCvvTargeta: Locator;



    constructor(page: Page) {
        this.page = page;

        // Localizadores de los elementos de la página
        this.radioButtonTarjetaCredito = page.getByLabel('Tarjeta de crédito');
        this.radioButtonPagoEfectivo = page.getByLabel('Efectivo');
        // Localizadores de datos de la tarjeta
        this.inputNombreTitularTarjeta = page.getByPlaceholder('Nombre del titular');
        this.inputPrimeros4DigitosTarjeta = page.locator('div.row div.col-3 input').nth(0);
        this.inputSegundos4DigitosTarjeta = page.locator('div.row div.col-3 input').nth(1);
        this.inputTerceros4DigitosTarjeta = page.locator('div.row div.col-3 input').nth(2);
        this.inputCuartos4DigitosTarjeta = page.locator('div.row div.col-3 input').nth(3);
        this.inputMesExpiracion = page.locator('div.row select').nth(1); // Selector para el mes de expiración
        this.inputAnioExpiracion = page.locator('div.row select').first(); // Selector para el año de expiración
        this.inputCvvTargeta = page.locator('div.my-2 input.form-control').nth(1); // Ajusta el nombre del atributo si es necesario
        //Localizador boton continuar
        this.botonContinuar = page.locator('#continue-button');
    }

    // Método para elegir la forma de pago
    async elegirTarjetaCredito() {
        await this.radioButtonTarjetaCredito.check();
    }
    // Funciona, completa los datos exitosamente
    async completarDatosTarjeta(datosUsuario: any) {
        await this.inputPrimeros4DigitosTarjeta.fill(datosUsuario.tarjetaNumero.primerosCuatroDigitos);
        await this.inputSegundos4DigitosTarjeta.fill(datosUsuario.tarjetaNumero.segundosCuatroDigitos);
        await this.inputTerceros4DigitosTarjeta.fill(datosUsuario.tarjetaNumero.tercerosCuatroDigitos);
        await this.inputCuartos4DigitosTarjeta.fill(datosUsuario.tarjetaNumero.cuartosCuatroDigitos)
        await this.inputNombreTitularTarjeta.fill(datosUsuario.tarjetaTitular);
        await this.inputAnioExpiracion.selectOption({ value: datosUsuario.expiracionAnio }); 
        await this.inputMesExpiracion.selectOption({ value: datosUsuario.expiracionMes }); 
        await this.inputCvvTargeta.fill(datosUsuario.cvc); 
    }

    async elegirPagoEfectivo() {
        await this.radioButtonPagoEfectivo.check();
    }

    // Método para continuar después de la elección de la forma de pago
    async continuarPago() {
        await this.botonContinuar.click();
    }
}
