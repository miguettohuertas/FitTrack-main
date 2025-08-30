const { test, expect } = require('@playwright/test');

test.describe('Página de Login', () => {

  const baseURL = 'http://localhost:3000/'; // ajuste para sua URL real

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('deve carregar a página com os campos e botão visíveis', async ({ page }) => {
    await expect(page.locator('form#login')).toBeVisible();

    await expect(page.locator('input#email')).toBeVisible();
    await expect(page.locator('input#senha')).toBeVisible();

    await expect(page.locator('button[type=submit]')).toBeVisible();

    // Verifica link para cadastro
    const linkCadastro = page.locator('a[href="/cadastro"]');
    await expect(linkCadastro).toBeVisible();
    await expect(linkCadastro).toHaveText(/Cadastre-se aqui/i);
  });

  test('deve mostrar erro ao submeter formulário vazio', async ({ page }) => {
    await page.locator('button[type=submit]').click();

    // Testa se o navegador mostra validação de campo required
    // Note: Playwright não captura diretamente o erro do navegador,
    // mas podemos tentar verificar se o foco fica no campo 'email'
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeFocused();
  });

  test('deve mostrar erro para email inválido', async ({ page }) => {
    await page.fill('input#email', 'emailinvalido');
    await page.fill('input#senha', 'qualquersenha');

    await page.locator('button[type=submit]').click();

    // Testa que o navegador não deixa submeter por email inválido
    // Verifica se foco volta para o campo email
    const emailInput = page.locator('input#email');
    await expect(emailInput).toBeFocused();
  });

  test('deve submeter formulário com dados válidos', async ({ page }) => {
    // Preencha com dados válidos que você sabe que existem no sistema
    await page.fill('input#email', 'usuario@teste.com');
    await page.fill('input#senha', 'senha123');

    await page.locator('button[type=submit]').click();

    // Aqui depende do seu app:
    // Exemplo: espera que URL tenha mudado para dashboard
    await expect(page).toHaveURL(/dashboard|home/);

    // Ou espera que algum elemento exclusivo do dashboard apareça
    // await expect(page.locator('#dashboard')).toBeVisible();
  });

  test('link para cadastro deve redirecionar para página de cadastro', async ({ page }) => {
    await page.locator('a[href="/cadastro"]').click();

    await expect(page).toHaveURL(/cadastro/);
  });
});
