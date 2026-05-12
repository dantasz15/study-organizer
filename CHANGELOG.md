# Changelog

## [2.0.0] — Entrega Intermediária

### Adicionado
- Integração com a **Quotable API** para exibição de frases motivacionais ao iniciar uma sessão de estudos
- Sistema de **fallback offline**: frases locais são exibidas caso a API esteja indisponível
- **Testes de integração** cobrindo 4 cenários: resposta bem-sucedida, erro HTTP 500, falha de rede e fallback direto
- Exibição da **barra de progresso** na tela inicial com percentual e minutos estudados

### Alterado
- `sessionController.js` atualizado para consumir `motivationService`
- `package.json` atualizado com scripts separados para `test:unit` e `test:integration`
- Pipeline de CI/CD atualizada para rodar testes unitários e de integração em etapas separadas

### Infraestrutura
- Branch de desenvolvimento: `entrega-intermediaria`
- Issue #1 resolvida via Pull Request

---

## [1.0.0] — Entrega Inicial

### Adicionado
- Estrutura base do projeto CLI em Node.js
- Gerenciamento de tarefas com prioridade e estimativa de tempo
- 21 testes unitários
- Pipeline CI/CD com GitHub Actions
- Lint com ESLint
