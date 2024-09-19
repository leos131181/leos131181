import { test, expect, BrowserContext } from '@playwright/test';
import HomePage from '../pages/HomePage'; // Asegúrate de que este path sea correcto.

let homepage: HomePage;
let context: BrowserContext;

test.beforeEach(async ({ browser }) => {
  // Crear un nuevo contexto ignorando errores de certificados SSL
  context = await browser.newContext({
    ignoreHTTPSErrors: true
  });
  
  // Abrir una nueva página dentro del contexto
  const page = await context.newPage();
  
  // Inicializar la página de inicio
  homepage = new HomePage(page);
  
  // Navegar a la página ignorando los certificados SSL inválidos
  await homepage.irALaPagina();
});

test.afterEach(async () => {
  // Cerrar el contexto del navegador después de cada prueba
  await context.close();
});

test('Ejemplo de prueba que navega a la página', async () => {
  // Verificar que el texto de la página esté visible
  await homepage.corroborarTextoPagina('Atenea Shop');
});
