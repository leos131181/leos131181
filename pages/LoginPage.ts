import { Page, Locator, expect } from "@playwright/test";



export default class LoginPage {

    readonly page: Page;
    readonly botonIrARegistrarse: Locator;
    readonly ingresarEmailUsuario: Locator;
    readonly ingresarContrasenaUsuario: Locator;
    readonly ingresarACuenta: Locator;


    constructor(page: Page) {
        this.page = page;
        this.botonIrARegistrarse = page.getByRole('link', { name: 'Registrarse' });
        this.ingresarEmailUsuario = page.getByPlaceholder('Ingrese su Email');
        this.ingresarContrasenaUsuario = page.getByPlaceholder('Ingrese su contraseña');
        this.ingresarACuenta = page.getByRole('button', { name: 'Ingresar' });


    }

    //uso parametros (argumentos) usuario y contrasena para poder reutilizar la función con distintos ususarios un contraseñas en mis
    //casos de prueba
    //Además debemos aclarar que tipo de variables son los parámetros utilizados
    async logueoUsuarioContraseña(ususario: string, contrasena: string) {
        await this.ingresarEmailUsuario.fill(ususario);
        await this.ingresarContrasenaUsuario.fill(contrasena);
        await this.ingresarACuenta.click();
    }

    async irARegistrarse(){
        await this.botonIrARegistrarse.click();
    }

  

}




