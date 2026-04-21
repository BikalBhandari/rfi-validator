const fileInput = document.getElementById('file-input');
const compareButton = document.getElementById('compare-button');
const downloadButton = document.getElementById('download-button');
const resetExportButton = document.getElementById('reset-export-button');
const resetAllButton = document.getElementById('reset-all-button');
const appearanceButton = document.getElementById('appearance-button');
const appearancePanel = document.getElementById('appearance-panel');
const appearanceOptions = Array.from(document.querySelectorAll('[data-theme-option]'));
const dashboardView = document.getElementById('dashboard-view');
const rfiInputsView = document.getElementById('rfi-inputs-view');
const testDataGeneratorView = document.getElementById('test-data-generator-view');
const historyView = document.getElementById('history-view');
const salesforceRecordsView = document.getElementById('salesforce-records-view');
const profileView = document.getElementById('profile-view');
const historyEntriesEl = document.getElementById('history-entries');
const addRfiButton = document.getElementById('add-rfi-button');
const clearRfiTableButton = document.getElementById('clear-rfi-table-button');
const manualRfiPanel = document.getElementById('manual-rfi-panel');
const rfiCsvInput = document.getElementById('rfi-csv-input');
const rfiCsvPasteInput = document.getElementById('rfi-csv-paste');
const importRfiCsvButton = document.getElementById('import-rfi-csv-button');
const clearRfiCsvButton = document.getElementById('clear-rfi-csv-button');
const rfiImportStatusEl = document.getElementById('rfi-import-status');
const statusEl = document.getElementById('status');
const previewContainer = document.getElementById('preview-container');
const salesforceRecordsContainer = document.getElementById('salesforce-records-container');
const resultsContainer = document.getElementById('results-container');
const resultsCard = document.getElementById('results-card');
const submissionsContainer = document.getElementById('rfi-submissions');
const submissionTemplate = document.getElementById('rfi-submission-template');
const generatorUrlInput = document.getElementById('generator-url');
const generatorIdentifierInput = document.getElementById('generator-identifier');
const generatorBrowserInput = document.getElementById('generator-browser');
const generatorDeviceInput = document.getElementById('generator-device');
const generatorIdentifierDataInput = document.getElementById('generator-identifier-data');
const generatorTimestampInput = document.getElementById('generator-timestamp');
const generatorFirstNameCheckbox = document.getElementById('generator-first-name');
const generatorLastNameCheckbox = document.getElementById('generator-last-name');
const generatorFirstNameValueInput = document.getElementById('generator-first-name-value');
const generatorLastNameValueInput = document.getElementById('generator-last-name-value');
const generatorPhoneCheckbox = document.getElementById('generator-phone-number');
const generatorEmailCheckbox = document.getElementById('generator-email');
const generatorPhoneFormatRadios = Array.from(document.querySelectorAll('input[name="generator-phone-format"]'));
const generatorEmailPreviewEl = document.getElementById('generator-email-preview');
const generatorGenerateButton = document.getElementById('generator-generate-button');
const generatorBatchPlusButton = document.getElementById('generator-batch-plus-button');
const generatorBatchMinusButton = document.getElementById('generator-batch-minus-button');
const generatorBatchCountDisplay = document.getElementById('generator-batch-count-display');
const generatorDownloadButton = document.getElementById('generator-download-button');
const generatorInjectButton = document.getElementById('generator-inject-button');
const generatorStatusEl = document.getElementById('generator-status');
const generatorResultsPanel = document.getElementById('generator-results-panel');
const generatorResultsBody = document.getElementById('generator-results-body');
const generatorResultsDescription = document.getElementById('generator-results-description');
const previewPanel = document.getElementById('preview-panel');
const previewToggleLabelEl = document.getElementById('preview-toggle-label');
const workflowSummaryEl = document.getElementById('workflow-summary');
const previewFileNameEl = document.getElementById('preview-file-name');
const previewFileTypeEl = document.getElementById('preview-file-type');
const previewRecordCountEl = document.getElementById('preview-record-count');
const previewRecognizedFieldsEl = document.getElementById('preview-recognized-fields');
const previewRfiCountEl = document.getElementById('preview-rfi-count');
const previewMissingFieldsEl = document.getElementById('preview-missing-fields');
const previewRowCountEl = document.getElementById('preview-row-count');
const previewReadyStateEl = document.getElementById('preview-ready-state');
const previewDiagnosticsNoteEl = document.getElementById('preview-diagnostics-note');
const topbarViewLinks = Array.from(document.querySelectorAll('.topbar-link[data-view]'));
const notificationsButton = document.getElementById('notifications-button');
const notificationsPanel = document.getElementById('notifications-panel');
const notificationsBadgeEl = document.getElementById('notifications-badge');
const notificationsListEl = document.getElementById('notifications-list');
const topbarUserNameEl = document.querySelector('.topbar-user-name');
const topbarUserRoleEl = document.querySelector('.topbar-user-role');
const topbarAvatarButton = document.querySelector('.topbar-avatar-button');
const topbarAvatarEl = document.querySelector('.topbar-avatar');
const profileNameInput = document.getElementById('profile-name');
const profileRoleInput = document.getElementById('profile-role');
const profileAvatarInput = document.getElementById('profile-avatar');
const profileIdentifierInput = document.getElementById('profile-identifier');
const profilePreviewNameEl = document.getElementById('profile-preview-name');
const profilePreviewRoleEl = document.getElementById('profile-preview-role');
const profilePreviewAvatarEl = document.getElementById('profile-preview-avatar');
const previewBodyContainers = [previewContainer, salesforceRecordsContainer].filter(Boolean);
const THEME_STORAGE_KEY = 'rfi-validator-theme';
const PROFILE_STORAGE_KEY = 'rfi-validator-profile';

let parsedRecords = [];
let comparisonResults = [];
let historyEntries = [];
let historyEntryCounter = 0;
let submissionCounter = 0;
let currentPreviewFileName = '';
let currentPreviewFileType = '—';
let currentPreviewStatus = 'Inactive';
let fileDiagnostics;
let previewSearchQuery = '';
let resultsSearchQuery = '';
let lastGeneratedTestData = null;
let lastGeneratedBatchData = [];
let generatorBatchCount = 1;
const EXPORT_ROW_LIMIT = 500;
const RFI_ROW_LIMIT = 500;

const {
  buildSubmissionValuesFromRecord,
  calculateFileDiagnostics,
  canonicalizeRecord,
  displayFieldValue,
  expectedFields,
  findField,
  formatDateDisplay,
  getEmptyFileDiagnostics,
  hasMeaningfulSubmissionData,
  normalizeDate,
  normalizeMilitaryStatus,
  normalizeValue,
  parseCsv,
  selectBestUniqueMatches,
  sortResults,
  validateRecordCount
} = window.RfiValidatorCore;

fileDiagnostics = getEmptyFileDiagnostics();

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getSubmissionCards() {
  return Array.from(submissionsContainer.querySelectorAll('.submission-row'));
}

function getCurrentRfiRowCount() {
  return getSubmissionCards().length;
}

function padNumber(value, size = 2) {
  return String(value).padStart(size, '0');
}

function formatGeneratorTimestampDisplay(date) {
  return `${padNumber(date.getUTCMonth() + 1)}/${padNumber(date.getUTCDate())} ${padNumber(date.getUTCHours())}:${padNumber(date.getUTCMinutes())}:${padNumber(date.getUTCSeconds())}:${padNumber(date.getUTCMilliseconds(), 3)}`;
}

function formatGeneratorTimestampToken(date) {
  return `${padNumber(date.getUTCMonth() + 1)}${padNumber(date.getUTCDate())}${padNumber(date.getUTCHours())}${padNumber(date.getUTCMinutes())}${padNumber(date.getUTCSeconds())}${padNumber(date.getUTCMilliseconds(), 3)}`;
}

function buildGeneratorBatchId(date = new Date()) {
  const randomSuffix = Math.random().toString(36).slice(2, 8).padEnd(6, '0');
  return `batch-${formatGeneratorTimestampToken(date)}-${randomSuffix}`;
}

function getGeneratorTimestampLabel(date = new Date()) {
  return `Generated (UTC): ${formatGeneratorTimestampDisplay(date)}`;
}

function setGeneratorTimestampPlaceholder() {
  if (!generatorTimestampInput) return;
  generatorTimestampInput.value = 'Generated on click (UTC)';
}

function sanitizeGeneratorToken(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function getGeneratorIdentifierDataToken() {
  const parts = [
    sanitizeGeneratorToken(generatorIdentifierInput?.value || ''),
    sanitizeGeneratorToken(generatorBrowserInput?.value || ''),
    sanitizeGeneratorToken(generatorDeviceInput?.value || '')
  ].filter(Boolean);

  return parts.join('.');
}

function getGeneratorIdentifierToken() {
  return sanitizeGeneratorToken(generatorIdentifierInput?.value || '');
}

function updateGeneratorIdentifierData() {
  if (!generatorIdentifierDataInput) return;
  const token = getGeneratorIdentifierDataToken();
  generatorIdentifierDataInput.value = token || 'Calculated from identifier, browser, and device';
}

function buildGeneratorEmailPreview({
  batchId = '{batchid}',
  rowNumber = '{rowNumber}'
} = {}) {
  const identifierToken = getGeneratorIdentifierToken();
  const identifierPart = identifierToken || '{identifier}';
  return `embtest.${identifierPart}.${batchId}.r${rowNumber}@asu.edu`;
}

function updateGeneratorEmailPreview() {
  if (!generatorEmailPreviewEl) return;
  generatorEmailPreviewEl.textContent = buildGeneratorEmailPreview();
}

function updateGeneratorSelectionStyles() {
  document.querySelectorAll('[data-generator-card]').forEach((card) => {
    const checkbox = card.querySelector('.generator-toggle-input');
    card.classList.toggle('selected', Boolean(checkbox?.checked));
  });

  const phoneEnabled = Boolean(generatorPhoneCheckbox?.checked);
  generatorPhoneFormatRadios.forEach((radio) => {
    radio.disabled = !phoneEnabled;
  });

  if (generatorFirstNameValueInput) {
    generatorFirstNameValueInput.disabled = !generatorFirstNameCheckbox?.checked;
  }

  if (generatorLastNameValueInput) {
    generatorLastNameValueInput.disabled = !generatorLastNameCheckbox?.checked;
  }

  if (generatorEmailPreviewEl) {
    generatorEmailPreviewEl.classList.toggle('disabled', !generatorEmailCheckbox?.checked);
  }
}

function buildSyntheticPhoneDetails(format) {
  const randomDigit = () => Math.floor(Math.random() * 10);
  const randomBlock = (size) => Array.from({ length: size }, randomDigit).join('');
  const randomItem = (items) => items[Math.floor(Math.random() * items.length)];

  if (format === 'us') {
    return {
      country: 'US',
      number: `(${200 + Math.floor(Math.random() * 700)}) ${randomBlock(3)}-${randomBlock(4)}`
    };
  }

  if (format === 'india') {
    return {
      country: 'India',
      number: `+91 ${randomBlock(5)} ${randomBlock(5)}`
    };
  }

  const countryFormats = [
    { country: 'United Kingdom', code: '+44', pattern: `7${randomBlock(3)} ${randomBlock(6)}` },
    { country: 'Australia', code: '+61', pattern: `4${randomBlock(2)} ${randomBlock(3)} ${randomBlock(3)}` },
    { country: 'Germany', code: '+49', pattern: `15${randomBlock(2)} ${randomBlock(7)}` },
    { country: 'France', code: '+33', pattern: `6 ${randomBlock(2)} ${randomBlock(2)} ${randomBlock(2)} ${randomBlock(2)}` },
    { country: 'Canada', code: '+1', pattern: `(${200 + Math.floor(Math.random() * 700)}) ${randomBlock(3)}-${randomBlock(4)}` }
  ];
  const selectedFormat = randomItem(countryFormats);
  return {
    country: selectedFormat.country,
    number: `${selectedFormat.code} ${selectedFormat.pattern}`
  };
}

function buildSyntheticTestRecord(options = {}) {
  const now = options.date instanceof Date ? options.date : new Date();
  const batchId = sanitizeGeneratorToken(options.batchId || buildGeneratorBatchId(now)) || buildGeneratorBatchId(now);
  const rowNumber = Number.isInteger(options.rowNumber) && options.rowNumber > 0 ? options.rowNumber : 1;
  const identifier = (generatorIdentifierInput?.value || '').trim() || `ID_${1000 + Math.floor(Math.random() * 9000)}`;
  const browser = (generatorBrowserInput?.value || '').trim() || 'Chrome';
  const device = (generatorDeviceInput?.value || '').trim() || 'Desktop';
  const identifierData = [
    sanitizeGeneratorToken(identifier),
    sanitizeGeneratorToken(browser),
    sanitizeGeneratorToken(device)
  ].filter(Boolean).join('.');
  const url = (generatorUrlInput?.value || '').trim() || 'https://asuonline.asu.edu/';
  const timestampDisplay = formatGeneratorTimestampDisplay(now);
  const record = {
    'Created Date': formatDateDisplay(now),
    'ASUO Origin URL': url,
    Identifier: identifier,
    Browser: browser,
    Device: device,
    'Batch ID': batchId,
    'Row Number': rowNumber,
    'Identifier Data': identifierData,
    'Timestamp (UTC)': timestampDisplay
  };

  if (generatorFirstNameCheckbox?.checked) {
    record['First Name'] = (generatorFirstNameValueInput?.value || '').trim() || 'Embtest';
  }

  if (generatorLastNameCheckbox?.checked) {
    record['Last Name'] = (generatorLastNameValueInput?.value || '').trim() || 'Embtest';
  }

  if (generatorPhoneCheckbox?.checked) {
    const selectedPhoneFormat = generatorPhoneFormatRadios.find((radio) => radio.checked)?.value || 'international';
    const phoneDetails = buildSyntheticPhoneDetails(selectedPhoneFormat);
    record['Phone Country'] = phoneDetails.country;
    record['Phone Number'] = phoneDetails.number;
  }

  if (generatorEmailCheckbox?.checked) {
    record.Email = buildGeneratorEmailPreview({
      batchId,
      rowNumber
    });
  }

  return record;
}

function renderGeneratedTestData(record) {
  if (!generatorResultsPanel || !generatorResultsBody) return;

  const cells = [
    record['ASUO Origin URL'] || '-',
    record['Identifier Data'] || '-',
    record['First Name'] || '-',
    record['Last Name'] || '-',
    record['Phone Country'] || '-',
    record['Phone Number'] || '-',
    record.Email || '-'
  ].map((value) => `<td>${escapeHtml(value)}</td>`).join('');

  generatorResultsBody.innerHTML = `<tr>${cells}</tr>`;
  generatorResultsPanel.hidden = false;
}

function renderGeneratedBatchData(records) {
  if (!generatorResultsPanel || !generatorResultsBody) return;

  const rows = records.map((record) => {
    const cells = [
      record['ASUO Origin URL'] || '-',
      record['Identifier Data'] || '-',
      record['First Name'] || '-',
      record['Last Name'] || '-',
      record['Phone Country'] || '-',
      record['Phone Number'] || '-',
      record.Email || '-'
    ].map((value) => `<td>${escapeHtml(value)}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  generatorResultsBody.innerHTML = rows;
  generatorResultsPanel.hidden = false;
}

function downloadGeneratedTestData(record) {
  const blob = new Blob([JSON.stringify(record, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const identifierToken = sanitizeGeneratorToken(record.Identifier || 'generated-record') || 'generated-record';
  const batchToken = sanitizeGeneratorToken(record['Batch ID'] || 'batch');
  const rowToken = Number.isInteger(record['Row Number']) ? record['Row Number'] : '1';
  link.href = url;
  link.download = `${identifierToken}-${batchToken}-r${rowToken}-synthetic-test-data.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function downloadBatchTestData(records) {
  const blob = new Blob([JSON.stringify(records, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const identifierToken = sanitizeGeneratorToken(records[0]?.Identifier || 'generated-records') || 'generated-records';
  const batchToken = sanitizeGeneratorToken(records[0]?.['Batch ID'] || 'batch');
  link.href = url;
  link.download = `${identifierToken}-${batchToken}-batch-${records.length}x-synthetic-test-data.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
  } catch (error) {
    return 'light';
  }
}

function setAppearancePanelOpen(isOpen) {
  if (!appearanceButton || !appearancePanel) return;
  appearancePanel.hidden = !isOpen;
  appearanceButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function syncThemeOptions(theme) {
  appearanceOptions.forEach((option) => {
    const active = option.dataset.themeOption === theme;
    option.classList.toggle('active', active);
    option.setAttribute('aria-checked', active ? 'true' : 'false');
  });
}

function applyTheme(theme) {
  const requestedTheme = theme === 'funky' ? 'asu' : theme;
  const nextTheme = ['light', 'dark', 'retro', 'vintage', 'asu'].includes(requestedTheme) ? requestedTheme : 'light';
  document.body.dataset.theme = nextTheme;
  syncThemeOptions(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    // Ignore storage failures and keep the in-memory theme.
  }
}

function getMeaningfulRfiCount() {
  return buildRfiObjects().filter(hasMeaningfulSubmissionData).length;
}

function getFilteredPreviewRecords() {
  const query = normalizeValue(previewSearchQuery);
  if (!query) return parsedRecords;

  return parsedRecords.filter((record) => {
    const searchableValues = [
      Object.keys(record).join(', '),
      Object.values(record).join(' ')
    ];
    return searchableValues.some((value) => normalizeValue(value).includes(query));
  });
}

function getPreviewColumns(records) {
  const columns = [];
  const seen = new Set();

  records.forEach((record) => {
    Object.keys(record).forEach((key) => {
      if (seen.has(key)) return;
      seen.add(key);
      columns.push(key);
    });
  });

  return columns;
}

function getSubmissionValues(card) {
  return expectedFields.reduce((values, field) => {
    const input = card.querySelector(`[data-field="${field}"]`);
    if (!input) {
      values[field] = '';
      return values;
    }

    values[field] = getInputValueForField(field, input);
    return values;
  }, {});
}

function normalizeCreatedDateInputValue(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';

  const displayValue = formatDateDisplay(raw);
  return displayValue || raw;
}

function getInputValueForField(field, input) {
  if (field === 'Military Service') {
    return input.checked ? 'true' : '';
  }

  if (field === 'Created Date') {
    return normalizeCreatedDateInputValue(input.value);
  }

  return input.value || '';
}

function validateRfiRowLimit(nextRowCount) {
  if (nextRowCount > RFI_ROW_LIMIT) {
    throw new Error(`The RFI table contains ${nextRowCount} row(s), which exceeds the ${RFI_ROW_LIMIT}-row limit.`);
  }
}

function getReplaceableSingleEmptySubmissionCard() {
  const cards = getSubmissionCards();
  if (cards.length !== 1) return null;

  const [card] = cards;
  return hasMeaningfulSubmissionData(getSubmissionValues(card)) ? null : card;
}

function setPreviewValidationState(label, toneClass) {
  previewReadyStateEl.textContent = label;
  previewReadyStateEl.className = `validation-badge ${toneClass}`;
}

function setAppView(view) {
  const nextView = ['dashboard', 'rfi-inputs', 'salesforce-records', 'test-data-generator', 'history', 'profile'].includes(view)
    ? view
    : 'dashboard';
  dashboardView.hidden = nextView !== 'dashboard';
  rfiInputsView.hidden = nextView !== 'rfi-inputs';
  if (testDataGeneratorView) {
    testDataGeneratorView.hidden = nextView !== 'test-data-generator';
  }
  historyView.hidden = nextView !== 'history';
  salesforceRecordsView.hidden = nextView !== 'salesforce-records';
  if (profileView) {
    profileView.hidden = nextView !== 'profile';
  }

  topbarViewLinks.forEach((link) => {
    const active = link.dataset.view === nextView;
    link.classList.toggle('active', active);

    if (active) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

function deriveAvatarInitials(name) {
  const parts = String(name || '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (!parts.length) return 'U';
  return parts.map((part) => part.charAt(0)).join('').toUpperCase();
}

function normalizeAvatarInitials(value, fallbackName = '') {
  const normalized = String(value || '')
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, 2);

  return normalized || deriveAvatarInitials(fallbackName);
}

function getDefaultProfile() {
  return {
    name: topbarUserNameEl?.textContent?.trim() || 'Current User',
    role: topbarUserRoleEl?.textContent?.trim() || 'Admin',
    avatar: topbarAvatarEl?.textContent?.trim() || '',
    identifier: ''
  };
}

function getStoredProfile() {
  try {
    const rawProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!rawProfile) return null;

    const parsedProfile = JSON.parse(rawProfile);
    if (!parsedProfile || typeof parsedProfile !== 'object') return null;

    return {
      name: String(parsedProfile.name || '').trim(),
      role: String(parsedProfile.role || '').trim(),
      avatar: String(parsedProfile.avatar || '').trim(),
      identifier: String(parsedProfile.identifier || '').trim()
    };
  } catch (error) {
    return null;
  }
}

function storeProfile(profile) {
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
  } catch (error) {
    // Ignore storage failures and keep the in-memory profile.
  }
}

function renderProfile(profile) {
  const nextName = String(profile?.name || '').trim() || 'Current User';
  const nextRole = String(profile?.role || '').trim() || 'Admin';
  const rawAvatar = String(profile?.avatar || '').trim();
  const nextAvatar = normalizeAvatarInitials(rawAvatar, nextName);
  const nextIdentifier = String(profile?.identifier || '').trim();

  if (topbarUserNameEl) topbarUserNameEl.textContent = nextName;
  if (topbarUserRoleEl) topbarUserRoleEl.textContent = nextRole;
  if (topbarAvatarEl) topbarAvatarEl.textContent = nextAvatar;

  if (profileNameInput) profileNameInput.value = nextName;
  if (profileRoleInput) profileRoleInput.value = nextRole;
  if (profileAvatarInput) profileAvatarInput.value = rawAvatar.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 2);
  if (profileIdentifierInput) profileIdentifierInput.value = nextIdentifier;

  if (profilePreviewNameEl) profilePreviewNameEl.textContent = nextName;
  if (profilePreviewRoleEl) profilePreviewRoleEl.textContent = nextRole;
  if (profilePreviewAvatarEl) profilePreviewAvatarEl.textContent = nextAvatar;
}

function getProfileFromInputs() {
  return {
    name: String(profileNameInput?.value || '').trim(),
    role: String(profileRoleInput?.value || '').trim(),
    avatar: String(profileAvatarInput?.value || '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 2),
    identifier: String(profileIdentifierInput?.value || '').trim()
  };
}

function formatRunDate(date) {
  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

function getCurrentUserLabel() {
  const currentName = topbarUserNameEl?.textContent?.trim();
  if (currentName) return currentName;

  const initial = topbarAvatarEl?.textContent?.trim();
  return initial ? `User ${initial}` : 'Current user';
}

function getHistoryStatusTone(status) {
  if (status === 'Compared') return 'success-badge';
  if (status === 'Compared with warnings') return 'warning-badge';
  return 'neutral-badge';
}

function buildRecentActivitySummary(entry) {
  const rfiLabel = entry.rfiCount === 1 ? 'RFI' : 'RFIs';
  const salesforceLabel = entry.importedRows === 1 ? 'Salesforce record' : 'Salesforce records';
  return `Compared ${entry.rfiCount} ${rfiLabel} against ${entry.importedRows} ${salesforceLabel}`;
}

function getUnreadNotificationCount() {
  return historyEntries.filter((entry) => entry.isUnread).length;
}

function markNotificationsRead(entryIds = historyEntries.map((entry) => entry.id)) {
  const unreadIds = new Set(entryIds);
  let changed = false;

  historyEntries.forEach((entry) => {
    if (!entry.isUnread || !unreadIds.has(entry.id)) return;
    entry.isUnread = false;
    changed = true;
  });

  if (changed) {
    renderNotifications();
  }
}

function setNotificationsPanelOpen(isOpen) {
  if (!notificationsButton || !notificationsPanel) return;
  notificationsPanel.hidden = !isOpen;
  notificationsButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

  if (isOpen) {
    markNotificationsRead();
  }
}

function renderNotifications() {
  if (!notificationsListEl || !notificationsBadgeEl) return;

  const unreadCount = getUnreadNotificationCount();
  notificationsBadgeEl.textContent = unreadCount > 9 ? '9+' : String(unreadCount);
  notificationsBadgeEl.hidden = unreadCount === 0;

  if (!historyEntries.length) {
    notificationsListEl.innerHTML = '<p class="notifications-empty">Recent comparison activity will appear here.</p>';
    return;
  }

  notificationsListEl.innerHTML = historyEntries.slice(0, 5).map((entry) => `
    <button class="notification-item" type="button" data-notification-history-id="${entry.id}">
      <span class="notification-item-title">${escapeHtml(buildRecentActivitySummary(entry))}</span>
      <span class="notification-item-meta">${escapeHtml(entry.runDateLabel)}</span>
    </button>
  `).join('');
}

function openHistoryEntry(entry, statusMessage = `Opened history entry from ${entry.runDateLabel}.`) {
  comparisonResults = entry.results.slice();
  resultsSearchQuery = '';
  renderResults(comparisonResults);
  downloadButton.disabled = false;
  statusEl.textContent = statusMessage;
  setNotificationsPanelOpen(false);
  setAppView('dashboard');
  resultsCard.focus({ preventScroll: true });
  resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHistory() {
  if (!historyEntries.length) {
    historyEntriesEl.innerHTML = `
      <tr>
        <td colspan="9" class="history-empty-row">No validation runs yet. Run a comparison from Dashboard to populate history.</td>
      </tr>
    `;
    return;
  }

  historyEntriesEl.innerHTML = historyEntries.map((entry) => `
    <tr>
      <td>${escapeHtml(entry.runDateLabel)}</td>
      <td>${escapeHtml(entry.exportFile)}</td>
      <td>${escapeHtml(String(entry.rfiCount))}</td>
      <td>${escapeHtml(String(entry.importedRows))}</td>
      <td>${escapeHtml(entry.recognizedFields)}</td>
      <td>${escapeHtml(entry.matchSummary)}</td>
      <td><span class="validation-badge ${entry.statusTone}">${escapeHtml(entry.status)}</span></td>
      <td>${escapeHtml(entry.user)}</td>
      <td>
        <div class="history-action-group">
          <button class="ghost-button history-action-button" type="button" data-history-action="view" data-history-id="${entry.id}">View results</button>
          <button class="secondary-button history-action-button" type="button" data-history-action="download" data-history-id="${entry.id}">Download CSV</button>
        </div>
      </td>
    </tr>
  `).join('');
}

function recordHistoryRun(results, rfiCount) {
  const exactMatchCount = results.filter((result) => result.status === 'Exact match').length;
  const partialMatchCount = results.filter((result) => result.status === 'Partial match').length;
  const noMatchCount = results.filter((result) => result.status === 'No match').length;
  const status = fileDiagnostics.missingFields.length ? 'Compared with warnings' : 'Compared';

  historyEntryCounter += 1;
  historyEntries.unshift({
    id: String(historyEntryCounter),
    runDateLabel: formatRunDate(new Date()),
    exportFile: currentPreviewFileName || 'Untitled export',
    rfiCount,
    importedRows: parsedRecords.length,
    recognizedFields: `${fileDiagnostics.recognizedFields} / ${expectedFields.length}`,
    matchSummary: `${exactMatchCount} exact, ${partialMatchCount} partial, ${noMatchCount} no match`,
    status,
    statusTone: getHistoryStatusTone(status),
    isUnread: true,
    user: getCurrentUserLabel(),
    results: results.slice()
  });

  renderHistory();
  renderNotifications();
}

function setRfiInputMode(mode) {
  if (!manualRfiPanel) return;

  const manualActive = mode === 'manual';
  manualRfiPanel.hidden = !manualActive;
  manualRfiPanel.classList.toggle('active', manualActive);
}

function updatePreviewToggleLabel() {
  if (!previewToggleLabelEl || !previewPanel) return;
  previewToggleLabelEl.textContent = previewPanel.open
    ? 'Collapse full Interaction data'
    : 'Expand for full Interaction data';
}

function updateWorkflowSummary() {
  const meaningfulRfiCount = getMeaningfulRfiCount();
  const readyLabel = `${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'}`;

  if (!parsedRecords.length) {
    if (!meaningfulRfiCount) {
      workflowSummaryEl.textContent = 'Import RFI bulk data or enter at least one row in RFI Inputs, then upload a Salesforce export to enable comparison.';
      return;
    }

    workflowSummaryEl.textContent = `${readyLabel} ready. Upload a Salesforce export on Dashboard to enable comparison.`;
    return;
  }

  if (!meaningfulRfiCount) {
    workflowSummaryEl.textContent = `${parsedRecords.length} Salesforce records loaded. Import RFI bulk data or enter at least one row in RFI Inputs to enable comparison.`;
    return;
  }

  if (fileDiagnostics.recognizedFields === 0) {
    workflowSummaryEl.textContent = `The uploaded file contains ${parsedRecords.length} record(s), but none of the expected comparison fields were recognized.`;
    return;
  }

  if (fileDiagnostics.missingFields.length) {
    workflowSummaryEl.textContent = `${readyLabel} ready. ${parsedRecords.length} Salesforce records loaded with ${fileDiagnostics.missingFields.length} missing expected field(s), so comparison will run with partial validation.`;
    return;
  }

  workflowSummaryEl.textContent = `${readyLabel} ready. ${parsedRecords.length} Salesforce records validated and ready to compare.`;
}

function updateCompareButtonState() {
  const comparisonReady = parsedRecords.length > 0
    && fileDiagnostics.recognizedFields > 0
    && getMeaningfulRfiCount() > 0;

  compareButton.disabled = !comparisonReady;
}

function updateExportPreview({ fileName, fileType, status } = {}) {
  if (typeof fileName === 'string') currentPreviewFileName = fileName;
  if (typeof fileType === 'string') currentPreviewFileType = fileType;
  if (typeof status === 'string') currentPreviewStatus = status;

  updateCompareButtonState();

  previewFileNameEl.textContent = currentPreviewFileName || 'No file chosen';
  previewFileNameEl.title = currentPreviewFileName || 'No file chosen';
  previewFileTypeEl.textContent = currentPreviewFileType;
  previewRecordCountEl.textContent = String(parsedRecords.length);
  previewRecognizedFieldsEl.textContent = `${fileDiagnostics.recognizedFields} / ${expectedFields.length}`;
  previewRfiCountEl.textContent = String(getMeaningfulRfiCount());
  previewMissingFieldsEl.textContent = String(fileDiagnostics.missingFields.length);
  previewRowCountEl.textContent = `${getFilteredPreviewRecords().length} / ${parsedRecords.length}`;

  if (!parsedRecords.length) {
    setPreviewValidationState(currentPreviewStatus, 'neutral-badge');
    previewDiagnosticsNoteEl.textContent = 'Upload a Salesforce export to review imported records before comparing.';
    updateWorkflowSummary();
    return;
  }

  if (fileDiagnostics.recognizedFields === 0) {
    setPreviewValidationState('Missing fields', 'error-badge');
    previewDiagnosticsNoteEl.textContent = 'No expected Salesforce comparison fields were recognized in the uploaded file.';
    updateWorkflowSummary();
    return;
  }

  if (fileDiagnostics.missingFields.length) {
    setPreviewValidationState('Ready with warnings', 'warning-badge');
    previewDiagnosticsNoteEl.textContent = `Missing expected fields: ${fileDiagnostics.missingFields.join(', ')}.`;
    updateWorkflowSummary();
    return;
  }

  setPreviewValidationState(currentPreviewStatus, 'success-badge');
  previewDiagnosticsNoteEl.textContent = `All ${expectedFields.length} expected comparison fields were recognized.`;
  updateWorkflowSummary();
}

function updateSubmissionControls() {
  const cards = getSubmissionCards();

  cards.forEach((card, index) => {
    const numberCell = card.querySelector('.submission-number');
    const removeButton = card.querySelector('.remove-submission-button');

    numberCell.textContent = `#${index + 1}`;
    removeButton.disabled = cards.length === 1;
  });

  updateExportPreview();
}

function refreshComparisonStateAfterRfiUpdate(message) {
  updateSubmissionControls();
  if (!parsedRecords.length) return;
  resetResults();
  statusEl.textContent = message;
}

function resetExportState(statusMessage = 'Salesforce export reset. Upload a new file to continue.') {
  parsedRecords = [];
  fileDiagnostics = getEmptyFileDiagnostics();
  currentPreviewFileName = '';
  currentPreviewFileType = '—';
  previewSearchQuery = '';
  fileInput.value = '';
  compareButton.disabled = true;
  renderPreview([]);
  resetResults();
  updateExportPreview({ status: 'Inactive' });
  statusEl.textContent = statusMessage;
}

function resetWorkingRfiState(statusMessage = 'Cleared all RFI rows. Start with a fresh submission or import new CSV rows.') {
  submissionsContainer.innerHTML = '';
  submissionCounter = 0;
  createSubmissionCard({}, null, { skipLimit: true });
  rfiCsvInput.value = '';

  if (rfiCsvPasteInput) {
    rfiCsvPasteInput.value = '';
  }

  rfiImportStatusEl.textContent = statusMessage;
}

function resetAllWorkingData() {
  resetExportState('');
  resetWorkingRfiState('Cleared current working data. History remains available.');
  statusEl.textContent = 'Cleared all current working data. History is unchanged.';
  updateExportPreview({ status: 'Inactive' });
}

function createSubmissionCard(values = {}, insertAfterCard = null, { skipLimit = false } = {}) {
  if (!skipLimit) {
    validateRfiRowLimit(getCurrentRfiRowCount() + 1);
  }

  submissionCounter += 1;

  const fragment = submissionTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.submission-row');
  card.dataset.submissionId = String(submissionCounter);

  expectedFields.forEach((field) => {
    const input = card.querySelector(`[data-field="${field}"]`);
    if (!input) return;

    if (field === 'Created Date') {
      input.value = normalizeCreatedDateInputValue(values[field]);
      return;
    }

    if (field === 'Military Service') {
      input.checked = normalizeMilitaryStatus(values[field]) === 'true';
      return;
    }

    input.value = values[field] || '';
  });

  const removeButton = card.querySelector('.remove-submission-button');
  const duplicateButton = card.querySelector('.duplicate-submission-button');

  duplicateButton.addEventListener('click', () => {
    try {
      createSubmissionCard(getSubmissionValues(card), card);
    } catch (error) {
      statusEl.textContent = error.message;
      return;
    }

    if (parsedRecords.length) {
      resetResults();
      statusEl.textContent = 'Duplicated an RFI submission. Compare again when ready.';
    }
  });

  removeButton.addEventListener('click', () => {
    if (getSubmissionCards().length === 1) return;
    card.remove();
    updateSubmissionControls();
    if (parsedRecords.length) {
      resetResults();
      statusEl.textContent = 'RFI submissions updated. Compare again to refresh results.';
    }
  });

  if (insertAfterCard && insertAfterCard.nextSibling) {
    submissionsContainer.insertBefore(card, insertAfterCard.nextSibling);
  } else if (insertAfterCard) {
    submissionsContainer.appendChild(card);
  } else {
    submissionsContainer.appendChild(card);
  }

  updateSubmissionControls();
}

function replaceSingleEmptySubmissionCard(record) {
  const card = getReplaceableSingleEmptySubmissionCard();
  if (!card) return false;

  expectedFields.forEach((field) => {
    const input = card.querySelector(`[data-field="${field}"]`);
    if (!input) return;

    if (field === 'Created Date') {
      input.value = normalizeCreatedDateInputValue(record[field]);
      return;
    }

    if (field === 'Military Service') {
      input.checked = normalizeMilitaryStatus(record[field]) === 'true';
      return;
    }

    input.value = record[field] || '';
  });

  updateSubmissionControls();
  return true;
}

function appendImportedRfiRecords(records, sourceLabel) {
  if (!records.length) {
    throw new Error('No RFI rows were found to import.');
  }

  const validRecords = records
    .map((record) => buildSubmissionValuesFromRecord(record))
    .filter((record) => expectedFields.some((field) => String(record[field] || '').trim() !== ''));

  if (!validRecords.length) {
    throw new Error('The provided CSV did not include any usable RFI rows.');
  }

  const nextRowCount = getReplaceableSingleEmptySubmissionCard()
    ? validRecords.length
    : getCurrentRfiRowCount() + validRecords.length;
  validateRfiRowLimit(nextRowCount);

  const [firstRecord, ...remainingRecords] = validRecords;
  const replacedExistingBlankRow = replaceSingleEmptySubmissionCard(firstRecord);

  if (!replacedExistingBlankRow) {
    createSubmissionCard(firstRecord);
  }

  remainingRecords.forEach((record) => createSubmissionCard(record));
  rfiImportStatusEl.textContent = `Imported ${validRecords.length} RFI row${validRecords.length === 1 ? '' : 's'} from ${sourceLabel}.`;
  refreshComparisonStateAfterRfiUpdate('RFI submissions imported. Compare again when ready.');
}

function importRfiCsvText(text, sourceLabel) {
  const records = parseCsv(text).map(canonicalizeRecord);
  appendImportedRfiRecords(records, sourceLabel);
}

function handleRfiCsvFile(file) {
  const extension = file.name.split('.').pop().toLowerCase();
  if (extension !== 'csv') {
    rfiImportStatusEl.textContent = 'Only CSV files can be imported into the RFI table.';
    return;
  }

  const reader = new FileReader();
  rfiImportStatusEl.textContent = `Importing ${file.name}...`;

  reader.onload = (event) => {
    try {
      importRfiCsvText(event.target.result, file.name);
      rfiCsvInput.value = '';
    } catch (error) {
      rfiImportStatusEl.textContent = `Unable to import ${file.name}: ${error.message}`;
    }
  };

  reader.readAsText(file);
}

function buildRfiObjects() {
  return getSubmissionCards().map((card, index) => {
    const rfi = { submissionNumber: index + 1 };

    expectedFields.forEach((field) => {
      const input = card.querySelector(`[data-field="${field}"]`);
      if (!input) {
        rfi[field] = '';
        return;
      }

      rfi[field] = getInputValueForField(field, input);
    });

    return rfi;
  });
}

function renderPreviewEmptyState(container, message = 'Import a Salesforce file above to view the record grid') {
  container.innerHTML = `
    <div class="preview-empty-state">
      <div class="preview-empty-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24">
          <path d="M12 4c-4.42 0-8 1.34-8 3v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7c0-1.66-3.58-3-8-3Zm0 2c3.78 0 6 .99 6 1s-2.22 1-6 1-6-.99-6-1 2.22-1 6-1Zm0 12c-3.78 0-6-.99-6-1v-2.03c1.45.68 3.6 1.03 6 1.03s4.55-.35 6-1.03V17c0 .01-2.22 1-6 1Zm0-4c-3.78 0-6-.99-6-1v-2.03c1.45.68 3.6 1.03 6 1.03s4.55-.35 6-1.03V13c0 .01-2.22 1-6 1Z" fill="currentColor"/>
        </svg>
      </div>
      <p>${escapeHtml(message)}</p>
    </div>
  `;
}

function renderPreviewMessage(message) {
  previewBodyContainers.forEach((container) => {
    container.innerHTML = `<p class="preview-inline-message">${escapeHtml(message)}</p>`;
  });
}

function buildPreviewMarkup(records, searchInputId) {
  const filteredRecords = getFilteredPreviewRecords();
  const columns = getPreviewColumns(records);
  const header = columns.map((col) => `<th>${escapeHtml(col)}</th>`).join('');
  const rows = filteredRecords.map((record) => {
    const cells = columns.map((field) => `<td>${escapeHtml(displayFieldValue(record, field) || '-')}</td>`).join('');
    return `<tr>${cells}</tr>`;
  }).join('');

  const emptySearchState = `
    <tr>
      <td colspan="${columns.length}" class="preview-empty-row">No imported Salesforce records match that search.</td>
    </tr>
  `;

  return `
    <div class="preview-toolbar">
      <div class="preview-toolbar-copy">
        <strong>Imported Salesforce records</strong>
        <span>Showing ${filteredRecords.length} of ${records.length} imported row${records.length === 1 ? '' : 's'}</span>
      </div>
      <label class="preview-search-field" for="${searchInputId}">
        <span class="preview-search-label">Search records</span>
        <input
          type="search"
          id="${searchInputId}"
          class="preview-search-input"
          placeholder="Search imported values or field names"
          value="${escapeHtml(previewSearchQuery)}"
        />
      </label>
    </div>
    <div class="table-shell">
      <table>
        <thead><tr>${header}</tr></thead>
        <tbody>${rows || emptySearchState}</tbody>
      </table>
    </div>
    <p>This table shows every detected imported column from the uploaded file.</p>
  `;
}

function renderPreview(records) {
  if (!records.length) {
    previewBodyContainers.forEach((container) => renderPreviewEmptyState(container));
    return;
  }

  if (previewContainer) {
    previewContainer.innerHTML = buildPreviewMarkup(records, 'validation-preview-search-input');
  }

  if (salesforceRecordsContainer) {
    salesforceRecordsContainer.innerHTML = buildPreviewMarkup(records, 'salesforce-records-search-input');
  }

  updateExportPreview();
}

function renderResults(results) {
  const exactMatchCount = results.filter((result) => result.status === 'Exact match').length;
  const partialMatchCount = results.filter((result) => result.status === 'Partial match').length;
  const noMatchCount = results.filter((result) => result.status === 'No match').length;
  const reviewCount = partialMatchCount + noMatchCount;
  const comparedRfiCount = new Set(results.map((r) => r.submissionNumber)).size;
  const filteredResults = sortResults(results).filter((result) => {
    const query = normalizeValue(resultsSearchQuery);
    if (!query) return true;

    const row = result.record || {};
    const searchableValues = [
      result.submissionNumber,
      result.status,
      result.statusDetail,
      ...result.matchedFields,
      ...result.reviewReasons,
      findField(row, 'First Name'),
      findField(row, 'Last Name'),
      findField(row, 'Email'),
      findField(row, 'Created Date'),
      result.rfi['First Name'],
      result.rfi['Last Name'],
      result.rfi['Email'],
      result.rfi['Created Date']
    ];

    return searchableValues.some((value) => normalizeValue(value).includes(query));
  });
  const showingCount = filteredResults.length;
  const totalPages = Math.max(1, Math.ceil(Math.max(showingCount, 1) / 10));

  const summary = `
    <div class="results-summary-grid">
      <article class="result-stat-card exact-card">
        <div class="result-stat-icon" aria-hidden="true">✓</div>
        <div class="result-stat-content">
          <strong>${exactMatchCount}</strong>
          <h3>Exact match</h3>
          <p>Fields align perfectly with Salesforce records.</p>
        </div>
      </article>
      <article class="result-stat-card partial-card">
        <div class="result-stat-icon" aria-hidden="true">!</div>
        <div class="result-stat-content">
          <strong>${partialMatchCount}</strong>
          <h3>Partial match</h3>
          <p>Some discrepancies were found in non-critical fields.</p>
        </div>
      </article>
      <article class="result-stat-card no-match-card">
        <div class="result-stat-icon" aria-hidden="true">×</div>
        <div class="result-stat-content">
          <strong>${noMatchCount}</strong>
          <h3>No match</h3>
          <p>Record does not exist in the current dataset.</p>
        </div>
      </article>
    </div>
    <section class="results-table-panel">
      <div class="results-panel-header">
        <div>
          <h2>Comparison Results</h2>
          <div class="results-tabs">
            <span class="results-tab active">${exactMatchCount} matched records</span>
            <span class="results-tab">${reviewCount} records requiring review</span>
            <span class="results-tab">${comparedRfiCount} RFI submissions</span>
          </div>
        </div>
        <div class="results-controls">
          <label class="results-search" for="results-search-input">
            <span class="results-search-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M10 4a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0-2a8 8 0 1 0 4.9 14.33l4.38 4.38 1.42-1.42-4.38-4.38A8 8 0 0 0 10 2Z" fill="currentColor" />
              </svg>
            </span>
            <input
              id="results-search-input"
              class="results-search-input"
              type="search"
              placeholder="Search records..."
              value="${escapeHtml(resultsSearchQuery)}"
            />
          </label>
          <button class="results-filter-button" type="button" aria-label="Filter results">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16v2H4V6Zm3 5h10v2H7v-2Zm3 5h4v2h-4v-2Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
  `;

  if (!results.length) {
    resultsContainer.innerHTML = `
      ${summary}
      <div class="results-panel-empty">
        <p>Upload a Salesforce export, import RFI bulk data or prepare manual rows, and run a comparison to review exact matches, partial matches, and gaps.</p>
      </div>
      <div class="results-panel-footer">
        <p>Showing 0 of 0 results</p>
        <div class="results-pagination">
          <span class="results-chevron" aria-hidden="true">‹</span>
          <span class="results-page-chip active">1</span>
          <span class="results-chevron" aria-hidden="true">›</span>
        </div>
      </div>
    </section>
    `;
    return;
  }

  if (!filteredResults.length) {
    resultsContainer.innerHTML = `
      ${summary}
      <div class="results-panel-empty">
        <p>No comparison results match that search.</p>
      </div>
      <div class="results-panel-footer">
        <p>Showing 0 of ${results.length} results</p>
        <div class="results-pagination">
          <span class="results-chevron" aria-hidden="true">‹</span>
          <span class="results-page-chip active">1</span>
          <span class="results-chevron" aria-hidden="true">›</span>
        </div>
      </div>
    </section>
    `;
    return;
  }

  const rows = filteredResults.map((result) => {
    const row = result.record || {};
    const statusClass = result.status === 'Exact match'
      ? 'match'
      : result.status === 'Partial match'
        ? 'partial'
        : 'nomatch';
    const firstName = findField(row, 'First Name') || result.rfi['First Name'] || '';
    const lastName = findField(row, 'Last Name') || result.rfi['Last Name'] || '';
    const interactionName = `${firstName} ${lastName}`.trim() || '-';
    const email = findField(row, 'Email') || result.rfi['Email'] || '-';
    const createdDate = displayFieldValue(row, 'Created Date') || displayFieldValue(result.rfi, 'Created Date') || '-';
    const asuoOrigin = findField(row, 'ASUO Origin URL') || result.rfi['ASUO Origin URL'] || '-';
    const reviewNotes = result.reviewReasons.length
      ? result.reviewReasons.join(' | ')
      : (result.matchedFields.length ? `Matched fields: ${result.matchedFields.join(', ')}` : result.statusDetail);
    const confidencePercent = Math.max(0, Math.min(100, Math.round(result.confidenceScore * 100)));
    const confidenceBucket = Math.round(confidencePercent / 5) * 5;
    const confidenceClass = `confidence-${Math.max(0, Math.min(100, confidenceBucket))}`;
    const badgeLabel = result.status.toUpperCase();

    return `
      <tr>
        <td class="results-rfi-number">${result.submissionNumber}</td>
        <td>
          <div class="result-name-cell">
            <strong>${escapeHtml(interactionName)}</strong>
            <span>${escapeHtml(reviewNotes)}</span>
          </div>
        </td>
        <td>${escapeHtml(email)}</td>
        <td>${escapeHtml(asuoOrigin)}</td>
        <td>${escapeHtml(createdDate)}</td>
        <td>
          <div class="result-confidence">
            <div class="result-confidence-track">
              <span class="result-confidence-bar ${confidenceClass}"></span>
            </div>
            <strong>${escapeHtml(`${confidencePercent}%`)}</strong>
          </div>
        </td>
        <td><span class="badge ${statusClass}">${escapeHtml(badgeLabel)}</span></td>
      </tr>
    `;
  }).join('');

  resultsContainer.innerHTML = `
    ${summary}
    <div class="results-table-wrap">
      <table class="results-table">
        <thead>
          <tr>
            <th>RFI #</th>
            <th>Interaction Name</th>
            <th>Email</th>
            <th>ASUO Origin</th>
            <th>Created</th>
            <th>Confidence</th>
            <th>Match Result</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="results-panel-footer">
      <p>Showing 1-${showingCount} of ${results.length} results</p>
      <div class="results-pagination">
        <span class="results-chevron" aria-hidden="true">‹</span>
        <span class="results-page-chip active">1</span>
        ${totalPages > 1 ? `<span class="results-page-chip">${totalPages}</span>` : ''}
        <span class="results-chevron" aria-hidden="true">›</span>
      </div>
    </div>
    </section>
  `;
}

function downloadCsv(results) {
  const rows = [[
    'RFI Submission #',
    'RFI Created Date',
    'RFI First Name',
    'RFI Last Name',
    'RFI Email',
    'RFI Phone Number',
    'RFI Military Service',
    'RFI ASUO Origin URL',
    'Salesforce Created Date',
    'Salesforce First Name',
    'Salesforce Last Name',
    'Salesforce Email',
    'Salesforce Phone Number',
    'Salesforce Military Service',
    'Salesforce ASUO Origin URL',
    'Matched Fields',
    'Fuzzy Matched Fields',
    'Confidence Score',
    'Review Notes',
    'Match Status'
  ]];

  sortResults(results).forEach((result) => {
    rows.push([
      result.submissionNumber,
      displayFieldValue(result.rfi, 'Created Date'),
      result.rfi['First Name'],
      result.rfi['Last Name'],
      result.rfi['Email'],
      result.rfi['Phone Number'],
      displayFieldValue(result.rfi, 'Military Service'),
      result.rfi['ASUO Origin URL'],
      displayFieldValue(result.record, 'Created Date'),
      findField(result.record, 'First Name'),
      findField(result.record, 'Last Name'),
      findField(result.record, 'Email'),
      findField(result.record, 'Phone Number'),
      displayFieldValue(result.record, 'Military Service'),
      findField(result.record, 'ASUO Origin URL'),
      result.matchedFields.join(', '),
      result.fuzzyMatchedFields.join(', '),
      `${Math.round(result.confidenceScore * 100)}%`,
      result.reviewReasons.join(' | ') || result.statusDetail,
      result.status
    ]);
  });

  const csvContent = rows.map((row) => row.map((cell) => `"${String(cell ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'rfi-validator-results.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function resetResults() {
  comparisonResults = [];
  resultsSearchQuery = '';
  renderResults([]);
  downloadButton.disabled = true;
}

function handleFileParse(file) {
  const reader = new FileReader();
  const extension = file.name.split('.').pop().toLowerCase();
  previewSearchQuery = '';
  updateExportPreview({
    fileName: file.name,
    fileType: extension.toUpperCase(),
    status: 'Parsing export'
  });

  reader.onload = (event) => {
    try {
      if (extension !== 'csv') {
        throw new Error('Only CSV exports are supported.');
      }

      parsedRecords = parseCsv(event.target.result);

      validateRecordCount(parsedRecords, EXPORT_ROW_LIMIT);
      fileDiagnostics = calculateFileDiagnostics(parsedRecords);

      if (!parsedRecords.length) {
        statusEl.textContent = 'No rows found in the uploaded file.';
        renderPreviewMessage('No imported rows found in the uploaded file.');
        resetResults();
        compareButton.disabled = true;
        updateExportPreview({ status: 'No rows found' });
        return;
      }

      renderPreview(parsedRecords);
      resetResults();
      compareButton.disabled = fileDiagnostics.recognizedFields === 0;

      if (fileDiagnostics.recognizedFields === 0) {
        statusEl.textContent = `Loaded ${parsedRecords.length} Salesforce record(s), but none of the expected fields were recognized.`;
        updateExportPreview({ status: 'Needs review' });
        return;
      }

      if (fileDiagnostics.missingFields.length) {
        statusEl.textContent = `Loaded ${parsedRecords.length} Salesforce record(s). Missing expected fields: ${fileDiagnostics.missingFields.join(', ')}.`;
        updateExportPreview({ status: 'Ready with warnings' });
        return;
      }

      if (getMeaningfulRfiCount()) {
        statusEl.textContent = `Loaded ${parsedRecords.length} Salesforce record(s). Ready to compare.`;
      } else {
        statusEl.textContent = `Loaded ${parsedRecords.length} Salesforce record(s). Add at least one RFI submission to enable comparison.`;
      }
      updateExportPreview({ status: 'Ready to compare' });
    } catch (error) {
      parsedRecords = [];
      fileDiagnostics = getEmptyFileDiagnostics();
      statusEl.textContent = `Error parsing file: ${error.message}`;
      renderPreviewMessage('Unable to display imported records from that file.');
      resetResults();
      compareButton.disabled = true;
      updateExportPreview({ status: 'Upload failed' });
    }
  };

  reader.readAsText(file);
}

fileInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    statusEl.textContent = 'Please select a file.';
    updateExportPreview({ status: parsedRecords.length ? currentPreviewStatus : 'Inactive' });
    return;
  }

  handleFileParse(file);
});

previewBodyContainers.forEach((container) => {
  container.addEventListener('input', (event) => {
    if (!event.target.classList.contains('preview-search-input')) return;
    previewSearchQuery = event.target.value;
    renderPreview(parsedRecords);
  });
});

addRfiButton.addEventListener('click', () => {
  try {
    createSubmissionCard();
  } catch (error) {
    statusEl.textContent = error.message;
    return;
  }

  if (parsedRecords.length) {
    resetResults();
    statusEl.textContent = 'Added a new RFI submission. Compare again when ready.';
  }
});

clearRfiTableButton.addEventListener('click', () => {
  resetWorkingRfiState();

  if (parsedRecords.length) {
    resetResults();
    statusEl.textContent = 'Cleared all RFI submissions. Compare again when ready.';
  }
});

rfiCsvInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) {
    rfiImportStatusEl.textContent = 'Choose a CSV file to import RFI rows.';
    return;
  }

  handleRfiCsvFile(file);
});

if (importRfiCsvButton && rfiCsvPasteInput) {
  importRfiCsvButton.addEventListener('click', () => {
    const text = rfiCsvPasteInput.value.trim();
    if (!text) {
      rfiImportStatusEl.textContent = 'Paste CSV text before importing.';
      return;
    }

    try {
      importRfiCsvText(text, 'pasted CSV');
    } catch (error) {
      rfiImportStatusEl.textContent = `Unable to import pasted CSV: ${error.message}`;
    }
  });
}

if (clearRfiCsvButton && rfiCsvPasteInput) {
  clearRfiCsvButton.addEventListener('click', () => {
    rfiCsvPasteInput.value = '';
    rfiCsvInput.value = '';
    rfiImportStatusEl.textContent = 'You can mix manual RFI rows with imported CSV rows in the same session.';
  });
}

submissionsContainer.addEventListener('input', () => {
  updateExportPreview();
  if (!comparisonResults.length) return;
  resetResults();
  statusEl.textContent = 'RFI submissions changed. Compare again to refresh results.';
});

submissionsContainer.addEventListener('focusout', (event) => {
  const createdDateInput = event.target.closest('input[data-field="Created Date"]');
  if (!createdDateInput || !submissionsContainer.contains(createdDateInput)) return;

  const normalizedValue = normalizeCreatedDateInputValue(createdDateInput.value);
  if (normalizedValue === createdDateInput.value) return;

  createdDateInput.value = normalizedValue;
  updateExportPreview();

  if (!comparisonResults.length) return;
  resetResults();
  statusEl.textContent = 'RFI submissions changed. Compare again to refresh results.';
});

submissionsContainer.addEventListener('change', () => {
  updateExportPreview();
  if (!comparisonResults.length) return;
  resetResults();
  statusEl.textContent = 'RFI submissions changed. Compare again to refresh results.';
});

if (generatorUrlInput) {
  generatorUrlInput.addEventListener('input', updateGeneratorEmailPreview);
}

if (generatorIdentifierInput) {
  generatorIdentifierInput.addEventListener('input', () => {
    updateGeneratorIdentifierData();
    updateGeneratorEmailPreview();
  });
}

[generatorFirstNameValueInput, generatorLastNameValueInput].forEach((input) => {
  if (!input) return;
  input.addEventListener('input', updateGeneratorEmailPreview);
});

[generatorBrowserInput, generatorDeviceInput].forEach((input) => {
  if (!input) return;
  input.addEventListener('input', () => {
    updateGeneratorIdentifierData();
    updateGeneratorEmailPreview();
  });
});

[generatorFirstNameCheckbox, generatorLastNameCheckbox, generatorPhoneCheckbox, generatorEmailCheckbox].forEach((input) => {
  if (!input) return;
  input.addEventListener('change', () => {
    updateGeneratorSelectionStyles();
    updateGeneratorEmailPreview();
  });
});

generatorPhoneFormatRadios.forEach((radio) => {
  radio.addEventListener('change', updateGeneratorEmailPreview);
});

if (generatorGenerateButton) {
  generatorGenerateButton.addEventListener('click', () => {
    const selectedFieldCount = [
      generatorFirstNameCheckbox?.checked,
      generatorLastNameCheckbox?.checked,
      generatorPhoneCheckbox?.checked,
      generatorEmailCheckbox?.checked
    ].filter(Boolean).length;

    if (!selectedFieldCount) {
      if (generatorStatusEl) {
        generatorStatusEl.textContent = 'Select at least one generated field before creating test data.';
      }
      return;
    }

    const batchId = buildGeneratorBatchId(new Date());
    const batchRecords = [];
    for (let i = 1; i <= generatorBatchCount; i++) {
      const record = buildSyntheticTestRecord({ rowNumber: i, batchId });
      batchRecords.push(record);
    }

    lastGeneratedTestData = batchRecords[0];
    lastGeneratedBatchData = batchRecords;
    if (generatorTimestampInput) {
      generatorTimestampInput.value = `Generated (UTC): ${lastGeneratedTestData['Timestamp (UTC)']}`;
    }

    if (generatorBatchCount === 1) {
      renderGeneratedTestData(batchRecords[0]);
      if (generatorResultsDescription) {
        generatorResultsDescription.textContent = 'The generated row is shown below.';
      }
    } else {
      renderGeneratedBatchData(batchRecords);
      if (generatorResultsDescription) {
        generatorResultsDescription.textContent = `${generatorBatchCount} generated rows are shown below.`;
      }
    }

    if (generatorDownloadButton) {
      generatorDownloadButton.disabled = false;
    }
    if (generatorInjectButton) {
      generatorInjectButton.disabled = false;
    }
    if (generatorStatusEl) {
      const recordCount = generatorBatchCount === 1 ? 'record' : `${generatorBatchCount} records`;
      generatorStatusEl.textContent = `Generated ${recordCount} for identifier ${lastGeneratedTestData.Identifier}.`;
    }
  });
}

function updateBatchCountDisplay() {
  if (generatorBatchCountDisplay) {
    generatorBatchCountDisplay.textContent = generatorBatchCount;
  }
  if (generatorBatchMinusButton) {
    generatorBatchMinusButton.disabled = generatorBatchCount <= 1;
  }
}

if (generatorBatchPlusButton) {
  generatorBatchPlusButton.addEventListener('click', () => {
    generatorBatchCount = Math.min(generatorBatchCount + 1, 500);
    updateBatchCountDisplay();
  });
}

if (generatorBatchMinusButton) {
  generatorBatchMinusButton.addEventListener('click', () => {
    generatorBatchCount = Math.max(generatorBatchCount - 1, 1);
    updateBatchCountDisplay();
  });
}

if (generatorDownloadButton) {
  generatorDownloadButton.addEventListener('click', () => {
    if (!lastGeneratedTestData) return;
    if (lastGeneratedBatchData.length === 1) {
      downloadGeneratedTestData(lastGeneratedTestData);
    } else {
      downloadBatchTestData(lastGeneratedBatchData);
    }
  });
}

function filterGeneratedDataForRfi(generatedRecord) {
  const rfiData = {};
  expectedFields.forEach((field) => {
    if (field in generatedRecord) {
      rfiData[field] = generatedRecord[field];
    }
  });
  return rfiData;
}

if (generatorInjectButton) {
  generatorInjectButton.addEventListener('click', () => {
    if (!lastGeneratedTestData || !lastGeneratedBatchData.length) return;

    const replaceableCard = getReplaceableSingleEmptySubmissionCard();
    const nextRowCount = replaceableCard
      ? lastGeneratedBatchData.length
      : getCurrentRfiRowCount() + lastGeneratedBatchData.length;

    try {
      validateRfiRowLimit(nextRowCount);
    } catch (error) {
      generatorStatusEl.textContent = error.message;
      return;
    }

    let injectedCount = 0;
    for (const record of lastGeneratedBatchData) {
      const rfiData = filterGeneratedDataForRfi(record);
      const replaced = replaceSingleEmptySubmissionCard(rfiData);
      if (!replaced) {
        createSubmissionCard(rfiData);
      }
      injectedCount++;
    }

    refreshComparisonStateAfterRfiUpdate('RFI submissions updated from generated data. Compare again when ready.');
    setAppView('rfi-inputs');
    const recordText = injectedCount === 1 ? 'record' : `${injectedCount} records`;
    generatorStatusEl.textContent = `Injected ${recordText} for ${lastGeneratedTestData.Identifier} into RFI table.`;
  });
}

compareButton.addEventListener('click', () => {
  const rfis = buildRfiObjects().filter(hasMeaningfulSubmissionData);

  if (!parsedRecords.length) {
    statusEl.textContent = 'Upload a Salesforce export before comparing.';
    return;
  }

  if (!rfis.length) {
    resetResults();
    statusEl.textContent = 'Enter at least one RFI value before comparing.';
    return;
  }

  comparisonResults = selectBestUniqueMatches(rfis, parsedRecords);
  resultsSearchQuery = '';
  renderResults(comparisonResults);
  recordHistoryRun(comparisonResults, rfis.length);
  downloadButton.disabled = false;
  statusEl.textContent = `Compared ${rfis.length} RFI submission(s) against ${parsedRecords.length} Salesforce record(s). Showing the best unique match per RFI.`;
  setAppView('dashboard');
  resultsCard.focus({ preventScroll: true });
  resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

downloadButton.addEventListener('click', () => {
  if (!comparisonResults.length) return;
  downloadCsv(comparisonResults);
});

resetExportButton.addEventListener('click', () => {
  resetExportState();
});

if (resetAllButton) {
  resetAllButton.addEventListener('click', () => {
    resetAllWorkingData();
  });
}

if (appearanceButton && appearancePanel) {
  appearanceButton.addEventListener('click', () => {
    setAppearancePanelOpen(appearancePanel.hidden);
  });

  appearanceOptions.forEach((option) => {
    option.addEventListener('click', () => {
      applyTheme(option.dataset.themeOption);
      setAppearancePanelOpen(false);
    });
  });

  document.addEventListener('click', (event) => {
    if (appearancePanel.hidden) return;
    if (appearancePanel.contains(event.target) || appearanceButton.contains(event.target)) return;
    setAppearancePanelOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setAppearancePanelOpen(false);
    }
  });
}

if (topbarAvatarButton) {
  topbarAvatarButton.addEventListener('click', () => {
    setAppView('profile');
  });
}

topbarViewLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
    event.preventDefault();
    setAppView(link.dataset.view);
  });
});

[profileNameInput, profileRoleInput, profileAvatarInput, profileIdentifierInput].forEach((input) => {
  if (!input) return;
  input.addEventListener('input', () => {
    const nextProfile = getProfileFromInputs();
    renderProfile(nextProfile);
    storeProfile(nextProfile);
    if (input === profileIdentifierInput) {
      generatorIdentifierInput.value = nextProfile.identifier;
    }
  });
});

historyEntriesEl.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-history-action]');
  if (!actionButton) return;

  const entry = historyEntries.find((item) => item.id === actionButton.dataset.historyId);
  if (!entry) return;

  if (actionButton.dataset.historyAction === 'download') {
    downloadCsv(entry.results);
    return;
  }

  openHistoryEntry(entry);
});

resultsContainer.addEventListener('input', (event) => {
  if (event.target.id !== 'results-search-input') return;
  resultsSearchQuery = event.target.value;
  renderResults(comparisonResults);
});

if (notificationsButton && notificationsPanel) {
  notificationsButton.addEventListener('click', () => {
    setNotificationsPanelOpen(notificationsPanel.hidden);
  });

  notificationsListEl?.addEventListener('click', (event) => {
    const activityButton = event.target.closest('[data-notification-history-id]');
    if (!activityButton) return;

    const entry = historyEntries.find((item) => item.id === activityButton.dataset.notificationHistoryId);
    if (!entry) return;

    openHistoryEntry(entry, `Opened recent activity from ${entry.runDateLabel}.`);
  });

  document.addEventListener('click', (event) => {
    if (notificationsPanel.hidden) return;
    if (notificationsPanel.contains(event.target) || notificationsButton.contains(event.target)) return;
    setNotificationsPanelOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setNotificationsPanelOpen(false);
    }
  });
}

if (previewPanel) {
  previewPanel.addEventListener('toggle', updatePreviewToggleLabel);
}

createSubmissionCard({}, null, { skipLimit: true });
const storedProfile = getStoredProfile() || getDefaultProfile();
renderProfile(storedProfile);
if (storedProfile.identifier && generatorIdentifierInput) {
  generatorIdentifierInput.value = storedProfile.identifier;
}
applyTheme(getStoredTheme());
setAppearancePanelOpen(false);
renderResults([]);
renderPreview([]);
renderHistory();
renderNotifications();
updateExportPreview();
updatePreviewToggleLabel();
setGeneratorTimestampPlaceholder();
updateGeneratorIdentifierData();
updateGeneratorEmailPreview();
updateGeneratorSelectionStyles();
updateBatchCountDisplay();
setNotificationsPanelOpen(false);
setRfiInputMode('manual');
setAppView('dashboard');
