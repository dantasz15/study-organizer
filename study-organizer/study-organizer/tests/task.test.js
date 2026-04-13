/**
 * Testes automatizados do Study Organizer
 * @author dantasz15
 */

const TaskManager = require('../src/task');

describe('Study Organizer - TaskManager', () => {
  let manager;

  beforeEach(() => {
    manager = new TaskManager();
  });

  describe('✅ Caminho Feliz', () => {
    test('deve adicionar tarefa válida com todos os dados corretos', () => {
      const task = manager.addTask(
        'Estudar Derivadas',
        'Cálculo I',
        60,
        'alta'
      );

      expect(task).toMatchObject({
        id: 1,
        title: 'Estudar Derivadas',
        subject: 'Cálculo I',
        duration: 60,
        priority: 'alta',
        completed: false
      });
      expect(task.createdAt).toBeDefined();
      expect(task.completedAt).toBeNull();
    });

    test('deve incrementar IDs automaticamente', () => {
      const task1 = manager.addTask('Tarefa 1', 'Mat', 30, 'baixa');
      const task2 = manager.addTask('Tarefa 2', 'Mat', 45, 'media');
      const task3 = manager.addTask('Tarefa 3', 'Mat', 60, 'alta');

      expect(task1.id).toBe(1);
      expect(task2.id).toBe(2);
      expect(task3.id).toBe(3);
    });

    test('deve listar tarefas ordenadas por prioridade', () => {
      manager.addTask('Baixa', 'Mat', 30, 'baixa');
      manager.addTask('Alta', 'Mat', 30, 'alta');
      manager.addTask('Media', 'Mat', 30, 'media');

      const list = manager.listTasks();

      expect(list[0].priority).toBe('alta');
      expect(list[1].priority).toBe('media');
      expect(list[2].priority).toBe('baixa');
    });

    test('deve concluir tarefa e atualizar estatísticas', () => {
      manager.addTask('Estudo', 'Mat', 30, 'alta');
      
      const result = manager.completeTask(1);
      const stats = manager.getStats();

      expect(result).toBe(true);
      expect(stats.completed).toBe(1);
      expect(stats.percentage).toBe(100);
    });
  });

  describe('❌ Entradas Inválidas', () => {
    test('deve rejeitar título vazio ou nulo', () => {
      expect(() => manager.addTask('', 'Mat', 30, 'alta'))
        .toThrow('Título é obrigatório');
      
      expect(() => manager.addTask(null, 'Mat', 30, 'alta'))
        .toThrow('Título é obrigatório');
      
      expect(() => manager.addTask('   ', 'Mat', 30, 'alta'))
        .toThrow('Título é obrigatório');
    });

    test('deve rejeitar matéria vazia', () => {
      expect(() => manager.addTask('Estudo', '', 30, 'alta'))
        .toThrow('Matéria/disciplina é obrigatória');
    });

    test('deve rejeitar duração inválida', () => {
      expect(() => manager.addTask('Estudo', 'Mat', 0, 'alta'))
        .toThrow('maior que zero');
      
      expect(() => manager.addTask('Estudo', 'Mat', -10, 'alta'))
        .toThrow('maior que zero');
      
      expect(() => manager.addTask('Estudo', 'Mat', 500, 'alta'))
        .toThrow('máx 480 minutos');
      
      expect(() => manager.addTask('Estudo', 'Mat', 30.5, 'alta'))
        .toThrow('número inteiro');
    });

    test('deve rejeitar prioridade inválida', () => {
      expect(() => manager.addTask('Estudo', 'Mat', 30, 'urgente'))
        .toThrow('Prioridade deve ser');
    });

    test('deve rejeitar tarefa duplicada não concluída', () => {
      manager.addTask('Revisar', 'História', 45, 'alta');
      
      expect(() => manager.addTask('revisar', 'História', 30, 'baixa'))
        .toThrow('Já existe uma tarefa ativa');
    });

    test('deve retornar false ao concluir tarefa inexistente', () => {
      const result = manager.completeTask(999);
      expect(result).toBe(false);
    });

    test('deve retornar false ao remover tarefa inexistente', () => {
      const result = manager.removeTask(999);
      expect(result).toBe(false);
    });
  });

  describe('⚠️  Casos Limite', () => {
    test('deve permitir tarefa duplicada se original estiver concluída', () => {
      manager.addTask('Revisar', 'História', 45, 'media');
      manager.completeTask(1);
      
      const newTask = manager.addTask('Revisar', 'História', 30, 'alta');
      expect(newTask.id).toBe(2);
      expect(manager.listTasks()).toHaveLength(2);
    });

    test('deve retornar false ao tentar concluir tarefa já concluída', () => {
      manager.addTask('Estudo', 'Mat', 30, 'alta');
      manager.completeTask(1);
      
      const secondAttempt = manager.completeTask(1);
      expect(secondAttempt).toBe(false);
    });

    test('deve calcular estatísticas corretamente com lista vazia', () => {
      const stats = manager.getStats();
      
      expect(stats.total).toBe(0);
      expect(stats.completed).toBe(0);
      expect(stats.pending).toBe(0);
      expect(stats.percentage).toBe(0);
    });

    test('deve calcular porcentagem corretamente com múltiplas tarefas', () => {
      manager.addTask('T1', 'M1', 30, 'alta');
      manager.addTask('T2', 'M2', 30, 'media');
      manager.addTask('T3', 'M3', 30, 'baixa');
      manager.addTask('T4', 'M4', 30, 'baixa');
      
      manager.completeTask(1);
      manager.completeTask(3);
      
      const stats = manager.getStats();
      expect(stats.total).toBe(4);
      expect(stats.completed).toBe(2);
      expect(stats.percentage).toBe(50);
    });

    test('deve mover tarefas concluídas para final da lista', () => {
      manager.addTask('T1', 'Mat', 30, 'alta');
      manager.addTask('T2', 'Mat', 30, 'baixa');
      
      manager.completeTask(1);

      const list = manager.listTasks();
      expect(list[0].id).toBe(2);
      expect(list[0].completed).toBe(false);
      expect(list[1].id).toBe(1);
      expect(list[1].completed).toBe(true);
    });

    test('deve buscar tarefas case-insensitive', () => {
      manager.addTask('Estudar Física', 'Física', 60, 'alta');
      manager.addTask('Revisar Matemática', 'Mat', 45, 'media');
      manager.addTask('Física Quântica', 'Física', 90, 'alta');
      
      const results = manager.searchTasks('fís');
      expect(results).toHaveLength(2);
    });

    test('deve retornar array vazio para busca sem resultados', () => {
      manager.addTask('Estudo', 'Mat', 30, 'alta');
      
      const results = manager.searchTasks('inexistente');
      expect(results).toEqual([]);
    });

    test('deve rejeitar título muito longo (>100 caracteres)', () => {
      const longTitle = 'A'.repeat(101);
      expect(() => manager.addTask(longTitle, 'Mat', 30, 'alta'))
        .toThrow('máximo 100 caracteres');
    });

    test('deve aceitar título com exatos 100 caracteres', () => {
      const exactTitle = 'A'.repeat(100);
      const task = manager.addTask(exactTitle, 'Mat', 30, 'alta');
      expect(task.title).toBe(exactTitle);
    });
  });
});
