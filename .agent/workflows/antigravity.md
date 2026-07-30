---
description: Antigravity agent workflow for Conduit collaboration
---

# ANTIGRAVITY WORKFLOW (v0.42.4)

## 🎯 PRIMARY DIRECTIVE: LOG YOUR WORK
You MUST log all work to `.conduit/context.json` using `agent_bridge.js`.

### Required Commands
- **Status**: `node agent_bridge.js --agent antigravity --status working --intent "Task description"`
- **Log**: `node agent_bridge.js --log "Detailed action taken"`
- **Plan**: `node agent_bridge.js --add-plan "Next step" --priority high`
- **Reserve**: `node agent_bridge.js --agent antigravity --reserve "path/to/file"`
- **Release**: `node agent_bridge.js --agent antigravity --release "path/to/file"`

## 🤝 COLLABORATION
1. **Sync Frequency**: Check `node agent_bridge.js --summary` every 1-2 tasks.
2. **Conflict Prevention**: Before editing a file, check if a peer agent has a pending plan or active intent for it.
3. **Log Visibility**: IMMEDIATELY log actions so peers are aware of your changes.
4. **File Ownership**: MANDATORY: Reserve a file before editing (`--reserve`) and release (`--release`) immediately after completion.
5. **Proactive Audit**: After completing a task, scan for related issues (missing imports, type errors, unused variables). Fix them WITHOUT being asked.
