import { getMotivationalQuote } from '../services/motivationService.js';
import { getProgress } from '../services/taskService.js';

/**
 * Exibe a tela de boas-vindas com frase motivacional da API
 * e o resumo de progresso do usuário.
 */
export async function startSession() {
  console.log('\n╔══════════════════════════════════════════╗');
  console.log('║        📚  STUDY ORGANIZER  v2.0         ║');
  console.log('╚══════════════════════════════════════════╝\n');

  console.log('🔄 Buscando frase motivacional...');
  const quote = await getMotivationalQuote();

  console.log('\n✨ ─────────────────────────────────────────');
  console.log(`   "${quote.content}"`);
  console.log(`   — ${quote.author}`);
  if (quote.source === 'fallback') {
    console.log('   (modo offline)');
  }
  console.log('─────────────────────────────────────────\n');

  const progress = getProgress();
  if (progress.total > 0) {
    const pct = Math.round((progress.done / progress.total) * 100);
    const bar = '█'.repeat(Math.round(pct / 10)) + '░'.repeat(10 - Math.round(pct / 10));

    console.log('📊 Seu progresso:');
    console.log(`   [${bar}] ${pct}%`);
    console.log(`   ✅ ${progress.done}/${progress.total} tarefas concluídas`);
    console.log(`   ⏱️  ${progress.doneMinutes}/${progress.totalMinutes} minutos estudados\n`);
  } else {
    console.log('📋 Nenhuma tarefa cadastrada ainda. Comece adicionando uma!\n');
  }
}
