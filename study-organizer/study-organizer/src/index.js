#!/usr/bin/env node

/**
 * Study Organizer CLI
 * Aplicação para gerenciamento de tarefas de estudo
 * Autor: dantasz15
 * Versão: 1.0.0
 */

const readline = require('readline');
const TaskManager = require('./task');
const Storage = require('./storage');

class StudyOrganizerCLI {
  constructor() {
    this.manager = new TaskManager();
    this.storage = new Storage();
    this.rl = null;
  }

  async start() {
    await this.loadData();
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    console.clear();
    await this.showWelcome();
    await this.mainLoop();
  }

  async showWelcome() {
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║                                                        ║');
    console.log('║           📚  S T U D Y   O R G A N I Z E R           ║');
    console.log('║                                                        ║');
    console.log('║   Organizador de estudos para estudantes com          ║');
    console.log('║   dificuldade de manter rotina (TDAH/Neurodivergência) ║');
    console.log('║                                                        ║');
    console.log('║   Autor: dantasz15  |  Versão: 1.0.0                  ║');
    console.log('║                                                        ║');
    console.log('╚════════════════════════════════════════════════════════╝');
    console.log('');
    await this.pause('Pressione ENTER para começar...');
  }

  async mainLoop() {
    let running = true;
    
    while (running) {
      console.clear();
      this.showMenu();
      
      const option = await this.ask('\n👉 Escolha uma opção: ');
      
      try {
        switch (option.trim()) {
          case '1':
            await this.addTask();
            break;
          case '2':
            await this.listTasks();
            break;
          case '3':
            await this.completeTask();
            break;
          case '4':
            await this.removeTask();
            break;
          case '5':
            await this.searchTasks();
            break;
          case '6':
            await this.showStats();
            break;
          case '0':
          case 'sair':
            running = false;
            break;
          default:
            console.log('\n⚠️  Opção inválida! Tente novamente.');
            await this.pause();
        }
      } catch (error) {
        console.log(`\n❌ Erro: ${error.message}`);
        await this.pause();
      }
    }

    console.log('\n👋 Até logo! Bons estudos!\n');
    this.rl.close();
  }

  showMenu() {
    const stats = this.manager.getStats();
    
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  📋 MENU PRINCIPAL                                     ║');
    console.log('╠════════════════════════════════════════════════════════╣');
    console.log('║                                                        ║');
    console.log('║  1. ➕  Adicionar nova tarefa de estudo               ║');
    console.log('║  2. 📋  Listar todas as tarefas                       ║');
    console.log('║  3. ✅  Marcar tarefa como concluída                  ║');
    console.log('║  4. 🗑️   Remover tarefa                                ║');
    console.log('║  5. 🔍  Buscar tarefas                                ║');
    console.log('║  6. 📊  Ver progresso e estatísticas                  ║');
    console.log('║                                                        ║');
    console.log('║  0. 🚪  Sair                                           ║');
    console.log('║                                                        ║');
    console.log(`║  📊 Progresso: ${stats.completed}/${stats.total} (${stats.percentage}%)` + 
                ' '.repeat(21 - `${stats.completed}/${stats.total} (${stats.percentage}%)`.length) + '║');
    console.log('╚════════════════════════════════════════════════════════╝');
  }

  async addTask() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  ➕ NOVA TAREFA DE ESTUDO                              ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const title = await this.ask('📌 Título da tarefa: ');
    const subject = await this.ask('📚 Matéria/Disciplina: ');
    const durationStr = await this.ask('⏱️  Duração estimada (minutos): ');
    const duration = parseInt(durationStr, 10);
    
    console.log('\n🔴 Alta  |  🟡 Média  |  🟢 Baixa');
    const priority = await this.ask('🎯 Prioridade: ');

    try {
      const task = this.manager.addTask(title, subject, duration, priority);
      await this.saveData();
      
      console.log('\n✅ Tarefa adicionada com sucesso!');
      console.log(`   ID: ${task.id}`);
      console.log(`   Título: ${task.title}`);
      console.log(`   Matéria: ${task.subject}`);
      console.log(`   Duração: ${task.duration} minutos`);
      console.log(`   Prioridade: ${this.getPriorityEmoji(task.priority)} ${task.priority.toUpperCase()}`);
    } catch (error) {
      console.log(`\n❌ ${error.message}`);
    }
    
    await this.pause();
  }

  async listTasks() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  📋 LISTA DE TAREFAS                                   ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const tasks = this.manager.listTasks();
    
    if (tasks.length === 0) {
      console.log('📭 Nenhuma tarefa cadastrada.');
      console.log('\n💡 Dica: Use a opção 1 para adicionar sua primeira tarefa!');
    } else {
      console.log(`Total: ${tasks.length} tarefa(s)\n`);
      console.log('─'.repeat(70));
      
      tasks.forEach((task) => {
        const status = task.completed ? '✅' : '⏳';
        const priorityEmoji = this.getPriorityEmoji(task.priority);
        
        console.log(`${status} [ID: ${task.id.toString().padStart(3)}] ${priorityEmoji} ${task.title}`);
        console.log(`   📚 ${task.subject} | ⏱️ ${task.duration}min | 📅 ${task.createdAt}`);
        
        if (task.completed && task.completedAt) {
          console.log(`   ✓ Concluída em: ${task.completedAt}`);
        }
        
        console.log('─'.repeat(70));
      });
    }
    
    await this.pause();
  }

  async completeTask() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  ✅ CONCLUIR TAREFA                                    ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const idStr = await this.ask('🔢 ID da tarefa a concluir: ');
    const id = parseInt(idStr, 10);

    if (this.manager.completeTask(id)) {
      await this.saveData();
      console.log('\n🎉 Parabéns! Tarefa concluída com sucesso!');
      console.log('   Continue assim, você está indo muito bem! 💪');
    } else {
      console.log('\n❌ Tarefa não encontrada ou já está concluída.');
    }
    
    await this.pause();
  }

  async removeTask() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  🗑️  REMOVER TAREFA                                    ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const idStr = await this.ask('🔢 ID da tarefa a remover: ');
    const id = parseInt(idStr, 10);

    const confirm = await this.ask('⚠️  Tem certeza? (s/N): ');
    
    if (confirm.toLowerCase() === 's') {
      if (this.manager.removeTask(id)) {
        await this.saveData();
        console.log('\n✅ Tarefa removida com sucesso!');
      } else {
        console.log('\n❌ Tarefa não encontrada.');
      }
    } else {
      console.log('\n🚫 Operação cancelada.');
    }
    
    await this.pause();
  }

  async searchTasks() {
    console.clear();
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  🔍 BUSCAR TAREFAS                                     ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const term = await this.ask('🔎 Digite o termo de busca: ');
    const results = this.manager.searchTasks(term);

    if (results.length === 0) {
      console.log(`\n📭 Nenhuma tarefa encontrada para "${term}".`);
    } else {
      console.log(`\n📋 ${results.length} resultado(s) para "${term}":\n`);
      console.log('─'.repeat(70));
      
      results.forEach((task) => {
        const status = task.completed ? '✅' : '⏳';
        const priorityEmoji = this.getPriorityEmoji(task.priority);
        console.log(`${status} [ID: ${task.id}] ${priorityEmoji} ${task.title} - ${task.subject}`);
      });
    }
    
    await this.pause();
  }

  async showStats() {
    console.clear();
    const stats = this.manager.getStats();
    
    console.log('╔════════════════════════════════════════════════════════╗');
    console.log('║  📊 ESTATÍSTICAS E PROGRESSO                           ║');
    console.log('╚════════════════════════════════════════════════════════╝\n');

    const barLength = 40;
    const filled = Math.round((stats.percentage / 100) * barLength);
    const empty = barLength - filled;
    const bar = '█'.repeat(filled) + '░'.repeat(empty);

    console.log('📈 PROGRESSO GERAL');
    console.log('');
    console.log(`[${bar}] ${stats.percentage}%`);
    console.log('');
    console.log(`📊 Total de tarefas:    ${stats.total.toString().padStart(3)}`);
    console.log(`✅ Concluídas:           ${stats.completed.toString().padStart(3)}`);
    console.log(`⏳ Pendentes:            ${stats.pending.toString().padStart(3)}`);
    console.log('');

    if (stats.total > 0) {
      if (stats.percentage === 100) {
        console.log('🎉 INCRÍVEL! Você concluiu todas as tarefas!');
      } else if (stats.percentage >= 75) {
        console.log('🔥 Muito bem! Você está quase lá!');
      } else if (stats.percentage >= 50) {
        console.log('💪 Bom trabalho! Continue assim!');
      } else if (stats.percentage > 0) {
        console.log('🌱 Começando bem! Cada passo conta!');
      } else {
        console.log('💡 Que tal começar com uma tarefa pequena?');
      }
    }
    
    await this.pause();
  }

  async loadData() {
    const data = await this.storage.load();
    if (data && data.tasks) {
      this.manager.loadTasks(data.tasks);
    }
  }

  async saveData() {
    await this.storage.save({ tasks: this.manager.getRawTasks() });
  }

  ask(question) {
    return new Promise((resolve) => {
      this.rl.question(question, resolve);
    });
  }

  async pause(message = '\nPressione ENTER para continuar...') {
    await this.ask(message);
  }

  getPriorityEmoji(priority) {
    const emojis = {
      alta: '🔴',
      media: '🟡',
      baixa: '🟢'
    };
    return emojis[priority] || '⚪';
  }
}

if (require.main === module) {
  const app = new StudyOrganizerCLI();
  app.start().catch((err) => {
    console.error('Erro fatal:', err);
    process.exit(1);
  });
}

module.exports = StudyOrganizerCLI;
