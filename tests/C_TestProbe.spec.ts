import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';
import RegisterPage from '../pages/RegisterPage';
import ScenariosPage from '../pages/ScenariosPage';


let homepage: HomePage;
let utils: Utils;
let registerPage: RegisterPage;
let scenariosPage: ScenariosPage;


test.beforeEach(async ({page}) => {
  homepage = new HomePage(page);
  registerPage = new RegisterPage(page);
  utils = new Utils(page);
  scenariosPage = new ScenariosPage(page);
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');

})


test('Caso de Prueba 7: Verificar la Página de Casos de Prueba', async ({ page }) => {


  //Ir a la pagina Escenarios
  await homepage.irAEscenarios();
  //Verifico que estoy en la pagina register 'atenea.uno/scenarios'
  await utils.verificarPagina('atenea.uno/scenarios');
  await homepage.corroborarTextoPagina('Escenarios de prueba');
  // Verificar que la sección de Casos Funcionales esté seleccionada por defecto
  await scenariosPage.verificarEstadoDelSwitchEsperado('rgb(204, 204, 204)'); // Gris es el color que tiene el switch en esa posición
  // Verificar que hay 26 casos de prueba en la página (Casos Funcionales)
  await scenariosPage.verificarCantidadDeCasosDePrueba(28);
  // Cambiar switch a Casos API
  await scenariosPage.accionarSwitch();
  await page.waitForTimeout(2000);
  // Verificar que la sección de Casos API esté seleccionada despues de accionar el switch
  await scenariosPage.verificarEstadoDelSwitchEsperado('rgb(33, 150, 243)'); // Azul
  // Verificar que hay 14 casos de prueba en la página (Casos API)
  await scenariosPage.verificarCantidadDeCasosDePrueba(14);

  await page.waitForTimeout(2000);

});




