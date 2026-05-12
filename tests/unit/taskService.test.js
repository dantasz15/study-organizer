/**
 * TESTES UNITÁRIOS — taskService
 * Valida as funções de gerenciamento de tarefas isoladamente.
 */

import { jest } from '@jest/globals';

// Mock do sistema de arquivos para não criar arquivos reais durante os testes
const mockTasks = [];

jest.mock('fs', () => ({
  readFileSync: jest.fn(() => JSON.stringify(mockTasks)),
  writeFileSync: jest.fn(),
  existsSync: jest.fn(() => true),
}));

import { getPriorityLabel } from '../../src/services/taskService.js';

describe('Unitário: taskService', () => {
  test('getPriorityLabel retorna label correto para prioridade alta', () => {
    expect(getPriorityLabel('alta')).toBe('🔴 Alta');
  });

  test('getPriorityLabel retorna label correto para prioridade media', () => {
    expect(getPriorityLabel('media')).toBe('🟡 Média');
  });

  test('getPriorityLabel retorna label correto para prioridade baixa', () => {
    expect(getPriorityLabel('baixa')).toBe('🟢 Baixa');
  });

  test('getPriorityLabel retorna indefinida para prioridade desconhecida', () => {
    expect(getPriorityLabel('invalida')).toBe('⚪ Indefinida');
  });
});
