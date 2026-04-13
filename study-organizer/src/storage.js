/**
 * Storage - Módulo de persistência de dados
 * @author dantasz15
 * @version 1.0.0
 */

const fs = require('fs').promises;
const path = require('path');

class Storage {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.filePath = path.join(this.dataDir, 'tasks.json');
  }

  async ensureDirectory() {
    try {
      await fs.mkdir(this.dataDir, { recursive: true });
    } catch (error) {
      if (error.code !== 'EEXIST') {
        throw error;
      }
    }
  }

  async load() {
    try {
      await this.ensureDirectory();
      const data = await fs.readFile(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw new Error(`Erro ao carregar dados: ${error.message}`);
    }
  }

  async save(data) {
    await this.ensureDirectory();
    await fs.writeFile(
      this.filePath,
      JSON.stringify(data, null, 2),
      'utf8'
    );
  }
}

module.exports = Storage;
