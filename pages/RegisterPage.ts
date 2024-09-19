import { Page, Locator, expect } from "@playwright/test";


export default class RegisterPage {

    readonly page: Page;


    readonly completarNombre: Locator;
    readonly completarApellido: Locator;
    readonly completarEmail: Locator;
    readonly completarContrasena: Locator;
    readonly confirmarContrasena: Locator;
    readonly fechaNacimiento: Locator;
    readonly suscripcionBoletin: Locator;
    readonly recibirOfertas: Locator;
    readonly ingresarDireccionUno: Locator;
    readonly ingresarDireccionDos: Locator;
    readonly ingresarPais: Locator;
    readonly ingresarEstado: Locator;
    readonly ingresarCP: Locator;
    readonly ingresarTelefono: Locator;
    readonly botonParaRegistrarse: Locator;

    readonly abrirCalendario: Locator;
    readonly botonMesAnterior: Locator;
    readonly botonMesPosterior: Locator;
    readonly seleccionMes: Locator;
    readonly seleccionAnio: Locator;





    constructor(page: Page) {
        this.page = page;
        //Localizadores de los elementos de la página
        this.completarNombre = page.getByPlaceholder('Ingrese un nombre');
        this.completarApellido = page.getByPlaceholder('Ingrese un apellido');
        this.completarEmail = page.getByPlaceholder('Ingrese un Email');
        this.completarContrasena = page.getByPlaceholder('Ingrese una contraseña');
        this.confirmarContrasena = page.getByPlaceholder('Confirmar contraseña');
        this.fechaNacimiento = page.getByPlaceholder('Seleccione una fecha');
        this.suscripcionBoletin = page.getByLabel('Suscríbete a nuestro boletín!');
        this.recibirOfertas = page.getByLabel('Sí');
        this.ingresarDireccionUno = page.getByPlaceholder('Ingrese la dirección', { exact: true });
        this.ingresarDireccionDos = page.getByPlaceholder('Ingrese la dirección 2');
        this.ingresarPais = page.locator('#country-input');
        this.ingresarEstado = page.locator('#state-input');
        this.ingresarCP = page.getByPlaceholder('Ingrese el código postal');
        this.ingresarTelefono = page.getByPlaceholder('Ingrese el número de móvil');
        this.botonParaRegistrarse = page.getByRole('button', { name: 'Registrarse' });

        // Selector para el campo de fecha
        this.abrirCalendario = this.page.locator('#dob-input');
        this.seleccionMes = this.page.locator('.react-datepicker__month-read-view');
        this.seleccionAnio = this.page.locator('.react-datepicker__year-read-view');


    }
    //Acciones sobre los elementos de la página
    async registrarse() {
        await this.botonParaRegistrarse.click();
    }
    /* 
    Creamos este método para realizar todo el registro completo del ususario, los datos del mismo estan almacenados
    en un archivo TestData.json 
    Dentro de registro completo recibimos como parámetro a datosUsuario (le podríamos haber puesto cualquier nombre), 
    y any para poder recibir cualquier tipo de dato.
    Para traer los datos especificos del json hacemos datosUsuario.nombre .. en este ejemplo traemos el nombre almacenado
    en nombre en el archivo json
    */
    async registroCompleto(datosUsuario: any) {
        await this.completarNombre.fill(datosUsuario.nombre);
        await this.completarApellido.fill(datosUsuario.apellido);
        const randomNumber = Math.floor(Math.random() * (999 - 10000) + 10000);
        await this.completarEmail.fill(datosUsuario.email + randomNumber + datosUsuario.emailDominio);
        await this.completarContrasena.fill(datosUsuario.contrasena);
        await this.confirmarContrasena.fill(datosUsuario.confirmarContrasena);
        //await this.fechaNacimiento.fill(datosUsuario.fechaDeNacimiento);
        // Extraer la fecha de nacimiento del archivo JSON
        const { dia, mes, anio } = datosUsuario.fechaDeNacimiento;
        // Llamar al método para seleccionar la fecha de nacimiento
        await this.seleccionarFecha(dia, mes, anio);
        await this.suscripcionBoletin.check();
        await this.recibirOfertas.check();
        await this.ingresarDireccionUno.fill(datosUsuario.direccionUno);
        await this.ingresarDireccionDos.fill(datosUsuario.direccionDos);
        await this.ingresarPais.selectOption(datosUsuario.pais);
        await this.ingresarEstado.selectOption(datosUsuario.estado);
        await this.ingresarCP.fill(datosUsuario.codigoPostal);
        await this.ingresarTelefono.fill(datosUsuario.telefono);
    }

    async seleccionarFecha(dia: number, mes: string, anio: number) {
        // Abre el datepicker
        await this.abrirCalendario.click();
        // Selecciona el año
        const opcionAnio = this.page.locator(`.react-datepicker__year-option`, { hasText: `${anio}` });
        await this.seleccionAnio.click();
        await opcionAnio.click();
        // Selecciona el mes
        const opcionMes = this.page.locator(`.react-datepicker__month-option`, { hasText: `${mes}` });
        await this.seleccionMes.click();
        await opcionMes.click();
        // Selecciona el día
        const opcionDia = this.page.locator(`.react-datepicker__day--0${dia}:not(.react-datepicker__day--outside-month)`);
        await opcionDia.click();
    }

}





