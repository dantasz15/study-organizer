/**
 * TESTE DE INTEGRAÇÃO — motivationService
 *
 * Valida a comunicação com a Quotable API (serviço externo).
 * Cobre dois cenários:
 *   1. API disponível → retorna dados reais com as propriedades esperadas
 *   2. API indisponível → retorna frase de fallback sem quebrar a aplicação
 */

import { getMotivationalQuote, getFallbackQuote } from '../../src/services/motivationService.js';

describe('Integração: Quotable API', () => {
  // Guarda o fetch original antes de qualquer mock
  let originalFetch;

  beforeEach(() => {
    originalFetch = global.fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  // ─── Cenário 1: API respondendo corretamente ───────────────────────────────
  test('deve retornar objeto com content e author quando a API responde com sucesso', async () => {
    // Simula resposta bem-sucedida da Quotable API
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        content: 'A educação é a arma mais poderosa.',
        author: 'Nelson Mandela',
        tags: ['education'],
      }),
    });

    const quote = await getMotivationalQuote();

    expect(quote).toHaveProperty('content');
    expect(quote).toHaveProperty('author');
    expect(quote).toHaveProperty('source');
    expect(typeof quote.content).toBe('string');
    expect(typeof quote.author).toBe('string');
    expect(quote.content.length).toBeGreaterThan(0);
    expect(quote.author.length).toBeGreaterThan(0);
    expect(quote.source).toBe('api');
  });

  // ─── Cenário 2: API retorna status de erro ────────────────────────────────
  test('deve retornar fallback quando a API retorna status 500', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
    });

    const quote = await getMotivationalQuote();

    expect(quote).toHaveProperty('content');
    expect(quote).toHaveProperty('author');
    expect(quote.source).toBe('fallback');
    expect(quote.content.length).toBeGreaterThan(0);
  });

  // ─── Cenário 3: Falha de rede (offline) ───────────────────────────────────
  test('deve retornar fallback quando há falha de rede (offline)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const quote = await getMotivationalQuote();

    expect(quote.source).toBe('fallback');
    expect(typeof quote.content).toBe('string');
    expect(typeof quote.author).toBe('string');
  });

  // ─── Cenário 4: Valida o fallback local diretamente ──────────────────────
  test('getFallbackQuote deve retornar uma frase válida mesmo sem rede', () => {
    const quote = getFallbackQuote();

    expect(quote).toHaveProperty('content');
    expect(quote).toHaveProperty('author');
    expect(quote.source).toBe('fallback');
    expect(quote.content.length).toBeGreaterThan(10);
  });
});
