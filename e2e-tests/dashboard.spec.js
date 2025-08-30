const { test, expect } = require('@playwright/test');

test('login e acesso ao dashboard', async ({ page }) => {
  // Navega para a página de login
  await page.goto('http://localhost:3000/');

  // Preenche o campo email
  await page.fill('#email', 'cliente@email.com');  // substitua pelo email válido do teste

  // Preenche o campo senha
  await page.fill('#senha', '123');            // substitua pela senha válida

  // Envia o formulário
  await Promise.all([
    // page.waitForNavigation({ url: 'http://localhost:3000/dashboard' }),
    page.click('button[type="submit"]'),
  ]);

  // Verifica se o dashboard foi carregado corretamente
  await expect(page).toHaveURL('http://localhost:3000/dashboard');

  // Exemplo: verifica se o nome do usuário aparece no menu
  await expect(page.locator('#menuUsuario h1')).toHaveText('Nome do Usuário'); // substitua pelo nome esperado

  // Exemplo: verifica se existe pelo menos uma categoria visível
  await expect(page.locator('h1.text-white.font-bold')).toHaveCountGreaterThan(0);

  // Verifica se as estrelas de avaliação existem no dashboard
  await expect(page.locator('svg.w-5.h-5')).toHaveCountGreaterThan(0);
});
