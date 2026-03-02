# Critérios de Aceitação por Entregável
## Anelise Methodology MVP + Acompanhamento 90D

**Versão:** 1.0
**Data:** 01/03/2026
**Responsável:** Pax (PO)
**Status:** 🟢 PRONTO PARA DESENVOLVIMENTO

---

## Objetivo

Definir critérios de aceitação explícitos e testáveis para cada entregável, de forma que @dev saiba exatamente quando uma peça está "pronta" e pode ser marcada como "Done".

---

## ENTREGÁVEIS MVP (Diagnóstico + Blueprint 7D)

### **E1. Formulário Estratégico Web**

**O que é:**
Formulário online com 28 questões em 6 blocos, com acesso via login/senha. Cliente preenche em 20–30 min.

**Critérios de Aceitação (Definition of Done):**

✅ **Funcional:**
- [ ] Formulário carrega sem erros (Chrome, Firefox, Safari, Edge)
- [ ] 28 questões aparecem em sequência (6 blocos com títulos claros)
- [ ] Cada questão tem tipo correto (texto, múltipla escolha, escala 1–5, etc)
- [ ] Navegação: botão "Próximo" / "Anterior" / "Enviar"
- [ ] Validação: marca obrigatório (campo não pode ficar vazio) antes de "Enviar"
- [ ] Após "Enviar": mensagem de sucesso + email de confirmação
- [ ] Respostas são salvas em banco de dados (Supabase/DB definido)

✅ **Segurança:**
- [ ] Login/senha requerido (cliente recebe acesso único)
- [ ] Sessão expira após 30 min de inatividade
- [ ] Formulário preenchido não é acessível por outro login
- [ ] Dados em trânsito são criptografados (HTTPS)

✅ **UX:**
- [ ] Progresso visual (ex: "Bloco 2 de 6")
- [ ] Tempo estimado (ex: "~25 min")
- [ ] Campo "Opcional" claramente marcado (se houver)
- [ ] Feedback: "Seu formulário foi recebido. Análise em 24–48h"

✅ **Integração:**
- [ ] Após envio, você recebe email com notificação
- [ ] Email contém: Nome cliente, email, timestamp, link para ver respostas
- [ ] Respostas exportáveis como CSV ou PDF (para análise sua)

**Critério de Rejeição:**
- Não aceita se: Formulário não valida (cliente envia branco), Respostas não chegam em banco de dados, Não há email de notificação

---

### **E2. Hipótese Preliminar de Verdade Núcleo**

**O que é:**
Email estruturado que você envia ao cliente (dias 2–5 após receber formulário) com: score de desalinhamento, hipótese preliminar, e decisão (aprovado ou rejeitado para Fase 2).

**Critérios de Aceitação (Definition of Done):**

✅ **Conteúdo Obrigatório:**
- [ ] Email tem 3 seções claras: 1) Score (visual + explicação), 2) Hipótese, 3) Decisão
- [ ] Score mostra 4 dimensões (Desalinhamento, Ruído, Vazamento, Maturidade) com pontuação 0–5
- [ ] Score total ≥12 AND Maturidade ≥4 = "APROVADO" (vai para Fase 2)
- [ ] Else = "REJEITADO" (feedback estruturado do por quê)
- [ ] Hipótese é frase única, clara, sem jargão (ex: "Seu gargalo é dispersão de oferta, não falta de demanda")
- [ ] Se rejeitado, email oferece alternativa: "Quando quiser revisar premissas, volte aqui"

✅ **Tom & Clareza:**
- [ ] Email tem tom profissional + direto (sem fluff)
- [ ] Linguagem é clientfacing (não internal jargon)
- [ ] Próximos passos claros (se aprovado: "Sessão agendada para [data]")

✅ **Documentação Interna:**
- [ ] Você mantém registro de: score, dimensões, hipótese, decisão para cada cliente
- [ ] Registro é rastreável (banco de dados ou arquivo estruturado)

**Critério de Rejeição:**
- Não aceita se: Score mal calculado, Hipótese é vaga/genérica, Decisão não alinha com score (ex: score 11 = rejeitado, mas aprovou)

---

### **E3. Diagnóstico Formal (PDF/Documento Estruturado)**

**O que é:**
Documento de 4–5 páginas que consolida a análise completa pós-sessão (Fase 2). Entregue após sessão 1:1, contém verdade núcleo, premissa corrigida, cortes, decisões.

**Critérios de Aceitação (Definition of Done):**

✅ **Estrutura (4–5 páginas obrigatórias):**
- [ ] **Página 1 — Capa:** Nome cliente, data, "Diagnóstico Neural Estruturado", seu nome/logo
- [ ] **Página 2 — Verdade Núcleo:** Frase única, clara, validada na sessão (sem interpretação)
- [ ] **Página 3 — Premissa Corrigida:** "ANTES" vs "DEPOIS" formato claro
- [ ] **Página 4 — Cortes Obrigatórios:** 3 cortes específicos com impacto (ex: "Corte oferta X = X% tempo liberado, Y% receita sacrificada")
- [ ] **Página 5 — 3 Decisões Estratégicas:** Cada decisão tem: O que fazer, Por que fazer, Resultado esperado
- [ ] **Página 5–6 (Optional) — Próximos Passos:** Link para Blueprint 7D, acesso ao caderno, início da execução

✅ **Qualidade de Conteúdo:**
- [ ] Verdade Núcleo é resultado direto da sessão (não é genérica)
- [ ] Cortes são específicos ao cliente (não template)
- [ ] Decisões são mensuráveis (não "trabalhe melhor", mas "redirecione 60% tempo para oferta X")
- [ ] Não há erros ortográficos / gramaticais
- [ ] Linguagem é clientfacing (sem jargão interno)

✅ **Formato & Design:**
- [ ] PDF bem formatado (fontes legíveis, espaçamento, cores)
- [ ] Inclui seu nome/logo/contato (footer em cada página)
- [ ] Pode ser impresso (ou digital OK, mas deve ser legível)

✅ **Rastreabilidade:**
- [ ] Diagnóstico é salvo com nome padrão: `[DATA]-[NOME-CLIENTE]-DIAGNOSTICO.pdf`
- [ ] Você mantém cópia em pasta estruturada (ex: `docs/diagnosticos/`)
- [ ] Cliente recebe via email com instruções: "Próximo: acesse Blueprint 7D, execute dias 16–22"

**Critério de Rejeição:**
- Não aceita se: Falta alguma seção obrigatória, Verdade Núcleo é vaga, Cortes/Decisões não são específicas, Tem erros graves, Não alinha com sessão realizada

---

### **E4. Blueprint 7D (Caderno Inteligente Executável)**

**O que é:**
Documento de 7 páginas estruturadas + template de caderno inteligente (Google Docs ou similar) que cliente usa para executar o plano de realinhamento de 7 dias. Inclui checklist, indicador, e espaço para anotações.

**Critérios de Aceitação (Definition of Done):**

✅ **Estrutura 7 Páginas:**
- [ ] **Página 1 — Verdade Núcleo** (referência rápida)
- [ ] **Página 2 — Premissa Corrigida** (referência rápida)
- [ ] **Página 3 — Cortes Obrigatórios** (com checklist: [ ] Executado)
- [ ] **Página 4 — 3 Decisões Inadiáveis** (cada uma com detalhes: O que fazer, Por que, Resultado esperado, Prazo)
- [ ] **Páginas 5–6 — Plano 7 Dias** (Dia 1–7 com ações específicas, resultado esperado, responsável, indicador)
- [ ] **Página 7 — Indicador Crítico + Check-in Dia 7** (espaço para preencher resultado)

✅ **Caderno Inteligente (Executável):**
- [ ] Caderno é Google Docs compartilhado (ou web se desenvolvido) com acesso para cliente
- [ ] Cliente consegue preencher diretamente (não é PDF estático)
- [ ] Tem checkbox/campos editáveis para: [ ] Ação 1 completa [ ] Ação 2 completa, etc
- [ ] Tem espaço para anotações (cliente preenche observações, bloqueios, aprendizados)
- [ ] Você consegue ver preenchimento em tempo real (ou via relatório)
- [ ] Acesso válido por 90 dias a partir da entrega

✅ **Qualidade de Conteúdo:**
- [ ] Ações no plano 7D são concretas (não "trabalhe em X", mas "ligue para 3 clientes hoje e comunique mudança de foco")
- [ ] Cada ação tem dono, prazo, e resultado esperado
- [ ] Indicador crítico é objetivo (número, percentual, qualitativo claro)
- [ ] Linguagem é simples e direta (cliente executa sozinho)

✅ **Formato:**
- [ ] PDF + Caderno digital (ambos entregues)
- [ ] Nomeado: `[DATA]-[NOME-CLIENTE]-BLUEPRINT-7D.pdf` + Google Doc link

✅ **Integração:**
- [ ] Você envia: email com PDF + link do Google Doc + instruções de execução
- [ ] Email deixa claro: "Execute Dias 16–22. No Dia 7, preenchaa Check-in. Resultado será usado na próxima fase."

**Critério de Rejeição:**
- Não aceita se: Falta seção obrigatória, Ações não são concretas/mensuráveis, Indicador é vago, Caderno não é editável/compartilhado, Instruções não são claras

---

### **E5. Acesso ao Caderno Inteligente (90 dias)**

**O que é:**
Acesso compartilhado ao Google Doc (ou plataforma similar) onde cliente preenche Blueprint 7D durante execução (Dias 16–22) e onde você rastreia progresso.

**Critérios de Aceitação (Definition of Done):**

✅ **Permissões & Acesso:**
- [ ] Cliente tem acesso "editor" (pode preencher/editar)
- [ ] Você tem acesso "owner" ou "editor" (pode ver, editar, compartilhar)
- [ ] Link funciona para cliente (testado antes de entregar)
- [ ] Acesso válido por 90 dias (não expira antes)

✅ **Estrutura do Caderno:**
- [ ] Tem abas/seções claras: Diagnóstico | Cortes | Decisões | Plano 7D | Indicador | Check-in
- [ ] Cada aba tem instruções: "O que fazer nesta aba?"
- [ ] Tem espaço para anotações do cliente (dia 1–7)

✅ **Rastreabilidade:**
- [ ] Você consegue ver histórico de edições (quem editou, quando)
- [ ] Caderno está em pasta organizada (ex: `/cadernos-inteligentes/[ano]/[cliente]/`)
- [ ] Nome do caderno segue padrão: `[DATA]-[CLIENTE]-CADERNO-BLUEPRINT.gdoc`

**Critério de Rejeição:**
- Não aceita se: Link não funciona, Permissões erradas, Caderno não é editável, Estrutura é confusa

---

## ENTREGÁVEIS ACOMPANHAMENTO 90D

### **E6. Check-in Template Semanal (Assíncrono)**

**O que é:**
Template/formulário que cliente preenche toda semana (domingo/segunda) com dados sobre execução, dedicação de tempo, indicador crítico, bloqueios.

**Critérios de Aceitação (Definition of Done):**

✅ **Campos Obrigatórios:**
- [ ] [ ] Executei ações principais? (Sim/Parcial/Não)
- [ ] % de tempo dedicado esta semana (campo numérico)
- [ ] Indicador crítico (número/métrica)
- [ ] Um ajuste que preciso fazer (texto)
- [ ] Uma vitória que tive (texto)
- [ ] Bloqueios (se houver)

✅ **Formato:**
- [ ] Template é Google Form OU Google Doc OU Airtable (fácil para cliente preencher)
- [ ] Autossalva (cliente não perde dados se fechar)
- [ ] Você recebe notificação quando cliente envia (email ou webhook)

✅ **Integração:**
- [ ] Check-in é salvável em banco de dados (rastreável)
- [ ] Você consegue gerar relatório (13 semanas consolidadas)
- [ ] Template é o mesmo toda semana (consistência)

**Critério de Rejeição:**
- Não aceita se: Template é confuso, Campos não alinhados com PRD, Você não consegue rastrear respostas, Cliente não consegue preencher em <2 min

---

### **E7. Feedback Semanal (Email/Mensagem Estruturada)**

**O que é:**
Email que você envia para cliente (dentro 24h do check-in) com análise dos dados semanais: padrões, ajustes, próximos passos.

**Critérios de Aceitação (Definition of Done):**

✅ **Conteúdo Obrigatório:**
- [ ] Email tem 4 seções: 1) Validação de dados, 2) Padrões detectados, 3) Ajustes recomendados, 4) Próxima semana
- [ ] Valida indicador crítico vs semana passada (cresceu/caiu/igual + por quê)
- [ ] Detecta padrões (ex: "Segunda semana seguida que % tempo caiu — vamos entender por quê na sessão")
- [ ] Recomenda ajuste (concreto, não vago)
- [ ] Tom é profissional + supportivo (não crítico)

✅ **Documentação:**
- [ ] Email é salvo em pasta estruturada (rastreamento de comunicação)
- [ ] Você mantém log de feedback por cliente/semana

**Critério de Rejeição:**
- Não aceita se: Análise é superficial, Recomendações são vagas, Tom é crítico/desanimador, Demora >24h para responder

---

### **E8. Sessão Mensal ao Vivo (Gravada ou Resumida)**

**O que é:**
4 sessões ao longo de 90 dias (semanas 1, 5, 9, 13) onde você e cliente conversam ao vivo por 45 min para validar dados, ajustar rota, preparar escalação.

**Critérios de Aceitação (Definition of Done):**

✅ **Agendamento:**
- [ ] Sessão agendada no calendário (ambas as partes confirmadas)
- [ ] Link Zoom/reunião enviado com 24h de antecedência
- [ ] Lembretes enviados 1h antes

✅ **Execução (45 min):**
- [ ] **Min 0–10:** Validação de dados (rever check-ins, padrões)
- [ ] **Min 10–25:** Bloqueio/ajuste (qual ação ficou incompleta? por quê?)
- [ ] **Min 25–35:** Rota (novo ajuste? premissa mudou?)
- [ ] **Min 35–45:** Escalação (próximo passo, novo investimento?)
- [ ] Sessão é focada (tem agenda, não é conversa aberta)

✅ **Documentação:**
- [ ] Você toma notas (ações, decisões, próximos passos)
- [ ] Notas são enviadas ao cliente (confirmação do acordado)
- [ ] Notas são salvas no caderno inteligente do cliente (referência)

✅ **Gravação (Opcional):**
- [ ] Se gravada, cliente é informado e consente
- [ ] Gravação é salva em pasta privada (não compartilhada publicamente)

**Critério de Rejeição:**
- Não aceita se: Sessão não acontece no agendado, Sem agenda/foco, Notas não são documentadas, Cliente não consegue acessar resumo depois

---

### **E9. Relatório Final de ROI (Semana 13)**

**O que é:**
Documento consolidado (1–2 páginas) que resume resultado dos 90 dias: indicador crítico inicial vs final, ações executadas, ROI documentado, aprendizados.

**Critérios de Aceitação (Definition of Done):**

✅ **Estrutura Obrigatória:**
- [ ] **Seção 1 — Indicador Crítico:**
  - Dia 1 (quando começou 90D): [X]
  - Dia 90: [Y]
  - Crescimento: [+Z%]
  - Validação: Sim, este número é real/verificável

- [ ] **Seção 2 — Ações Executadas:**
  - Ação 1: [Status] (Completa/Parcial/Não)
  - Ação 2: [Status]
  - Ação 3: [Status]
  - % de conformidade total

- [ ] **Seção 3 — ROI Documentado:**
  - Investimento (R$ pago por diagnóstico + 90D)
  - Receita gerada OU custos economizados (valor tangível)
  - Retorno (X vezes o investimento)
  - Método de cálculo (como você chegou nesse número?)

- [ ] **Seção 4 — Aprendizados Principais (3 insights):**
  - O que funcionou bem?
  - O que foi difícil?
  - O que você faria diferente?

- [ ] **Seção 5 — Próximos Passos:**
  - Opção A: Continuar com novo ciclo 90D
  - Opção B: Escalar para novo pacote
  - Opção C: Programa de referências
  - Opção D: Encerrar (cliente segue sozinho)

✅ **Qualidade:**
- [ ] Relatório é clientfacing (linguagem clara)
- [ ] Números são verificáveis (você pode prover backup)
- [ ] ROI é conservador (não exagerado)

✅ **Formato:**
- [ ] PDF ou Google Doc bem formatado
- [ ] Nomeado: `[DATA]-[CLIENTE]-RELATORIO-ROI-90D.pdf`
- [ ] Enviado ao cliente + arquivo pessoal

**Critério de Rejeição:**
- Não aceita se: Falta seção, Números não são verificáveis, ROI é exagerado, Próximos passos não estão claros

---

## RESUMO POR FASE

### **FASE 1 (MVP — Diagnóstico)**
| Entregável | Responsável | Quando | Critério |
|-----------|------------|--------|----------|
| E1. Formulário Web | Dev | Antes de iniciar validação | 8 checkboxes (funcional + segurança + UX) |
| E2. Hipótese Preliminar | Você | Dias 2–5 | Score calculado corretamente, hipótese clara |
| E3. Diagnóstico Formal | Você | Dia 15 | 5 páginas, específico ao cliente |
| E4. Blueprint 7D | Você | Dia 15 | 7 páginas + caderno compartilhado |
| E5. Acesso Caderno 90D | Dev | Dia 15 | Link funciona, permissões corretas |

### **FASE 2 (Acompanhamento 90D)**
| Entregável | Responsável | Quando | Critério |
|-----------|------------|--------|----------|
| E6. Check-in Template | Dev | Semana 1 | Template é fácil, autossalva, rastreável |
| E7. Feedback Semanal | Você | Dentro 24h do check-in | 4 seções, análise + recomendação |
| E8. Sessão Mensal | Você | Semanas 1, 5, 9, 13 | Agendado, 45 min, notas documentadas |
| E9. Relatório ROI Final | Você | Semana 13 | 5 seções, ROI verificável |

---

## RASTREAMENTO & APROVAÇÃO

**Quando um entregável é "Done":**
1. Todos os checkboxes dessa seção estão marcados ✅
2. Você (ou @dev) testa manualmente
3. Cliente valida (se aplicável)
4. Story correspondente é marcada "Done"

**Exemplo:**
```
Story: "E1 — Criar Formulário Estratégico Web"
AC (Acceptance Criteria):
- [ ] Formulário carrega sem erros (Chrome, Firefox, Safari, Edge)
- [ ] 28 questões em 6 blocos aparecem
- [ ] Navegação funciona (Próximo/Anterior/Enviar)
... [todos os 8 checkboxes de E1]

When ALL checked → Story é "Done" ✅
```

---

**Documento:** CRITERIOS-ACEITACAO-ENTREGAVEIS.md
**Versão:** 1.0
**Data:** 01/03/2026
**Status:** 🟢 PRONTO PARA DESENVOLVIMENTO
