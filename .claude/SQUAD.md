# Squad Desafio AIOX - Ativação

**Status:** ✅ Instalado em `/c/Users/aneli/code/squads/squad-desafio-aiox-main/`

## Slash Commands Ativados

Você pode agora usar os seguintes comandos para ativar os agentes do squad:

| Comando | Agente | Função |
|---------|--------|--------|
| `/aiox-chief` | 👑 AIOX Chief | Líder - roteia para agente certo |
| `/video-editor` | 🎬 Video Editor | Corta vídeos em shorts/reels/clips |
| `/espiao` | 🕵️ Espião | Analisa concorrentes |
| `/repurposing` | ♻️ Repurposing | Multiplica conteúdo em vários formatos |
| `/scriptwriter` | ✍️ Scriptwriter | Cria roteiros com hook + CTA |

## Como Usar

### 1. Comece pelo Chief
```
/aiox-chief
```
O Chief vai entender sua necessidade e rotear para o agente certo.

### 2. Ou chame agentes diretamente
```
/video-editor
"Corta essa live em 10 shorts de 60s"
```

### 3. Use workflows guiados
Para tarefas estruturadas:
- `cortar-video` - Guia completo para cortes
- `analisar-canal` - Espionagem passo a passo
- `multiplicar-conteudo` - Repurposing workflow

### 4. Valide com checklists
Ao final de cada entrega:
- `qualidade-corte` - Valida cortes (score: 6/8)
- `analise-canal` - Valida análises (75%)
- `repurposing` - Valida multiplicação (75%)
- `roteiro` - Valida roteiros (75%)

## Exemplo de Fluxo Completo

```
1. /aiox-chief
   ↓
   "Preciso de 10 cortes de uma live de 2h"
   ↓
2. Chief roteia → /video-editor
   ↓
3. Video Editor executa workflow
   ↓
4. Chief aplica checklist (qualidade-corte)
   ↓
5. Entrega validada ✅
```

## Arquivo de Configuração

Os skills estão mapeados em:
- `.claude/squad-skills.json` - Registro dos agentes e workflows

## Documentação Completa

- **README:** `/code/squads/squad-desafio-aiox-main/README.md`
- **Agentes:** `/code/squads/squad-desafio-aiox-main/agents/`
- **Tasks:** `/code/squads/squad-desafio-aiox-main/tasks/`
- **Checklists:** `/code/squads/squad-desafio-aiox-main/checklists/`

---

*Squad ativado para Desafio AIOX 2026*
