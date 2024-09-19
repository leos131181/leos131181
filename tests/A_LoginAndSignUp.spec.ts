//Aquí estamos importando dos funciones de Playwright:
//test: Es una función que define un caso de prueba. Acepta una descripción del caso de prueba
// y una función asincrónica que contiene los pasos a seguir para realizar la prueba.
//expect: Es una función de aserción que se usa para verificar si el estado actual de 
//la página o de los elementos en ella cumple con las expectativas. Esencialmente, 
//ayuda a validar que las cosas funcionen como se espera.


import { test, expect } from '@playwright/test';



//importamos las diferentes Pages
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import Utils from '../commons/Utils';
import * as testData from '../tests/fixtures/TestData.json'



//Aquí estamos declarando una variable llamada homepage que será utilizada para almacenar una instancia 
//de las clases.
let homepage: HomePage;
let loginpage: LoginPage;
let registerPage: RegisterPage;
let utils: Utils;



//HOOKS: Códigos repetidos para los casos de prueba lo podemos ejecutar de la siguiente forma


test.beforeEach(async ({ page }) => {
  homepage = new HomePage(page);
  loginpage = new LoginPage(page);
  registerPage = new RegisterPage(page);
  utils = new Utils(page);
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');
  //Ir a la página login
  await homepage.irALaPaginaLogin();

})


/*
test.beforeEach(async ({ browser }) => {
  // Crear un nuevo contexto ignorando los errores SSL
  const context = await browser.newContext({
   ignoreHTTPSErrors: true, // Ignorar errores de certificados SSL
 });
 // Crear una nueva página usando el contexto con SSL ignorado
 const page = await context.newPage();
 homepage = new HomePage(page);
 loginpage = new LoginPage(page);
 registerPage = new RegisterPage(page);
 utils = new Utils(page);
 //Ir a la página principal
 await homepage.irALaPagina();
 //Corroborar el que el texto este visible en la pagina
 await homepage.corroborarTextoPagina('Atenea Shop');
 //Ir a la página login
 await homepage.irALaPaginaLogin();
})
*/


test('Caso de Prueba 1: Registrar Usuario', async ({ page }) => {
  //inicializamos la HomePage llamando al contructor de la misma
  //Aquí se crea una nueva instancia de HomePage utilizando el constructor de la clase HomePage.
  // Si hacemos ctrl+click sobre HomePage nos lleva al bloque de código del constructor que estamos llamando

  // colocamos todo esto en el Hock beforeEach porque se ejecuta en todos los casos de prueba
  //homepage = new HomePage(page);
  //loginpage = new LoginPage(page);
  //registerPage = new RegisterPage(page);
  //utils = new Utils(page);
  //Ir a la página principal
  //await homepage.irALaPagina();
  //Ir a la página login
  //await homepage.irALaPaginaLogin();

  //Ir a registrarse 
  await loginpage.irARegistrarse();
  //Verifico que estoy en la pagina register 'atenea.uno/register'
  await utils.verificarPagina('atenea.uno/register');
  /* Usa todos los datos del ususarioNuevo almacenados en el archivo json, en este caso llamamos a todos los datos de
  ususarioNuevo almacenados en el json y con eso se raealiza el registto completo del ususario
  */
  await registerPage.registroCompleto(testData.usuarioNuevo);
  /*
  await registerPage.completarNombre.fill('John');
  await registerPage.completarApellido.fill('Doe');
  const randomNumber = Math.floor(Math.random() * (999 - 10000) + 10000);
  await registerPage.completarEmail.fill('JohnDoe' + randomNumber + '@gmail.com');
  await registerPage.completarContrasena.fill('L123456*');
  await registerPage.confirmarContrasena.fill('L123456*');
  await registerPage.fechaNacimiento.fill('13/11/81');
  await registerPage.suscripcionBoletin.check();
  await registerPage.recibirOfertas.check();
  await registerPage.ingresarDireccionUno.fill('Totoras 73');
  await registerPage.ingresarDireccionDos.fill('Pasaje Candamo');
  await registerPage.ingresarPais.selectOption('Argentina');
  await registerPage.ingresarEstado.selectOption('Córdoba');
  await registerPage.ingresarCP.fill('5000');
  await registerPage.ingresarTelefono.fill('351351');
  */
  //Me registro haciendo click en el boton registrar
  await registerPage.registrarse();
  //Verifico que estoy en la pagina principal 'atenea.uno'
  await utils.verificarPagina('atenea.uno');
  //Verifico que este visible el ususario
  await homepage.verificarUsuarioVisible('John');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 2: Iniciar Sesión con correo electrónico y contraseña correctos', async ({ page }) => {
  //se esta ejecutando en el Hooks
  //homepage = new HomePage(page);
  //loginpage = new LoginPage(page);
  //utils = new Utils(page);
  //Ir a la página principal
  //await homepage.irALaPagina();
  //Ir a la página login
  //await homepage.irALaPaginaLogin();

  //Me logueo con usuario y contraseña
  await loginpage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //Verifico que estoy en la pagina principal 'atenea.uno'
  await utils.verificarPagina('atenea.uno');
  //Verifico que este visible el ususario
  await homepage.verificarUsuarioVisible('Leonardo');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 3: Iniciar Sesión con correo electrónico y contraseña incorrectos', async ({ page }) => {
  //se esta ejecutando en el Hooks
  //homepage = new HomePage(page);
  //loginpage = new LoginPage(page);
  //utils = new Utils(page);
  //Ir a la página principal
  //await homepage.irALaPagina();
  //Ir a la página login
  //await homepage.irALaPaginaLogin();

  //Me logueo con usuario y contraseña incorrectos
  await loginpage.logueoUsuarioContraseña('leo@gmail.com', 'L12345');
  //Verifico el  que el texto 'Por favor ingrese una dirección de correo electrónico válida' esté visible
  await utils.verificarTextoVisible('Por favor ingrese una dirección de correo electrónico válida');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 4: Cerrar Sesión', async ({ page }) => {
  //se esta ejecutando en el Hooks
  //homepage = new HomePage(page);
  //loginpage = new LoginPage(page);
  //utils = new Utils(page);
  //Ir a la página principal
  //await homepage.irALaPagina();
  //Ir a la página login
  //await homepage.irALaPaginaLogin();

  //Verifico que estoy en la loginpage 'atenea.uno/login'
  await utils.verificarPagina('atenea.uno/login');
  //Me logueo con usuario y contraseña
  await loginpage.logueoUsuarioContraseña('leo131181@gmail.com', 'L123456*');
  //Salir de la sesión
  await homepage.cerrarSesion();
  //verifico que el texto 'Usuario deslogueado' esté visible
  await utils.verificarTextoVisible('Usuario deslogueado correctamente');
  //Verifico que estoy en la loginpage 'atenea.uno/login'
  await utils.verificarPagina('atenea.uno/login');
  await page.waitForTimeout(2000);

});

test('Caso de Prueba 5: Registrar Usuario con correo electrónico existente', async ({ page }) => {
  ////se esta ejecutando en el Hooks
  //homepage = new HomePage(page);
  //loginpage = new LoginPage(page);
  //registerPage = new RegisterPage(page);
  //utils = new Utils(page);
  //Ir a la página principal
  //await homepage.irALaPagina();
  //Ir a la página login
  //await homepage.irALaPaginaLogin();

  //Ir a registrarse 
  await loginpage.irARegistrarse();
  //Verifico que estoy en la pagina register 'atenea.uno/register'
  await utils.verificarPagina('atenea.uno/register');
  /*Realizar el registro de un ususario existente, el problema que tengo es que
  cada vez que uso el método  me genera un usuario aleatorio y por eso el test no funciona
  */
  //await registerPage.registroCompleto(testData.usuarioCreado);

  await registerPage.completarNombre.fill('Leonardo');
  await registerPage.completarApellido.fill('Sanchez');
  await registerPage.completarEmail.fill('leo131181@gmail.com');
  await registerPage.completarContrasena.fill('L123456*');
  await registerPage.confirmarContrasena.fill('L123456*');
  //await registerPage.fechaNacimiento.fill('13/11/81');
  // Extraer la fecha de nacimiento del archivo JSON
  const { dia, mes, anio } = testData.usuarioNuevo.fechaDeNacimiento;
  // Llamar al método para seleccionar la fecha de nacimiento
  await registerPage.seleccionarFecha(dia, mes, anio);
  await registerPage.suscripcionBoletin.check();
  await registerPage.recibirOfertas.check();
  await registerPage.ingresarDireccionUno.fill('Totoras 73');
  await registerPage.ingresarDireccionDos.fill('Pasaje Candamo');
  await registerPage.ingresarPais.selectOption('Argentina');
  await registerPage.ingresarEstado.selectOption('Córdoba');
  await registerPage.ingresarCP.fill('5000');
  await registerPage.ingresarTelefono.fill('351351');
  //Me registro haciendo click en el boton registrar
  await registerPage.registrarse();
  // Verifico que el texto 'Ya existe un usuario con ese' esté visible
  await utils.verificarTextoVisible('Ya existe un usuario con ese mail');
  await page.waitForTimeout(2000);

});






