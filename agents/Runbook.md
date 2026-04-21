# Agents Runbook

This runbook provides copy-paste prompts for each agent defined in the `agents/` folder so they run with the right scope, inputs, and completion phrase.

## Default Sequence
1. Product Agent
2. Design Agent
3. Development Agent
4. Integration Agent
5. Test Agent
6. Test Automation Engineer
7. Documentation Agent
8. Checkpoint Agent

## Prompt Template

Use this base structure for any agent:

```text
Act as the agent defined in [agent file path].
Follow that file exactly.

Task:
[specific task]

Inputs:
- [file path]
- [file path]
- [other required context]

Output:
- [deliverables you want back]

Constraints:
- [important guardrails]

End with:
[EXACT AGENT DONE PHRASE]
```

Add one extra line when needed:

```text
Specific focus for this run:
[the exact behavior, feature, bug, or artifact to target]
```

## Product Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Product_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Product_Agent.md.
Follow that file exactly.

Task:
Review and refine the product requirements for the RFI Validator based on the existing PRD.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/RFI_Validator_PRD.md
- Relevant project files in this repo

Output:
- Refined problem statement
- Target users
- Prioritized product goals
- User stories
- Acceptance criteria
- Any requirement gaps or ambiguities

Constraints:
- Do not write code
- Do not invent features without labeling them as recommendations
- Prefer clarifying and tightening the existing PRD over rewriting it from scratch

End with:
PRODUCT AGENT DONE
```

## Design Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Design_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Design_Agent.md.
Follow that file exactly.

Task:
Design the UX, page flow, and interaction model for the current RFI Validator requirements.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/RFI_Validator_PRD.md
- Relevant existing app files in the repo
- Product Agent output if available

Output:
- Main user flows
- Page or screen structure
- Upload workflow design
- Validation and error states
- Results-view behavior
- Responsive and accessibility guidance
- Clear implementation guidance for development

Constraints:
- Be specific enough that a developer can implement without guessing
- Stay aligned with the existing product requirements
- Flag any UX decisions that need confirmation

End with:
DESIGN AGENT DONE
```

## Development Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Development_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Development_Agent.md.
Follow that file exactly.

Task:
Implement the next approved RFI Validator feature or fix based on the PRD and design guidance.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/RFI_Validator_PRD.md
- Design Agent output if available
- Relevant source files in this repo

Output:
- Code changes in the repo
- Brief summary of what was implemented
- Any assumptions made
- Any follow-up items or known limitations

Constraints:
- Preserve existing working behavior unless the task requires changing it
- Use the current repo structure and conventions
- Do not leave the task at planning level; implement the change

End with:
DEVELOPMENT AGENT DONE
```

## Integration Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Integration_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Integration_Agent.md.
Follow that file exactly.

Task:
Design or implement the integration aspects for the RFI Validator, including data refresh workflow, storage approach, import/export handling, and future Salesforce integration readiness.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/RFI_Validator_PRD.md
- Relevant code and config files in this repo
- Development Agent output if available

Output:
- Integration design or code/config changes
- Data flow description
- Error handling and retry approach
- Storage and refresh recommendations
- Notes on future Salesforce API readiness

Constraints:
- Focus on practical integration behavior, not generic architecture commentary
- Be explicit about assumptions and deferred work

End with:
INTEGRATION AGENT DONE
```

## Test Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Test_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Test_Agent.md.
Follow that file exactly.

Task:
Run a QA pass against the current RFI Validator app.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/Test Data/report1775759327714.csv
- Relevant app files and current implementation

Output:
- Findings first
- Tests performed
- Residual risks or gaps

Constraints:
- Execute real validation when possible
- Verify parsing succeeds
- Verify expected comparison fields are recognized
- Verify extra Salesforce fields remain inspectable
- Verify comparison results avoid duplicate cross-product rows and use the best unique match per RFI
- Verify readiness and status messaging updates correctly during editing
- Clearly state what was and was not executed

End with:
TEST AGENT DONE
```

## Test Automation Engineer
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Test_Automation_Engineer.md.
Follow that file exactly.

Task:
Run automated browser-based validation for the current RFI Validator app.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/Test Data/report1775759327714_rfi_fixture.json
- /Users/bbhanda1/Desktop/RFI Validator/Test Data/report1775759327714.csv
- Relevant test and app files in the repo
- App URL: [put local URL here, for example http://localhost:3000]
- If the app is not already running, start it using: [put command here]

Output:
- Failures first
- Tests executed
- Residual automation gaps

Constraints:
- Use real browser automation when available
- Populate the UI using the JSON fixture
- Upload the CSV through the file picker
- Validate compare flow, results table, summary metrics, match statuses, parsed uploaded fields, unique record usage, filters, reset behavior, and download behavior
- Capture clear reproduction steps for any failure
- If browser automation tooling is unavailable, say so explicitly and fall back to the highest-confidence executable checks available

Specific focus for this run:
[put the exact feature or regression you want validated]

End with:
TEST AUTOMATION ENGINEER DONE

```

## Documentation Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Documentation_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Documentation_Agent.md.
Follow that file exactly.

Task:
Update project documentation for the current state of the RFI Validator.

Inputs:
- /Users/bbhanda1/Desktop/RFI Validator/RFI_Validator_PRD.md
- Relevant changed files in the repo
- Test and development outputs if available

Output:
- Updated user-facing documentation
- Technical notes or handoff guidance
- Release notes or change summary as appropriate

Constraints:
- Document actual implemented behavior, not intended behavior unless clearly labeled
- Keep documentation organized and easy to hand off

End with:
DOCUMENTATION AGENT DONE
```

## Checkpoint Agent

Agent file: `/Users/bbhanda1/Desktop/RFI Validator/agents/Checkpoint_Agent.md`

```text
Act as the agent defined in /Users/bbhanda1/Desktop/RFI Validator/agents/Checkpoint_Agent.md.
Follow that file exactly.

Task:
Summarize what the previous agent or set of agents completed and state the next recommended task.

Inputs:
- Outputs from the prior agent or agents
- Any changed files relevant to the completed work

Output:
- Short summary of what was built or verified
- What remains
- Next recommended task: [specific next action]

Constraints:
- Keep it concise
- Focus on handoff clarity

End with:
CHECKPOINT AGENT DONE
```

## Usage Notes

- Do not invoke an agent with only its role name. Give it a concrete task and explicit inputs.
- Always include the exact completion phrase from the agent file.
- If you want implementation, tell the Development Agent to change code, not just plan.
- If you want real QA, tell the Test Agent to execute checks and report what actually ran.
- If you want browser validation, give the Test Automation Engineer the fixture and upload file paths.
