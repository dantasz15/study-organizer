import { readFileSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_FILE = join(__dirname, '../../data/tasks.json');

const PRIORITIES = {
  alta: { label: '🔴 Alta', value: 3 },
  media: { label: '🟡 Média', value: 2 },
  baixa: { label: '🟢 Baixa', value: 1 },
};

function loadTasks() {
  if (!existsSync(DATA_FILE)) return [];
  try {
    return JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

function saveTasks(tasks) {
  writeFileSync(DATA_FILE, JSON.stringify(tasks, null, 2));
}

export function addTask(title, priority = 'media', estimatedMinutes = 30) {
  const tasks = loadTasks();
  const task = {
    id: Date.now(),
    title,
    priority,
    estimatedMinutes,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  tasks.push(task);
  saveTasks(tasks);
  return task;
}

export function listTasks() {
  const tasks = loadTasks();
  return tasks.sort((a, b) => (PRIORITIES[b.priority]?.value || 0) - (PRIORITIES[a.priority]?.value || 0));
}

export function completeTask(id) {
  const tasks = loadTasks();
  const task = tasks.find(t => t.id === Number(id));
  if (!task) return null;
  task.completed = true;
  task.completedAt = new Date().toISOString();
  saveTasks(tasks);
  return task;
}

export function getProgress() {
  const tasks = loadTasks();
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;
  const totalMinutes = tasks.reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);
  const doneMinutes = tasks.filter(t => t.completed).reduce((acc, t) => acc + (t.estimatedMinutes || 0), 0);

  return { total, done, pending: total - done, totalMinutes, doneMinutes };
}

export function getPriorityLabel(priority) {
  return PRIORITIES[priority]?.label || '⚪ Indefinida';
}
