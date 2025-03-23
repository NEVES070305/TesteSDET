# TesteSDET

Este repositório contém um conjunto de testes utilizando o [Playwright](https://playwright.dev/). A estrutura do projeto está organizada de forma a facilitar a manutenção e a legibilidade dos testes, seguindo o padrão **Application Actions** para separar a lógica de interação (actions) dos testes em si.

---

## Estrutura de Pastas

```
.
├─ actions/
|   ├─ checkout/
|     ├─ checkoutAction.js # Ações do fluxo de checkout (preencher dados, etc.)
|     ├─ checkoutPriceVerification.js # Verifica se os dados do carrinho estão corretos
|   ├─ inventory
|     ├─ cartAction.js # Lida com manipulação e consulta do carrinho (ex.: obter lista de itens).
|     ├─ finishPurchaseAction.js # Finaliza a compra na tela de checkout (clicando em “Finish” e validando conclusão).
|     ├─ inventoryAction.js       # Ações específicas da tela de inventário (adicionar itens)
|     ├─ productDetailsAction.js  # Verifica detalhes de um produto (nome, preço, imagem) ao clicar em um item específico.
|     ├─ removeItemAction.js  # Ações de remoção de itens do carrinho
|   ├─ login/
│     ├─ loginAction.js           # Lógica de login e verificação de sucesso
|   ├─ navigation/
|     ├─ backNavigationAction.js # Navegação de retorno
|     ├─ checkoutNavigationAction.js # Navegação para step one
│     ├─ navigationAction.js      # Navegação genérica (ex.: ir para a página de login)
│
tests/
├─ backNavigation/
│   └─ back-navigation.spec.js
├─ checkout/
│   ├─ checkout-error.spec.js
│   └─ checkout-step-two.spec.js
├─ inventory/
│   ├─ inventory-add-multiple.spec.js
│   ├─ inventory-add-products.spec.js
│   └─ inventory-sort.spec.js
├─ login/
│   └─ login.spec.js
├─ product/
│   ├─ cart-items-verification.spec.js
│   ├─ product-details.spec.js
│   └─ remove-random-items.spec.js
├─ purchase/
│   ├─ purchase-finalization.spec.js
│   └─ purchase.spec.js
├─ utils/
│   ├─ selectors.js             # Centralização de seletores
│   ├─ users.js                 # Lista de usuários, credenciais, etc.
│
├─ playwright.config.js         # Configuração do Playwright
├─ package.json
└─ README.md                    # (este arquivo)
```

## Subpastas e Testes

- **backNavigation/**  
  - **back-navigation.spec.js**  
    Testa a navegação de retorno/cancelamento no fluxo de checkout (ex.: voltar do Step Two para o Step One ou para o carrinho).

- **checkout/**  
  - **checkout-error.spec.js**  
    Valida cenários em que o usuário não preenche corretamente os dados de checkout (Step One) e verifica se a mensagem de erro aparece.  
  - **checkout-step-two.spec.js**  
    Verifica itens, valores (subtotal, taxa, total) e comportamento geral na segunda etapa do checkout (Step Two).

- **inventory/**  
  - **inventory-add-multiple.spec.js**  
    Testa a adição de múltiplos itens (distintos) ao carrinho e valida se o carrinho reflete a quantidade correta.  
  - **inventory-add-products.spec.js**  
    Pode focar em adicionar produtos específicos ou aleatórios, checando se a tela de inventário responde conforme esperado.  
  - **inventory-sort.spec.js**  
    Verifica as opções de ordenação (por nome ou preço) e confirma se a lista de produtos é reordenada corretamente.

- **login/**  
  - **login.spec.js**  
    Testa o fluxo de login com credenciais válidas ou inválidas, verificando mensagens de erro e sucesso.

- **product/**  
  - **cart-items-verification.spec.js**  
    Foca em verificar se os itens adicionados/ removidos aparecem (ou não) no carrinho, conferindo nomes e quantidades.  
  - **product-details.spec.js**  
    Clica em um produto (por nome ou índice), verifica detalhes (nome, preço, imagem) e garante que batem com o esperado.  
  - **remove-random-items.spec.js**  
    Remove itens aleatórios do carrinho e checa se a contagem e os itens restantes estão corretos.

- **purchase/**  
  - **purchase-finalization.spec.js**  
    Valida o fluxo de finalização de compra (clicando em “Finish” no Step Two) e confirma se a compra foi concluída.  
  - **purchase.spec.js**  
    Pode abranger o fluxo completo de compra, desde o login, passando pelo carrinho, checkout e finalização.

- **actions/**: Contém funções que encapsulam as interações e lógicas de cada parte do fluxo (login, checkout, carrinho etc.).  
- **tests/**: Pasta raiz dos testes, com subpastas separando diferentes cenários (ex.: *checkout*, *backNavigation*). Cada arquivo `*.spec.js` representa um conjunto de testes.  
- **utils/**: Pasta com arquivos utilitários, como *selectors.js* (centralização de seletores), *users.js* (credenciais), etc.  
- **playwright.config.js**: Arquivo de configuração do Playwright, definindo *testDir*, *testMatch*, *projects*, etc.

---

## Pré-Requisitos

- **Node.js** (versão 14 ou superior).
- **npm** ou **yarn** para gerenciar pacotes.
- **Playwright** instalado localmente (ou via `npm install`).

---

## Instalação

1. **Clonar** este repositório:

   ```bash
   git clone https://github.com/NEVES070305/TesteSDET.git
   ```

2.**Entrar** na pasta do projeto:

  ```bash
    cd TesteSDET
  ```

3.**Instalar** as dependências:

   ```bash
   npm install
   ```

---

## Execução dos Testes

### Todos os Testes

Para executar **todos** os testes, use:

```bash
npx playwright test
```

Isso vai:

- Buscar todos os arquivos que correspondem ao padrão definido em `playwright.config.js` (por exemplo, `**/*.spec.js`).
- Rodar os testes em paralelo nos navegadores configurados (Chromium, Firefox, WebKit).

### Testes de um Arquivo Específico

Para executar um **arquivo** específico (ex.: `checkout-step-two.spec.js`):

```bash
npx playwright test tests/checkout/checkout-step-two.spec.js
```

### Testes em um Único Navegador

Para executar somente no Chromium, por exemplo:

```bash
npx playwright test --project=chromium
```

---

## Uso de Storage State (Opcional)

Caso você deseje **centralizar o login** e evitar repetições, pode usar a abordagem de **storageState**:

1. **Gerar** o storageState para cada navegador (Chromium, Firefox, WebKit) via script, salvando em arquivos como `storageState.chromium.json`, `storageState.firefox.json`, `storageState.webkit.json`.
2. **Configurar** o `playwright.config.js` para cada *project* usar o respectivo arquivo `storageState`.

Dessa forma, os testes já iniciam logados.

---

## Observações Importantes

- **Actions (Application Actions)**: Cada arquivo em `actions/` contém funções para encapsular um fluxo ou interação específica. Assim, os arquivos de teste (`*.spec.js`) ficam mais limpos, chamando apenas essas funções e fazendo asserções.  
- **Selectors**: O arquivo `utils/selectors.js` centraliza todos os seletores usados no projeto, facilitando a manutenção caso o HTML mude.  
- **Subpastas de testes**: A organização em subpastas (ex.: *checkout*, *backNavigation*) é apenas uma convenção para separar cenários. O Playwright vai ler todos os testes de forma recursiva.

---

## Dicas e Referências

- [Documentação Oficial do Playwright](https://playwright.dev/docs/intro)  
- [Test Runner do Playwright](https://playwright.dev/docs/test-intro)  
- [Application Actions: Use Them Instead of Page Objects](https://www.cypress.io/blog/stop-using-page-objects-and-start-using-app-actions)
- [Por que o “Application Actions” é melhor do que o “Page Object” nos testes automatizados](https://medium.com/@jonasdaviladasilva/por-que-o-application-actions-%C3%A9-melhor-do-que-o-page-object-nos-testes-automatizados-1987fdd6857b)
---

## Contribuindo

1. Faça um *fork* do repositório.  
2. Crie uma *branch* para sua feature/ajuste:  

   ```bash
   git checkout -b minha-feature
   ```

3. Faça *commit* das mudanças e abra um *pull request*.

---
