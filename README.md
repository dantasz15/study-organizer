# 📚 Study Organizer

> Aplicação CLI para organização de estudos, desenvolvida com foco em produtividade e acessibilidade para estudantes neurodivergentes.

## 🌐 Deploy

▶️ **Acesse a aplicação online:** [https://study-organizer.onrender.com](https://study-organizer.onrender.com)

---

## 🚀 Sobre o Projeto

O **Study Organizer** é uma ferramenta CLI desenvolvida em Node.js que ajuda estudantes a organizarem suas rotinas de estudo de forma simples e adaptável, com suporte especial para usuários com TDAH e Autismo.

### ✨ Novidade — v2.0 (Entrega Intermediária)

A aplicação agora consome a **[Quotable API](https://api.quotable.io)** para exibir frases motivacionais ao iniciar cada sessão de estudos. Se a API estiver offline, um sistema de fallback local garante que a aplicação continue funcionando normalmente.

---

## 🎯 Funcionalidades

- 📅 Gerenciamento de tarefas de estudo
- 🎯 Priorização visual por cores (🔴 Alta / 🟡 Média / 🟢 Baixa)
- ⏱️ Estimativa de tempo realista por tarefa
- 📊 Barra de progresso visual em tempo real
- ✨ Frases motivacionais via API externa (com fallback offline)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime principal |
| node-fetch | Consumo da Quotable API |
| Jest | Testes unitários e de integração |
| ESLint | Análise estática de código |
| GitHub Actions | CI/CD automatizado |
| Render | Deploy em nuvem |

---

## ⚙️ Como Executar

```bash
# Clonar repositório
git clone https://github.com/dantasz15/study-organizer.git

# Entrar na pasta
cd study-organizer

# Instalar dependências
npm install

# Iniciar sessão (exibe frase motivacional + progresso)
npm start

# Adicionar tarefa
node src/index.js add "Estudar Node.js" alta 45

# Listar tarefas
node src/index.js list

# Marcar tarefa como concluída
node src/index.js done <id>
```

---

## 🔗 Integração com API Pública

A aplicação consome a **Quotable API** (gratuita e sem autenticação):

```
GET https://api.quotable.io/random?tags=education,inspirational
```

Resposta esperada:
```json
{
  "content": "A educação é a arma mais poderosa...",
  "author": "Nelson Mandela"
}
```

Se a API estiver indisponível, o sistema retorna automaticamente uma frase do banco local.

---

## 🧪 Testes

```bash
# Todos os testes
npm test

# Apenas testes unitários
npm run test:unit

# Apenas testes de integração
npm run test:integration
```

**Cobertura:**
- ✅ 4 testes de integração (`motivationService`) — API, erros HTTP, falha de rede, fallback
- ✅ 4 testes unitários (`taskService`) — prioridades e labels

---

## 🔄 CI/CD

O projeto usa **GitHub Actions** para:

- ✅ Lint automático com ESLint
- ✅ Execução de testes unitários
- ✅ Execução de testes de integração
- ✅ Validação em todo push e Pull Request

---

## 📌 Processo de Desenvolvimento (Entrega Intermediária)

1. Issue #1 criada descrevendo a integração com a Quotable API
2. Branch `entrega-intermediaria` criada a partir da `main`
3. Funcionalidade desenvolvida e testada
4. Testes de integração escritos e aprovados
5. Deploy realizado no Render
6. README atualizado com link do deploy
7. Pull Request aberto com `closes #1` e merge realizado

---

## 📂 Estrutura do Projeto

```
study-organizer/
├── src/
│   ├── controllers/
│   │   ├── sessionController.js   ← exibe frase motivacional da API
│   │   └── taskController.js
│   ├── services/
│   │   ├── motivationService.js   ← integração com Quotable API
│   │   └── taskService.js
│   └── index.js
├── tests/
│   ├── integration/
│   │   └── motivationService.integration.test.js
│   └── unit/
│       └── taskService.test.js
├── .github/workflows/ci.yml
├── CHANGELOG.md
├── package.json
└── README.md
```

---

## 👨‍💻 Autor

**Gabriel Henrique Rodrigues Dantas**
🎓 Engenharia de Software | 💻 Backend, IA e Dados

🔗 [github.com/dantasz15/study-organizer](https://github.com/dantasz15/study-organizer)
