import { Page, Locator, expect } from "@playwright/test";

export default class ShippingPage {
    readonly page: Page;
    readonly enlaceNuevoCliente: Locator;
    readonly textoH1Envio: Locator;
    readonly ingreseDireccion: Locator;
    readonly ingreseCiudad: Locator;
    readonly ingreseCodigoPostal: Locator;
    readonly ingresePais: Locator;
    readonly botonContinuar: Locator;

    constructor(page: Page) {
        this.page = page;
        this.enlaceNuevoCliente = page.getByRole('link', { name: 'Registrarse' });
        this.textoH1Envio = page.locator('h1:has-text("Envío")');
        this.ingreseDireccion = page.getByPlaceholder('Ingrese una dirección');
        this.ingreseCiudad = page.getByPlaceholder('Ingrese una ciudad');
        this.ingreseCodigoPostal = page.getByPlaceholder('Ingrese un código postal');
        this.ingresePais = page.getByPlaceholder('Ingrese su país');
        this.botonContinuar = page.getByRole('button', { name: 'Continuar' });
    }

    async irANuevoCliente() {
        await this.enlaceNuevoCliente.click();
    }

    async verificarTextoH1Envio() {
    
        await expect(this.textoH1Envio).toBeVisible();
    }

    async datosEnvio(datosUsuario: any) {
        await expect(this.ingreseDireccion).toBeVisible();
        await this.ingreseDireccion.fill(datosUsuario.direccionUno);
        await expect(this.ingreseCiudad).toBeVisible();
        await this.ingreseCiudad.fill(datosUsuario.estado);
        await expect(this.ingreseCodigoPostal).toBeVisible();
        await this.ingreseCodigoPostal.fill(datosUsuario.codigoPostal);
        await expect(this.ingresePais).toBeVisible();
        await this.ingresePais.fill(datosUsuario.pais);
    }

    async cargarDatosEnvio() {
        await this.botonContinuar.click();
    }

    async verificarDatosEnvioEnConfirmacion(datosUsuario: any) {
        // Selecciona el div que contiene "Envío"
        const envioItem = this.page.locator('div.list-group-item').locator('h2:has-text("Envío")').locator('..');

        // Asegúrate de que el elemento esté visible
        await expect(envioItem).toBeVisible();

        // Ajusta el texto esperado para eliminar el espacio después de "Dirección:"
        const direccionEsperada = `Dirección:${datosUsuario.direccionUno}, ${datosUsuario.estado} ${datosUsuario.codigoPostal}, ${datosUsuario.pais}`;

        // Imprime por consola los datos que se están comparando
        console.log('Dirección cargada en la página shipping:', direccionEsperada);

        // Selecciona el elemento de la dirección en la página
        const direccionElemento = envioItem.locator('p');

        // Imprime por consola el texto actual del elemento de la dirección
        const textoDireccionActual = await direccionElemento.textContent();
        console.log('Texto de la dirección en la página placeorder:', textoDireccionActual);

        // Realiza la comparación entre la dirección esperada y la dirección en la página
        await expect(direccionElemento).toHaveText(direccionEsperada);
    }


}

