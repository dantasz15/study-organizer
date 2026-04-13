# Study Organizer 📚

![CI Status](https://github.com/dantasz15/study-organizer/actions/workflows/ci.yml/badge.svg)
> **Projeto desenvolvido para o Bootcamp**  
> **Autor:** Gabriel Henrique Rodrigues Dantas (dantasz15)  
> **Versão:** 1.0.0  
> **Repositório:** [https://github.com/dantasz15/study-organizer](https://github.com/dantasz15/study-organizer)

---

## 🧠 Relevância do Problema (Dor Real)

Este projeto nasceu da necessidade real de estudantes **neurodivergentes (TDAH, Autismo, etc.)** que enfrentam barreiras significativas na manutenção de rotinas de estudo. A dificuldade em priorizar tarefas, a percepção distorcida do tempo e a sobrecarga cognitiva são "dores" comuns que levam à procrastinação e ao abandono de cursos.

### 🎯 Público-Alvo
Estudantes com TDAH, neurodivergentes ou qualquer pessoa que sinta dificuldade em organizar uma rotina de estudos devido à sobrecarga de informações e falta de priorização clara.

### 💡 Proposta da Solução
O **Study Organizer** resolve isso através de uma interface CLI simplificada que:
1. **Reduz a Carga Cognitiva:** Interface limpa, sem distrações visuais excessivas.
2. **Priorização Visual:** Uso de cores (🔴🟡🟢) para ajudar na tomada de decisão rápida.
3. **Gestão de Tempo Realista:** Foco na duração estimada das tarefas para evitar o planejamento excessivo e irrealista.
4. **Feedback Imediato:** Barra de progresso visual que gera dopamina ao concluir tarefas, essencial para o perfil neurodivergente.

---

## 📋 Funcionalidades Principais

- **Adicionar Tarefas:** Registro de títulos, matérias, duração e prioridade.
- **Listagem Inteligente:** Ordenação automática por prioridade e status.
- **Busca:** Filtro rápido por termos.
- **Estatísticas:** Acompanhamento visual do progresso com barra de porcentagem.
- **Persistência:** Salvamento automático em `data/tasks.json`.

---

## 🛠️ Tecnologias Utilizadas

- **Linguagem:** Node.js (v16+)
- **Interface:** CLI (Readline)
- **Persistência:** JSON (FS Promises)
- **Qualidade:** ESLint, Jest, GitHub Actions

---

## 🚀 Como começar

### Pré-requisitos
- Node.js (versão >= 16.0.0)

### Instalação
1. Clone o repositório:
   ```bash
   git clone https://github.com/dantasz15/study-organizer.git
   ```
2. Navegue até a pasta:
   ```bash
   cd study-organizer
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```

### Execução
Para iniciar a aplicação:
```bash
npm start
```

### Testes Automatizados
Para rodar a suíte de 21 testes (incluindo casos felizes, entradas inválidas e casos limite):
```bash
npm test
```

### Linting (Análise Estática)
Para verificar a qualidade do código:
```bash
npm run lint
```
Para corrigir problemas automaticamente:
```bash
npm run lint:fix
```

---

## 🛠️ Qualidade Técnica (Barema)

- **Testes Automatizados:** 21 testes unitários cobrindo 100% da lógica de negócio.
- **Linting/Análise Estática:** Configuração rigorosa com ESLint.
- **CI/CD:** Pipeline configurada via GitHub Actions para validação automática de cada commit.
- **Versionamento Semântico:** Histórico detalhado mantido no `CHANGELOG.md`.

## 📄 Licença
Este projeto está sob a licença MIT.
