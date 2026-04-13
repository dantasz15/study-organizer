/**
 * TaskManager - Gerenciador de Tarefas de Estudo
 * @author dantasz15
 * @version 1.0.0
 */

class TaskManager {
  constructor() {
    this.tasks = [];
    this.nextId = 1;
  }

  addTask(title, subject, duration, priority) {
    if (!title || typeof title !== 'string' || title.trim().length === 0) {
      throw new Error('Título é obrigatório e não pode ser vazio');
    }

    if (title.trim().length > 100) {
      throw new Error('Título deve ter no máximo 100 caracteres');
    }

    if (!subject || typeof subject !== 'string' || subject.trim().length === 0) {
      throw new Error('Matéria/disciplina é obrigatória');
    }

    if (!Number.isInteger(duration)) {
      throw new Error('Duração deve ser um número inteiro');
    }

    if (duration <= 0) {
      throw new Error('Duração deve ser maior que zero');
    }

    if (duration > 480) {
      throw new Error('Duração máxima é 480 minutos (8 horas)');
    }

    const validPriorities = ['alta', 'media', 'baixa'];
    const normalizedPriority = priority?.toLowerCase().trim();

    if (!validPriorities.includes(normalizedPriority)) {
      throw new Error('Prioridade deve ser: alta, media ou baixa');
    }

    const normalizedTitle = title.trim().toLowerCase();
    const duplicateExists = this.tasks.some(
      (t) => t.title.toLowerCase() === normalizedTitle && !t.completed
    );

    if (duplicateExists) {
      throw new Error('Já existe uma tarefa ativa com este título. Conclua ou remova a existente primeiro.');
    }

    const task = {
      id: this.nextId++,
      title: title.trim(),
      subject: subject.trim(),
      duration: duration,
      priority: normalizedPriority,
      completed: false,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      completedAt: null
    };

    this.tasks.push(task);
    return task;
  }

  listTasks() {
    const priorityOrder = { alta: 0, media: 1, baixa: 2 };

    return [...this.tasks].sort((a, b) => {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  completeTask(id) {
    const task = this.tasks.find((t) => t.id === id);

    if (!task || task.completed) {
      return false;
    }

    task.completed = true;
    task.completedAt = new Date().toLocaleDateString('pt-BR');
    return true;
  }

  removeTask(id) {
    const index = this.tasks.findIndex((t) => t.id === id);

    if (index === -1) {
      return false;
    }

    this.tasks.splice(index, 1);
    return true;
  }

  searchTasks(term) {
    if (!term || typeof term !== 'string' || term.trim().length === 0) {
      return [];
    }

    const searchTerm = term.toLowerCase().trim();

    return this.tasks.filter(
      (t) =>
        t.title.toLowerCase().includes(searchTerm) ||
        t.subject.toLowerCase().includes(searchTerm)
    );
  }

  getStats() {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      percentage
    };
  }

  loadTasks(tasks) {
    if (Array.isArray(tasks)) {
      this.tasks = tasks;
      const maxId = Math.max(...tasks.map((t) => t.id), 0);
      this.nextId = maxId + 1;
    }
  }

  getRawTasks() {
    return this.tasks;
  }
}

module.exports = TaskManager;
