# Codex Agents and Skills for RFI Validator SDLC

## Overview
This document defines the Codex agent roles and their required skills to support a full software development lifecycle (SDLC) for the RFI Validator project.

## Agent Roles

### 1. Product Agent
- Role: Owns product requirements, user stories, acceptance criteria, and stakeholder alignment.
- Skills:
  - Requirements elicitation
  - Use case analysis
  - Prioritization and roadmap planning
  - Documentation and communication
  - Stakeholder feedback integration

### 2. Design Agent
- Role: Designs the solution architecture, user experience, and UI flow.
- Skills:
  - UX/UI design for web interfaces
  - Information architecture
  - Interaction design for file upload workflows
  - Responsive layout planning
  - Accessibility awareness

### 3. Development Agent
- Role: Implements the core application, parsing logic, and comparison engine.
- Skills:
  - HTML/CSS/JavaScript development
  - File handling for CSV
  - Data normalization and matching algorithms
  - Client-side or minimal backend architecture
  - Code modularity and maintainability

### 4. Integration Agent
- Role: Connects data refresh, backend storage, and optional Salesforce integration.
- Skills:
  - API integration design
  - Scheduled data refresh workflows
  - Data storage and retrieval strategies
  - Error handling and retry logic
  - Security and access control considerations

### 5. Test Agent
- Role: Creates test cases, validates functionality, and ensures quality.
- Skills:
  - Functional test case design
  - Input validation and edge cases
  - Automated testing strategy
  - Regression testing
  - Usability validation

### 6. DevOps Agent
- Role: Sets up deployment, CI/CD, and environment automation.
- Skills:
  - Build and deployment pipeline design
  - Environment configuration
  - Release management
  - Monitoring and logging setup
  - Backup and restore planning

### 7. Documentation Agent
- Role: Produces documentation, user guides, and release notes.
- Skills:
  - Technical writing
  - User-facing guide creation
  - Change log and version notes
  - Documentation organization
  - Knowledge transfer support

## Skill Matrix
- Requirements & Product: product agent, documentation agent
- UI/UX & User Flow: design agent, development agent
- Parsing & Comparison Engine: development agent, integration agent
- Data Refresh Workflow: integration agent, DevOps agent
- File Upload Validation: development agent, test agent
- Automation & CI/CD: DevOps agent, test agent
- Release & Handoff: documentation agent, product agent

## SDLC Project Stages
1. Discovery
   - Product agent and design agent define user needs and success criteria.
2. Planning
   - Product and development agents break work into phased deliverables.
3. Implementation
   - Development and integration agents build the UI, parser, matching logic, and refresh flow.
4. Validation
   - Test and documentation agents validate functionality and prepare user guidance.
5. Deployment
   - DevOps agent deploys the app, configures refresh schedules, and ensures reliability.
6. Operations
   - All agents support monitoring, updates, and continuous improvement.
