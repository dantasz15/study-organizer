import fetch from 'node-fetch';

const QUOTE_API_URL = 'https://api.quotable.io/random?tags=education,inspirational,wisdom';

/**
 * Busca uma frase motivacional da Quotable API.
 * Retorna um fallback local se a API estiver indisponível.
 */
export async function getMotivationalQuote() {
  try {
    const response = await fetch(QUOTE_API_URL, { timeout: 5000 });

    if (!response.ok) {
      throw new Error(`API retornou status ${response.status}`);
    }

    const data = await response.json();

    return {
      content: data.content,
      author: data.author,
      source: 'api',
    };
  } catch (error) {
    return getFallbackQuote();
  }
}

/**
 * Retorna uma frase motivacional local (fallback offline).
 */
export function getFallbackQuote() {
  const quotes = [
    { content: 'O sucesso é a soma de pequenos esforços repetidos dia após dia.', author: 'Robert Collier' },
    { content: 'A educação é a arma mais poderosa que você pode usar para mudar o mundo.', author: 'Nelson Mandela' },
    { content: 'Aprender é a única coisa que a mente nunca se cansa, nunca tem medo e nunca se arrepende.', author: 'Leonardo da Vinci' },
    { content: 'Cada dia é uma nova oportunidade para aprender algo novo.', author: 'Anônimo' },
    { content: 'Não importa o quão devagar você vá, desde que não pare.', author: 'Confúcio' },
  ];

  const random = quotes[Math.floor(Math.random() * quotes.length)];
  return { ...random, source: 'fallback' };
}
