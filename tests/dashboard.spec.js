const { test, expect } = require('@playwright/test');

test.describe('Dashboard', () => {

  // URL do dashboard - ajuste para sua URL local ou ambiente de testes
  const baseURL = 'http://localhost:3000/dashboard';

  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('deve mostrar nome do usuário e avatar no menu', async ({ page }) => {
    // O nome do cliente deve aparecer no menu
    const nomeCliente = await page.locator('#menuUsuario h1').textContent();
    expect(nomeCliente.trim().length).toBeGreaterThan(0);

    // O avatar deve estar visível com a tag img
    const avatar = page.locator('#menuUsuario img[alt="Perfil"]');
    await expect(avatar).toBeVisible();
  });

  test('dropdown do menu de usuário abre e fecha ao clicar', async ({ page }) => {
    const menuUsuario = page.locator('#menuUsuario');
    const dropdown = page.locator('#dropdownMenu');
    const arrow = page.locator('#arrow');

    // Dropdown inicia escondido
    await expect(dropdown).toHaveClass(/hidden/);
    expect(await arrow.getAttribute('class')).not.toContain('rotate-180');

    // Clicar no menu abre dropdown
    await menuUsuario.click();
    await expect(dropdown).not.toHaveClass(/hidden/);
    expect(await arrow.getAttribute('class')).toContain('rotate-180');

    // Clicar fora fecha dropdown
    await page.click('body', { position: { x: 0, y: 0 } });
    await expect(dropdown).toHaveClass(/hidden/);
    expect(await arrow.getAttribute('class')).not.toContain('rotate-180');
  });

  test('exibe categorias e treinos com título e avaliações', async ({ page }) => {
    // Confirma que pelo menos uma categoria aparece com título visível
    const categorias = page.locator('h1.text-white.font-bold');
    await expect(categorias).toHaveCountGreaterThan(0);

    // Para a primeira categoria, verifica se existem cards de treino
    const primeiroCard = page.locator('div.shadow-md.rounded-lg').first();
    await expect(primeiroCard).toBeVisible();

    // Verifica título do treino no card
    const tituloTreino = primeiroCard.locator('h4.text-lg.font-semibold');
    await expect(tituloTreino).toBeVisible();
    expect((await tituloTreino.textContent()).trim().length).toBeGreaterThan(0);

    // Verifica se existe alguma estrela (svg) de avaliação
    const estrelas = primeiroCard.locator('svg');
    await expect(estrelas).toHaveCountGreaterThan(0);
  });

  test('clicar no card do treino navega para a página do treino', async ({ page }) => {
    const primeiroCard = page.locator('div.shadow-md.rounded-lg').first();
    const link = primeiroCard.locator('a');

    const href = await link.getAttribute('href');

    // Clica no link
    await link.click();

    // Espera que a URL tenha mudado para o href esperado
    await expect(page).toHaveURL(new RegExp(href));
  });

  test('scroll horizontal funciona nos cards', async ({ page }) => {
    const scrollContainer = page.locator('#scrollContainer');

    // Pega scroll inicial
    const scrollBefore = await scrollContainer.evaluate(el => el.scrollLeft);

    // Scrollar 300px para direita
    await scrollContainer.evaluate(el => el.scrollBy({ left: 300, behavior: 'smooth' }));

    // Espera que o scroll mudou
    await page.waitForTimeout(500); // espera animação smooth terminar
    const scrollAfter = await scrollContainer.evaluate(el => el.scrollLeft);

    expect(scrollAfter).toBeGreaterThan(scrollBefore);
  });

});
