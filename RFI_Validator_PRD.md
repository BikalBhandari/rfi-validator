# Product Requirements Document (PRD)

## Product Name
RFI Validator

## Purpose
Enable team members without Salesforce access to validate RFI submissions by comparing uploaded Salesforce export data against form entries, without requiring Salesforce login.

## Problem Statement
Certain team members cannot access Salesforce directly. When an RFI form is submitted, these users must wait for someone else to log into Salesforce, export records, and manually verify matches. This process is slow, prone to error, and repetitive.

## Use Case
1. An RFI form is completed by a user.
2. A validating team member without Salesforce access receives the submission.
3. The validating user obtains a CSV export from Salesforce from a colleague with access.
4. The validating user uploads the exported file to the RFI Validator page.
5. The application compares key identifying data between the RFI submission and the Salesforce export.
6. Matching results are displayed clearly to the validating user.

## Goals
- Provide a fully functional HTML-based validation page.
- Allow upload of CSV files.
- Automatically compare RFI submission data to Salesforce export data.
- Display matches and mismatches clearly.
- Minimize manual validation effort.

## Success Metrics
- Time to validate an RFI submission reduced by at least 50%.
- Error rate in manual matching reduced significantly.
- Positive feedback from validating team members.

## Users
- Primary: validating team members without Salesforce access.
- Secondary: Salesforce users who export data for validation.

## Key Requirements

### Functional Requirements
1. HTML-based validation page.
2. File upload support for CSV.
3. Parsing of uploaded Salesforce export data.
4. Compare RFI submission fields against Salesforce records.
5. Fields used for comparison:
   - Created Date
   - First Name
   - Last Name
   - Email
   - Phone Number
   - Military Status (optional; true or blank)
   - ASUO Origin URL
6. Display comparison results with clear status indicators:
   - Exact match
   - Partial match
   - No match
7. Provide summary metrics:
   - Number of matched records
   - Number of unmatched records
   - Records requiring review
8. Allow users to download comparison results as CSV.

### Non-Functional Requirements
1. Responsive HTML UI for desktop browsers.
2. Fast processing for typical Salesforce export sizes up to 500 rows.
3. Robust handling of missing or malformed data.
4. Clear error messages for invalid uploads.

## User Flow
1. User opens the RFI Validator page.
2. User creates one or more RFI submissions in the form builder.
3. User selects the Salesforce export file.
4. User uploads the file.
5. System imports the uploaded file and makes the full imported records table available in a collapsed section.
6. System compares RFI form values against uploaded data.
7. System shows comparison results and highlights matches.
8. User reviews and optionally expands the imported records section.
9. User optionally downloads the result.

## UI Requirements
- A page title and description explaining purpose.
- A full-page layout that uses the available browser width efficiently.
- File upload control with supported formats noted.
- Support creating multiple RFI submissions in the same session.
- Imported Salesforce records should appear in a collapsed section at the bottom of the page by default.
- Created Date should default to the current date and remain editable by the user.
- Comparison results table with columns for:
  - RFI submission identifier
  - Interaction summary fields
  - Interaction Email
  - Interaction Created
  - Interaction Phone Number
  - Interaction Military
  - Interaction ASUO Origin URL
  - Matched Fields
  - Confidence
  - Review Notes
  - Match Result
- Status labels or colors for match quality.
- Button to download results.

## Data Requirements
- Input source: Salesforce CSV export.
- Expected Salesforce export columns:
  - Created Date
  - First Name
  - Last Name
  - Email
  - Phone Number
  - Military Status
  - ASUO Origin URL
- RFI submission data should be mapped to the same columns.

## Matching Logic
- Compare normalized values across fields.
- Use exact or fuzzy matching rules for text fields.
- Normalize phone numbers and dates before comparison.
- If multiple fields match, count as a stronger match.
- Provide a clear reason when records do not match.

## Acceptance Criteria
- [ ] A user can upload CSV files successfully.
- [ ] The uploaded file is imported and displayed.
- [ ] The application compares Salesforce export data against RFI values.
- [ ] Match results are shown clearly on the page.
- [ ] The user can download comparison results.
- [ ] Invalid uploads produce helpful error messages.
- [ ] Uploads over 500 rows are rejected with a clear error message.

## Implementation Notes
- Prefer a single-page HTML application.
- Use client-side JavaScript for file parsing and comparison if possible.
- If server-side support is required, keep backend minimal and focused on parsing.
- Keep file parsing client-side and limited to CSV input to reduce dependency risk.
- Implement a weekly refresh process for Salesforce export data, with options to:
  - Automatically schedule data refresh if file imports are stored server-side.
  - Prompt users to upload a new Salesforce export every week if no automated refresh is available.
  - Retain the latest weekly export and mark it with a refresh timestamp.

## Open Questions
- Will the RFI submission values be entered manually on the page or pulled from an existing system?
- What Salesforce export template(s) should be supported exactly?
- Is there a requirement for user authentication or data privacy controls?

## Future Enhancements
- Add automated import from a Salesforce API.
- Support additional comparison fields.
- Add audit logs for validation sessions.
- Allow saving validation sessions for later review.

## Codex Agents and Skills
- Define codex-based roles to support the full SDLC for the RFI Validator project.
- Agent roles include Product, Design, Development, Integration, Test, DevOps, and Documentation.
- Skills cover requirements, UX design, HTML/JavaScript development, CSV parsing, scheduled refresh workflows, automated testing, deployment, and documentation.
- Use the agents to coordinate discovery, planning, implementation, validation, deployment, and operations.

## Phase Development
### Phase 1: Proof of Concept
- Build the HTML-based validation page.
- Implement CSV upload and parsing.
- Enable basic comparison for key fields.
- Display match results and summary metrics.
- Support exporting comparison results.

### Phase 2: Improved Matching
- Enhance parsing to handle Salesforce export variations.
- Implement normalized and fuzzy matching rules.
- Add clearer match categories and result highlighting.
- Improve error handling for malformed uploads.

### Phase 3: Weekly Refresh and Data Management
- Add weekly data refresh workflow.
- Store latest Salesforce export with a refresh timestamp.
- Add UI prompts for stale data and refresh status.
- Enable automated scheduled refresh if backend storage exists.

### Phase 4: Workflow and Automation
- Add user guidance for upload and validation steps.
- Add saved validation sessions and audit logging.
- Explore Salesforce API integration for direct data import.
