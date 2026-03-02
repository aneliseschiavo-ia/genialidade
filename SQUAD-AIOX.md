# Squad Desafio AIOX - Guia Rápido

✅ **Instalado em:** `/c/Users/aneli/code/squads/squad-desafio-aiox-main/`

## 🚀 Comece Aqui

### 1. Ative o Chief (Líder do Squad)

Use o comando `/AIOS:agents:squad-creator` para ativar o squad creator ou acesse diretamente:

```
Agentes disponíveis em: /code/squads/squad-desafio-aiox-main/agents/
```

### 2. Agentes do Squad

| Comando/Arquivo | Agente | Função |
|---|---|---|
| `aiox-chief.md` | 👑 AIOX Chief | Líder - roteia para agente certo |
| `video-editor.md` | 🎬 Video Editor | Corta vídeos em shorts/reels/clips |
| `espiao.md` | 🕵️ Espião | Analisa concorrentes |
| `repurposing.md` | ♻️ Repurposing | Multiplica conteúdo em vários formatos |
| `scriptwriter.md` | ✍️ Scriptwriter | Cria roteiros com hook + CTA |

**Localização dos agentes:**
```
/c/Users/aneli/code/squads/squad-desafio-aiox-main/agents/
```

### 3. Workflows Guiados

Tarefas estruturadas prontas para usar:

| Workflow | Arquivo | Função |
|---|---|---|
| Cortar Video | `tasks/cortar-video.md` | Guia completo para cortes |
| Analisar Canal | `tasks/analisar-canal.md` | Espionagem passo a passo |
| Multiplicar Conteúdo | `tasks/multiplicar-conteudo.md` | Repurposing workflow |

### 4. Checklists de Qualidade

Valide entregas após cada trabalho:

| Checklist | Arquivo | Score Mínimo |
|---|---|---|
| Qualidade de Corte | `checklists/qualidade-corte.md` | 6/8 |
| Análise de Canal | `checklists/analise-canal.md` | 75% |
| Repurposing | `checklists/repurposing.md` | 75% |
| Roteiro | `checklists/roteiro.md` | 75% |

## 📋 Fluxo Completo

```
1. Pedido do usuário
   ↓
2. /AIOS:agents:squad-creator → Carrega o squad
   ↓
3. Escolha agente
   - aiox-chief.md (roteia automaticamente)
   - ou agente específico
   ↓
4. Executa workflow (tasks/)
   ↓
5. Aplica checklist de validação
   ↓
6. Entrega ✅
```

## 🎯 Exemplo de Uso

### Cenário: Preciso de 10 cortes de uma live

```
1. Inicie com o Chief:
   @aiox-chief
   "Preciso de 10 cortes de 60s da minha live"

2. Chief roteia para Video Editor:
   @video-editor

3. Video Editor executa o workflow:
   tasks/cortar-video.md

4. Chief aplica checklist:
   checklists/qualidade-corte.md

5. Resultado: 10 cortes validados ✅
```

## 📂 Estrutura Completa

```
squad-desafio-aiox-main/
├── agents/
│   ├── aiox-chief.md         # Líder
│   ├── video-editor.md       # Cortes
│   ├── espiao.md             # Análise
│   ├── repurposing.md        # Multiplicação
│   └── scriptwriter.md       # Roteiros
├── tasks/
│   ├── cortar-video.md
│   ├── analisar-canal.md
│   └── multiplicar-conteudo.md
├── checklists/
│   ├── qualidade-corte.md
│   ├── analise-canal.md
│   ├── repurposing.md
│   └── roteiro.md
└── README.md
```

## 🔗 Documentação

- **Referência completa:** `/code/squads/squad-desafio-aiox-main/README.md`
- **Configuração:** `.claude/squad-skills.json`
- **Este guia:** `SQUAD-AIOX.md`

---

**Squad Desafio AIOX 2026** — Criado pela Academia Lendaria
