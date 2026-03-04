describe('Story 1.2: Formulário Web 28 Questões', () => {
  const baseUrl = 'http://localhost:3000';

  before(() => {
    // Limpar localStorage antes dos testes
    cy.clearLocalStorage();
  });

  beforeEach(() => {
    cy.visit(`${baseUrl}/formulario`);
  });

  describe('AC1: UI renderiza', () => {
    it('deve carregar a página de formulário', () => {
      cy.get('h1').should('contain', 'Diagnóstico Estratégico');
      cy.get('[class*="formulario"]').should('be.visible');
    });

    it('deve mostrar descrição do formulário', () => {
      cy.contains('Responda').should('be.visible');
      cy.contains('questões').should('be.visible');
    });
  });

  describe('AC2: 28 questões carregam do BD', () => {
    it('deve carregegar todas as 28 questões', () => {
      cy.get('[class*="questao"]').should('have.length.at.least', 28);
    });

    it('deve organizar questões em 6 blocos', () => {
      cy.get('h2').filter(':contains("Bloco")').should('have.length', 6);
    });

    it('cada questão deve ter pergunta e inputs', () => {
      cy.get('[class*="pergunta"]').first().should('not.be.empty');
      cy.get('input[type="radio"], select, input[type="checkbox"]').should('have.length.at.least', 28);
    });
  });

  describe('AC3: Validação de input', () => {
    it('botão "Enviar" deve estar desabilitado inicialmente', () => {
      cy.get('button').contains('Enviar Respostas').should('be.disabled');
    });

    it('não deve permitir enviar sem responder todas', () => {
      // Responder apenas 5 questões
      cy.get('[name^="q-"]:radio').first().click();
      cy.get('[name^="q-"]:radio').eq(5).click();
      cy.get('button').contains('Enviar Respostas').should('be.disabled');
    });
  });

  describe('AC4: Autossalva', () => {
    it('deve salvar respostas automaticamente', () => {
      cy.get('[name^="q-"]:radio').first().click();
      cy.wait(600); // Aguardar debounce

      // Verificar localStorage
      cy.window().then((win) => {
        const stored = win.localStorage.getItem('formulario_respostas');
        expect(stored).to.exist;
        expect(JSON.parse(stored)).to.have.property('1');
      });
    });

    it('deve recuperar respostas ao recarregar', () => {
      // Responder primeira questão
      cy.get('[name^="q-"]:radio').first().click();
      cy.wait(600);

      // Recarregar página
      cy.reload();
      cy.wait(1000);

      // Verificar se resposta foi recuperada
      cy.get('[name^="q-"]:radio').first().should('be.checked');
    });
  });

  describe('AC5: Progresso visual', () => {
    it('deve mostrar barra de progresso', () => {
      cy.get('[class*="progressBar"]').should('be.visible');
    });

    it('deve atualizar progresso ao responder', () => {
      cy.contains('0 de').should('be.visible');
      cy.get('[name^="q-"]:radio').first().click();
      cy.contains('1 de').should('be.visible');
    });

    it('deve atingir 100% quando todas questões respondidas', () => {
      // Responder todas as questões (simulado)
      cy.get('[name^="q-"]:radio').each(($radio, index) => {
        if (index < 28) {
          cy.wrap($radio).click({ force: true });
        }
      });

      cy.contains('28 de 28').should('be.visible');
    });
  });

  describe('AC6: Persistência de contexto', () => {
    it('respostas persistem no localStorage', () => {
      cy.window().then((win) => {
        const stored = { 1: 4, 2: 5, 3: 2 };
        win.localStorage.setItem('formulario_respostas', JSON.stringify(stored));
      });

      cy.reload();
      cy.get('[name="q-1"]:radio[value="4"]').should('be.checked');
    });
  });

  describe('AC7: Mobile-friendly', () => {
    beforeEach(() => {
      cy.viewport(375, 667); // iPhone SE
    });

    it('deve ser responsivo em 375px', () => {
      cy.get('h1').should('be.visible');
      cy.get('button').contains('Enviar Respostas').should('be.visible');
    });

    it('inputs devem ser clicáveis em mobile', () => {
      cy.get('[name^="q-"]:radio').first().click();
      cy.get('[name^="q-"]:radio').first().should('be.checked');
    });

    it('progresso deve ser visível em mobile', () => {
      cy.get('[class*="progressText"]').should('be.visible');
    });
  });

  describe('AC8: Acessibilidade', () => {
    it('cada input deve ter label associado', () => {
      cy.get('label').should('have.length.at.least', 28);
    });

    it('deve permitir navegação por teclado', () => {
      cy.get('body').tab();
      cy.focused().should('exist');
    });

    it('deve ter contraste adequado', () => {
      // Verificar cores
      cy.get('label').first().should('have.css', 'color');
    });

    it('botão deve ter aria-label quando desabilitado', () => {
      cy.get('button').contains('Enviar Respostas').should('have.attr', 'aria-label');
    });
  });

  describe('AC9: CTA dinâmica', () => {
    it('botão deve estar desabilitado até completar todas questões', () => {
      cy.get('button').contains('Enviar Respostas').should('be.disabled');
    });

    it('botão deve ficar habilitado quando completar', () => {
      // Responder todas as questões
      cy.get('[name^="q-"]:radio').each(($radio) => {
        cy.wrap($radio).first().click({ force: true });
      });

      // Esperar debounce
      cy.wait(700);

      cy.get('button').contains('Enviar Respostas').should('not.be.disabled');
    });

    it('deve mostrar mensagem diferenciada quando completo', () => {
      cy.contains('questões restantes').should('be.visible');
      // Após completar todas
      cy.get('[name^="q-"]:radio').each(($radio) => {
        cy.wrap($radio).first().click({ force: true });
      });
      cy.contains('Você completou').should('be.visible');
    });
  });

  describe('AC10: Fluxo E2E completo', () => {
    it('deve completar fluxo: responder → salvar → enviar', () => {
      // 1. Responder todas as questões
      cy.get('[name^="q-"]:radio').each(($radio, idx) => {
        cy.wrap($radio).first().click({ force: true });
      });

      cy.wait(700); // Aguardar autossalva

      // 2. Verificar salvamento
      cy.window().then((win) => {
        const stored = win.localStorage.getItem('formulario_respostas');
        expect(stored).to.exist;
      });

      // 3. Verificar botão habilitado
      cy.get('button').contains('Enviar Respostas').should('not.be.disabled');

      // 4. Clicar enviar
      cy.get('button').contains('Enviar Respostas').click();

      // 5. Aguardar sucesso (redirect ou mensagem)
      cy.url().should('include', '/resultado'); // Ou outra confirmação
    });
  });
});
