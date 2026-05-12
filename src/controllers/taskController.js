import { addTask, listTasks, completeTask, getPriorityLabel } from '../services/taskService.js';

export function handleAddTask(title, priority, minutes) {
  const task = addTask(title, priority, Number(minutes));
  console.log(`\n✅ Tarefa adicionada com sucesso!`);
  console.log(`   📌 ${task.title}`);
  console.log(`   ${getPriorityLabel(task.priority)} | ⏱️  ${task.estimatedMinutes} min\n`);
  return task;
}

export function handleListTasks() {
  const tasks = listTasks();

  if (tasks.length === 0) {
    console.log('\n📋 Nenhuma tarefa cadastrada.\n');
    return;
  }

  console.log('\n📋 ─── Suas Tarefas ───────────────────────\n');
  tasks.forEach((task, i) => {
    const status = task.completed ? '✅' : '⬜';
    const title = task.completed ? `[FEITA] ${task.title}` : task.title;
    console.log(`  ${i + 1}. ${status} [ID: ${task.id}] ${title}`);
    console.log(`     ${getPriorityLabel(task.priority)} | ⏱️  ${task.estimatedMinutes} min`);
  });
  console.log('\n─────────────────────────────────────────\n');
}

export function handleCompleteTask(id) {
  const task = completeTask(id);
  if (!task) {
    console.log(`\n❌ Tarefa com ID ${id} não encontrada.\n`);
    return;
  }
  console.log(`\n🎉 Parabéns! Tarefa concluída: "${task.title}"\n`);
}
