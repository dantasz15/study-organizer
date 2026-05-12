import { startSession } from './controllers/sessionController.js';
import { handleAddTask, handleListTasks, handleCompleteTask } from './controllers/taskController.js';

const [,, command, ...args] = process.argv;

async function main() {
  switch (command) {
    case 'start':
      await startSession();
      break;

    case 'add':
      if (!args[0]) {
        console.log('Uso: npm start add "Título da tarefa" [alta|media|baixa] [minutos]');
        break;
      }
      handleAddTask(args[0], args[1] || 'media', args[2] || 30);
      break;

    case 'list':
      handleListTasks();
      break;

    case 'done':
      if (!args[0]) {
        console.log('Uso: npm start done <id>');
        break;
      }
      handleCompleteTask(args[0]);
      break;

    default:
      await startSession();
      console.log('Comandos disponíveis:');
      console.log('  npm start              → Inicia sessão com frase motivacional');
      console.log('  npm start add "título" [prioridade] [minutos]');
      console.log('  npm start list         → Lista todas as tarefas');
      console.log('  npm start done <id>    → Marca tarefa como concluída\n');
  }
}

main().catch(console.error);
