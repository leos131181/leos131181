import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import Utils from '../commons/Utils';

let homepage: HomePage;
let utils: Utils;

test.beforeEach(async ({page}) => {
  homepage = new HomePage(page);
  utils = new Utils(page);
  //Ir a la página principal
  await homepage.irALaPagina();
  //Corroborar el que el texto este visible en la pagina
  await homepage.corroborarTextoPagina('Atenea Shop');
  //Ir a la página login
  await homepage.irALaPaginaLogin();

})

test('Caso de Prueba 6: Suscripción al boletín', async ({ page }) => {
  
 
  // Suscribirse al boletín
  await homepage.subscribeToNewsletter('leo131181@gmail.com');
  //verifico que el texto 'Usuario deslogueado' esté visible
  await utils.verificarTextoVisible('¡Suscripción exitosa!');

  await page.waitForTimeout(2000);

});




