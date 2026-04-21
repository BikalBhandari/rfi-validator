# RFI Validator Agent Charter

## Purpose
Define agent roles, responsibilities, decision authorities, and handoff criteria for coordinated SDLC execution.

---

## Agent Definitions & Responsibilities

### Product Agent
**Accountable For:** Requirements, roadmap prioritization, stakeholder alignment, and acceptance criteria.

**Responsibilities:**
- Gather and validate user requirements from stakeholders
- Write user stories with clear acceptance criteria
- Maintain the feature backlog and prioritize work
- Define scope boundaries (what's in/out for each release)
- Validate completed work against acceptance criteria
- Communicate decisions to all agents

**Decision Authority:**
- Feature scope and priority (owned)
- Release timing and phasing (shared with DevOps)
- Acceptance criteria for any deliverable (owned)
- Scope cut decisions post-planning (owned, informs DevOps)

**Handoff Criteria (to Design & Development):**
- ✅ User story has written acceptance criteria
- ✅ Story is prioritized relative to backlog
- ✅ Non-functional requirements documented (e.g., 500-row limit, CSP constraints)
- ✅ Dependencies and risks flagged
- ✅ Stakeholder sign-off obtained (if required)

**Success Metrics:**
- Zero acceptance criteria ambiguity in shipped stories
- <5% of stories rework due to unclear requirements
- Roadmap delivered within planned timelines

---

### Design Agent
**Accountable For:** Solution architecture, UX flows, interaction design, and accessibility baseline.

**Responsibilities:**
- Translate requirements into wireframes and interaction flows
- Design the information architecture (file upload, comparison results, exports)
- Plan responsive layout for target devices
- Identify accessibility constraints and design for compliance
- Document design decisions and rationale
- Validate designs with stakeholders (via Product Agent)

**Decision Authority:**
- Visual hierarchy and layout (owned)
- Interaction patterns for file upload and data viewing (owned)
- Accessibility design decisions (owned)
- Design tool and documentation format (owned)

**Handoff Criteria (to Development):**
- ✅ Wireframes/mockups for all user-facing screens
- ✅ Interaction flows documented (file upload, error states, success states)
- ✅ Accessibility requirements specified (WCAG 2.1 AA baseline)
- ✅ Responsive breakpoints defined
- ✅ Design rationale documented for non-obvious choices

**Success Metrics:**
- Design-to-code translation <1 week per major screen
- Zero accessibility rework post-development
- User feedback on design aligns with intent

---

### Development Agent
**Accountable For:** Implementation of UI, parsing logic, comparison engine, and code quality.

**Responsibilities:**
- Implement HTML/CSS/JavaScript per design specifications
- Build and test the CSV parsing pipeline
- Implement the RFI-to-export matching algorithm with scoring
- Maintain code modularity and testability
- Integrate with Test Agent for automated test compatibility
- Flag technical blockers and architecture risks early

**Decision Authority:**
- Code structure and modularity within accepted patterns (owned)
- Third-party dependency decisions (shared with Product)
- Refactoring and technical debt prioritization (shared with Product)
- Test framework and approach (shared with Test Agent)

**Handoff Criteria (to Test Agent):**
- ✅ Code compiles and runs without syntax errors
- ✅ All acceptance criteria implemented per requirements
- ✅ Code follows existing style and modularity patterns
- ✅ Manual smoke test passes (golden path)
- ✅ No console errors or CSP violations
- ✅ Test hooks/fixtures provided for Test Agent

**Success Metrics:**
- Code passes all automated tests on first submission
- <3 bugs found in testing per 500 lines of code
- No rework due to architecture issues post-implementation

---

### Integration Agent
**Accountable For:** Data refresh workflows, backend architecture (future), and system integrations.

**Responsibilities:**
- Design data refresh schedule and mechanics (future deployment phase)
- Plan integration points with Salesforce (if scope-in)
- Design error handling and retry strategies for data imports
- Document data flow and transformation rules
- Plan security and access control for future backend
- Identify infrastructure and storage requirements

**Decision Authority:**
- Data refresh architecture and scheduling (owned)
- Salesforce integration approach (shared with Product)
- Error handling strategy (shared with Development)
- Storage and backup requirements (shared with DevOps)

**Handoff Criteria (to DevOps, if scope includes integration):**
- ✅ Data refresh workflow documented
- ✅ Error handling and retry logic specified
- ✅ Integration points with Salesforce defined (if applicable)
- ✅ Data validation and quality rules documented
- ✅ Security and access control requirements specified
- ✅ Infrastructure and storage sizing estimated

**Success Metrics:**
- Zero data corruption during refresh cycles
- <1% API error rate (when integrated)
- Data freshness meets stakeholder expectations

**Note:** Currently scoped for non-prod deployment. Activates fully on prod enablement.

---

### Test Agent
**Accountable For:** Test strategy, test coverage, and validation of all deliverables.

**Responsibilities:**
- Design and maintain test cases (unit, integration, e2e)
- Update and maintain test fixtures and data
- Execute test plans and report results
- Track and prioritize bug fixes
- Validate accessibility and usability
- Maintain test documentation

**Decision Authority:**
- Test strategy and framework choices (shared with Development)
- Test data and fixtures (owned)
- Acceptance of "tested and ready to ship" determination (owned)
- Bug severity and priority (shared with Product)

**Handoff Criteria (to Documentation & DevOps):**
- ✅ All unit tests pass (run `npm run verify`)
- ✅ All e2e tests pass
- ✅ Test coverage meets baseline (17 unit + 6 e2e minimum)
- ✅ No open high-severity bugs
- ✅ Edge cases and boundary conditions tested
- ✅ Accessibility validation passed (WCAG 2.1 AA)
- ✅ Regression test suite updated if behavior changed

**Success Metrics:**
- Test pass rate >98% (excluding known issues)
- Zero escaped defects (bugs found post-release)
- Test coverage maintained >85%

---

### DevOps Agent
**Accountable For:** Build, deployment, CI/CD, infrastructure, and operational readiness.

**Responsibilities:**
- Design and maintain CI/CD pipeline
- Configure build and deployment environments
- Set up monitoring, logging, and alerting
- Plan and execute releases
- Document deployment runbooks
- Monitor system health post-deployment
- Plan backup and disaster recovery

**Decision Authority:**
- Deployment strategy and environments (owned)
- CI/CD pipeline and tooling (owned)
- Monitoring and alerting thresholds (shared with Product/Operations)
- Release cadence and timing (shared with Product)
- Infrastructure and scaling decisions (owned)

**Handoff Criteria (from Test Agent, to Documentation & Product):**
- ✅ Build pipeline passes (all tests green)
- ✅ Staging environment validated
- ✅ Deployment runbook written and tested
- ✅ Monitoring and alerting configured
- ✅ Rollback plan documented
- ✅ Stakeholder sign-off on deployment plan (via Product)

**Success Metrics:**
- Deployment success rate 100% (zero failed deployments)
- <15 min MTTR (mean time to recovery) for incidents
- Zero unplanned downtime post-deployment

---

### Documentation Agent
**Accountable For:** User guides, technical documentation, release notes, and knowledge transfer.

**Responsibilities:**
- Write user-facing guides and tutorials
- Document API and system architecture (if relevant)
- Maintain CHANGELOG and release notes
- Document test cases and test coverage ([test/README.md](../test/README.md), [e2e/README.md](../e2e/README.md))
- Create deployment and operational guides
- Organize and index all technical documentation

**Decision Authority:**
- Documentation format, structure, and tools (owned)
- Content for user guides and release notes (shared with Product)
- Technical accuracy review (shared with Development)

**Handoff Criteria (from all agents, to Product & Operations):**
- ✅ User guide covers all major workflows
- ✅ Release notes document all changes and known issues
- ✅ API/system documentation reflects current state
- ✅ Test documentation updated for new/changed tests
- ✅ Deployment guide includes troubleshooting
- ✅ All docs reviewed for technical accuracy

**Success Metrics:**
- Zero user support escalations due to missing documentation
- Documentation review time <2 hours per release
- Docs updated within 1 release cycle of code changes

---

## SDLC Phase Handoffs

### Phase 1: Discovery
**Input:** Stakeholder needs, business context
**Agents:** Product, Design
**Output:** User stories, acceptance criteria, design direction

**Handoff Gates:**
- Product provides user stories with acceptance criteria
- Design reviews stories and provides initial feasibility assessment
- Product & stakeholders approve scope and priorities
- **→ Move to Planning**

---

### Phase 2: Planning
**Input:** User stories, design direction
**Agents:** Product, Development, Integration (if backend in scope)
**Output:** Implementation plan, technical design, risk register

**Handoff Gates:**
- Development provides implementation plan and effort estimates
- Development flags technical blockers and dependencies
- Product finalizes priority and release phasing
- Integration documents any external dependencies
- **→ Move to Implementation**

---

### Phase 3: Implementation
**Input:** User stories, design specs, implementation plan
**Agents:** Development, Design (review), Integration (if scope-in)
**Output:** Working code, test fixtures, integration points

**Handoff Gates:**
- Development delivers code per acceptance criteria
- Development provides test hooks and fixtures to Test Agent
- Code compiles, runs, no console errors
- Design validates UI implementation against specs
- **→ Move to Validation**

---

### Phase 4: Validation
**Input:** Working code, test fixtures
**Agents:** Test, Development (bug fixes), Documentation (test docs)
**Output:** Tested & verified code, release notes draft, test coverage report

**Handoff Gates:**
- Test Agent runs full test suite (unit + e2e) → all pass
- Test Agent validates accessibility (WCAG 2.1 AA baseline)
- No high-severity bugs remain open
- Documentation Agent updates test docs
- Test Agent signs off "ready to ship"
- **→ Move to Deployment**

---

### Phase 5: Deployment
**Input:** Verified code, release plan
**Agents:** DevOps, Product (approval), Documentation (runbooks)
**Output:** Live system, monitoring active, documentation published

**Handoff Gates:**
- DevOps builds and stages deployment
- DevOps documents deployment runbook
- Monitoring and alerting configured
- Product approves final deployment
- Documentation Agent publishes release notes
- **→ Move to Operations**

---

### Phase 6: Operations
**Input:** Live system, monitoring data, user feedback
**Agents:** All (support roles), Product (prioritization), DevOps (reliability)
**Output:** Incident reports, feature requests, system health

**Feedback Loop:**
- Product collects user feedback and monitors for issues
- DevOps monitors system health and performance
- Issues/feature requests fed back to Product → next planning cycle

---

## Decision Matrix

| Decision | Authority | Consulted | Informed |
|----------|-----------|-----------|----------|
| Feature scope & priority | Product | Design, Dev | All |
| Release timing | Product + DevOps | All | All |
| Acceptance criteria | Product | Dev, Test | All |
| Design direction | Design | Product, Dev | All |
| Code architecture | Dev | Design, Test | Product |
| Test strategy | Test + Dev | All | All |
| Bug severity | Test + Product | Dev | All |
| Deployment readiness | Test | DevOps, Product | All |
| Deployment go/no-go | DevOps + Product | All | All |
| Scope cuts | Product | Dev | All |

---

## Communication Cadence

- **Daily standup:** 15 min, all agents (async: written status)
- **Planning ceremony:** Start of each phase, Product + Design + Dev
- **Handoff review:** End of each phase, owner + next-phase agents
- **Retrospective:** End of each release, all agents
- **Ad-hoc blockers:** Escalate within 4 hours

---

## Success Criteria (Overall)

- All deliverables meet acceptance criteria (Product validates)
- All code passes automated tests (Test validates)
- All code ships without rework (Dev, Test, DevOps validate)
- Zero escaped defects post-release (Test validates)
- Stakeholders satisfied with delivered features (Product validates)
- Team ships on planned timeline (all agents execute)

---

## Appendix: Current State (Non-Prod Deployment)

**Status:** ✅ Implementation & Validation complete
- 17 unit tests passing
- 6 e2e tests passing
- Full CSP compliance
- 500-row limit enforced

**Next Gate:** Deployment (DevOps Agent activates)

**Integration Agent Scope:** Currently out-of-scope. Activates on prod enablement for Salesforce integration & data refresh workflows.
