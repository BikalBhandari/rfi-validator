const fileInput = document.getElementById('file-input');
const compareButton = document.getElementById('compare-button');
const downloadButton = document.getElementById('download-button');
const resetExportButton = document.getElementById('reset-export-button');
const resetAllButton = document.getElementById('reset-all-button');
const dashboardUploadRfiButton = document.getElementById('dashboard-upload-rfi-button');
const dashboardOpenRfiButton = document.getElementById('dashboard-open-rfi-button');
const dashboardUploadSalesforceButton = document.getElementById('dashboard-upload-salesforce-button');
const dashboardOpenSalesforceButton = document.getElementById('dashboard-open-salesforce-button');
const appearanceButton = document.getElementById('appearance-button');
const appearancePanel = document.getElementById('appearance-panel');
const appearanceOptions = Array.from(document.querySelectorAll('[data-theme-option]'));
const dashboardView = document.getElementById('dashboard-view');
const dashboardPageTitleEl = document.getElementById('dashboard-page-title');
const dashboardPageSubtitleEl = document.getElementById('dashboard-page-subtitle');
const dashboardEmptyStateEl = document.getElementById('dashboard-empty-state');
const dashboardEmptyStartButton = document.getElementById('dashboard-empty-start-button');
const validationView = document.getElementById('validation-view');
const rfiInputsView = document.getElementById('rfi-inputs-view');
const resultsView = document.getElementById('results-view');
const resultsWorkspaceTabButtons = Array.from(document.querySelectorAll('.results-workspace-tab'));
const resultsRfiContainer = document.getElementById('results-rfi-container');
const resultsSalesforceContainer = document.getElementById('results-salesforce-container');
const resultsOpenRfiPageButton = document.getElementById('results-open-rfi-page-button');
const resultsOpenSalesforcePageButton = document.getElementById('results-open-salesforce-page-button');
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
const validationProgressFillEl = document.getElementById('validation-progress-fill');
const validationStepRfiEl = document.getElementById('validation-step-rfi');
const validationStepSalesforceEl = document.getElementById('validation-step-salesforce');
const validationStepCompareEl = document.getElementById('validation-step-compare');
const validationStepRfiTitleEl = document.getElementById('validation-step-rfi-title');
const validationStepSalesforceTitleEl = document.getElementById('validation-step-salesforce-title');
const validationStepCompareTitleEl = document.getElementById('validation-step-compare-title');
const validationStepRfiDetailEl = document.getElementById('validation-step-rfi-detail');
const validationStepSalesforceDetailEl = document.getElementById('validation-step-salesforce-detail');
const validationStepCompareDetailEl = document.getElementById('validation-step-compare-detail');
const previewFileNameEl = document.getElementById('preview-file-name');
const previewFileTypeEl = document.getElementById('preview-file-type');
const previewRecordCountEl = document.getElementById('preview-record-count');
const previewRecognizedFieldsEl = document.getElementById('preview-recognized-fields');
const previewRfiCountEl = document.getElementById('preview-rfi-count');
const previewMissingFieldsEl = document.getElementById('preview-missing-fields');
const previewRowCountEl = document.getElementById('preview-row-count');
const previewReadyStateEl = document.getElementById('preview-ready-state');
const previewDiagnosticsNoteEl = document.getElementById('preview-diagnostics-note');
const dashboardChartTitleEl = document.getElementById('dashboard-chart-title');
const dashboardChartModeEl = document.getElementById('dashboard-chart-mode');
const dashboardChartRingEl = document.getElementById('dashboard-chart-ring');
const dashboardChartValueEl = document.getElementById('dashboard-chart-value');
const dashboardChartValueLabelEl = document.getElementById('dashboard-chart-value-label');
const dashboardChartLegendEl = document.getElementById('dashboard-chart-legend');
const dashboardChartCaptionEl = document.getElementById('dashboard-chart-caption');
const dashboardAnalyticsContentEl = document.getElementById('dashboard-analytics-content');
const dashboardStatSubmissionsEl = document.getElementById('dashboard-stat-submissions');
const dashboardStatSubmissionsCopyEl = document.getElementById('dashboard-stat-submissions-copy');
const dashboardStatSalesforceEl = document.getElementById('dashboard-stat-salesforce');
const dashboardStatSalesforceCopyEl = document.getElementById('dashboard-stat-salesforce-copy');
const dashboardStatExactEl = document.getElementById('dashboard-stat-exact');
const dashboardStatExactCopyEl = document.getElementById('dashboard-stat-exact-copy');
const dashboardStatNoMatchEl = document.getElementById('dashboard-stat-no-match');
const dashboardStatNoMatchCopyEl = document.getElementById('dashboard-stat-no-match-copy');
const dashboardFieldBarsEl = document.getElementById('dashboard-field-bars');
const dashboardHealthExactSegmentEl = document.getElementById('dashboard-health-exact-segment');
const dashboardHealthPartialSegmentEl = document.getElementById('dashboard-health-partial-segment');
const dashboardHealthNoMatchSegmentEl = document.getElementById('dashboard-health-no-match-segment');
const dashboardHealthLegendEl = document.getElementById('dashboard-health-legend');
const dashboardHealthProcessedEl = document.getElementById('dashboard-health-processed');
const dashboardAlertsListEl = document.getElementById('dashboard-alerts-list');
const dashboardRunFooterEl = document.getElementById('dashboard-run-footer');
const dashboardRunBadgeEl = document.getElementById('dashboard-run-badge');
const sidebarNav = document.querySelector('.sidebar-nav');
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
const profileSaveButton = document.getElementById('profile-save-button');
const profileSaveStatusEl = document.getElementById('profile-save-status');
const profilePreviewNameEl = document.getElementById('profile-preview-name');
const profilePreviewRoleEl = document.getElementById('profile-preview-role');
const profilePreviewAvatarEl = document.getElementById('profile-preview-avatar');
const previewBodyContainers = [previewContainer, salesforceRecordsContainer, resultsSalesforceContainer].filter(Boolean);
const THEME_STORAGE_KEY = 'rfi-validator-theme';
const PROFILE_STORAGE_KEY = 'rfi-validator-profile';
const DASHBOARD_STATUS_COLOR_FALLBACKS = Object.freeze({
  setup: '#3560d3',
  track: '#e7edf8',
  exact: '#16a34a',
  partial: '#d97706',
  noMatch: '#ef4444',
  warning: '#c45a52'
});

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
let resultsRfiSearchQuery = '';
let lastGeneratedTestData = null;
let lastGeneratedBatchData = [];
let generatorBatchCount = 1;
let activeProfile = null;
let draftProfile = null;
let activeResultsWorkspaceTab = 'results';
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
    return localStorage.getItem(THEME_STORAGE_KEY) || 'asu';
  } catch (error) {
    return 'asu';
  }
}

function setAppearancePanelOpen(isOpen) {
  if (!appearanceButton || !appearancePanel) return;
  appearancePanel.hidden = !isOpen;
  appearanceButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
}

function getActiveAppearanceOption() {
  return appearanceOptions.find((option) => option.getAttribute('aria-checked') === 'true') || appearanceOptions[0] || null;
}

function syncAppearanceOptionTabStops(activeOption = getActiveAppearanceOption()) {
  appearanceOptions.forEach((option) => {
    option.tabIndex = option === activeOption ? 0 : -1;
  });
}

function syncThemeOptions(theme) {
  let activeOption = null;
  appearanceOptions.forEach((option) => {
    const active = option.dataset.themeOption === theme;
    option.classList.toggle('active', active);
    option.setAttribute('aria-checked', active ? 'true' : 'false');
    if (active) {
      activeOption = option;
    }
  });

  syncAppearanceOptionTabStops(activeOption);
}

function applyTheme(theme) {
  const requestedTheme = theme === 'funky' ? 'asu' : theme;
  const nextTheme = ['light', 'dark', 'retro', 'vintage', 'asu'].includes(requestedTheme) ? requestedTheme : 'asu';
  document.body.dataset.theme = nextTheme;
  syncThemeOptions(nextTheme);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  } catch (error) {
    // Ignore storage failures and keep the in-memory theme.
  }

  updateDashboardChart();
}

function readThemeColorVariable(name, fallback) {
  const value = getComputedStyle(document.body).getPropertyValue(name).trim();
  return value || fallback;
}

function getDashboardStatusColors() {
  return {
    setup: readThemeColorVariable('--dashboard-status-setup', DASHBOARD_STATUS_COLOR_FALLBACKS.setup),
    track: readThemeColorVariable('--dashboard-status-track', DASHBOARD_STATUS_COLOR_FALLBACKS.track),
    exact: readThemeColorVariable('--dashboard-status-exact', DASHBOARD_STATUS_COLOR_FALLBACKS.exact),
    partial: readThemeColorVariable('--dashboard-status-partial', DASHBOARD_STATUS_COLOR_FALLBACKS.partial),
    noMatch: readThemeColorVariable('--dashboard-status-no-match', DASHBOARD_STATUS_COLOR_FALLBACKS.noMatch),
    warning: readThemeColorVariable('--dashboard-status-warning', DASHBOARD_STATUS_COLOR_FALLBACKS.warning)
  };
}

function focusElement(element) {
  element?.focus({ preventScroll: true });
}

function getSidebarNavigationItems() {
  return [...topbarViewLinks, appearanceButton].filter(Boolean);
}

function moveSidebarNavigationFocus(currentItem, offset) {
  const items = getSidebarNavigationItems();
  const currentIndex = items.indexOf(currentItem);
  if (!items.length || currentIndex === -1) return;

  const nextIndex = (currentIndex + offset + items.length) % items.length;
  focusElement(items[nextIndex]);
}

function focusSidebarBoundaryItem(index) {
  const items = getSidebarNavigationItems();
  if (!items.length) return;
  focusElement(items[index]);
}

function handleSidebarNavigationKeydown(event) {
  const currentItem = event.target.closest('.sidebar-link, .sidebar-appearance-button');
  if (!currentItem) return;

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveSidebarNavigationFocus(currentItem, 1);
    return;
  }

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveSidebarNavigationFocus(currentItem, -1);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    focusSidebarBoundaryItem(0);
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    focusSidebarBoundaryItem(getSidebarNavigationItems().length - 1);
  }
}

function focusAppearanceOption(option) {
  focusElement(option);
}

function moveAppearanceOptionSelection(currentOption, offset) {
  const currentIndex = appearanceOptions.indexOf(currentOption);
  if (!appearanceOptions.length || currentIndex === -1) return;

  const nextIndex = (currentIndex + offset + appearanceOptions.length) % appearanceOptions.length;
  const nextOption = appearanceOptions[nextIndex];
  applyTheme(nextOption.dataset.themeOption);
  focusAppearanceOption(nextOption);
}

function selectAppearanceBoundaryOption(index) {
  const option = appearanceOptions[index];
  if (!option) return;
  applyTheme(option.dataset.themeOption);
  focusAppearanceOption(option);
}

function handleAppearanceOptionKeydown(event) {
  const currentOption = event.currentTarget;

  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
    event.preventDefault();
    moveAppearanceOptionSelection(currentOption, 1);
    return;
  }

  if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
    event.preventDefault();
    moveAppearanceOptionSelection(currentOption, -1);
    return;
  }

  if (event.key === 'Home') {
    event.preventDefault();
    selectAppearanceBoundaryOption(0);
    return;
  }

  if (event.key === 'End') {
    event.preventDefault();
    selectAppearanceBoundaryOption(appearanceOptions.length - 1);
    return;
  }

  if (event.key === 'Escape') {
    event.preventDefault();
    setAppearancePanelOpen(false);
    focusElement(appearanceButton);
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

function normalizeSubmissionValues(values = {}) {
  return expectedFields.reduce((normalizedValues, field) => {
    if (field === 'Military Service') {
      normalizedValues[field] = normalizeMilitaryStatus(values[field]) === 'true' ? 'true' : '';
      return normalizedValues;
    }

    if (field === 'Created Date') {
      normalizedValues[field] = normalizeCreatedDateInputValue(values[field]);
      return normalizedValues;
    }

    normalizedValues[field] = String(values[field] || '');
    return normalizedValues;
  }, {});
}

function applySubmissionValuesToCard(card, values = {}) {
  const normalizedValues = normalizeSubmissionValues(values);

  expectedFields.forEach((field) => {
    const input = card.querySelector(`[data-field="${field}"]`);
    if (!input) return;

    if (field === 'Military Service') {
      input.checked = normalizedValues[field] === 'true';
      return;
    }

    input.value = normalizedValues[field];
  });

  return normalizedValues;
}

function submissionValuesMatch(left, right) {
  return expectedFields.every((field) => String(left?.[field] || '') === String(right?.[field] || ''));
}

function requiresExplicitSubmissionSave(card) {
  return card?.dataset.requiresExplicitSave === 'true';
}

function setSavedSubmissionValues(card, values = {}) {
  card.dataset.savedValues = JSON.stringify(normalizeSubmissionValues(values));
}

function getSavedSubmissionValues(card) {
  if (!card?.dataset.savedValues) return normalizeSubmissionValues(getSubmissionValues(card));

  try {
    return normalizeSubmissionValues(JSON.parse(card.dataset.savedValues));
  } catch (error) {
    return normalizeSubmissionValues(getSubmissionValues(card));
  }
}

function getCommittedSubmissionValues(card) {
  return requiresExplicitSubmissionSave(card)
    ? getSavedSubmissionValues(card)
    : normalizeSubmissionValues(getSubmissionValues(card));
}

function setSubmissionDirtyState(card, isDirty) {
  card.dataset.pendingSave = isDirty ? 'true' : 'false';
  card.classList.toggle('submission-row-pending-save', isDirty);

  const saveButton = card.querySelector('.save-submission-button');
  const cancelButton = card.querySelector('.cancel-submission-button');
  const duplicateButton = card.querySelector('.duplicate-submission-button');

  if (saveButton) saveButton.hidden = !isDirty;
  if (cancelButton) cancelButton.hidden = !isDirty;
  if (duplicateButton) duplicateButton.disabled = isDirty;
}

function syncSubmissionDraftState(card) {
  const wasDirty = card?.dataset.pendingSave === 'true';
  if (!requiresExplicitSubmissionSave(card)) {
    setSubmissionDirtyState(card, false);
    return { wasDirty, isDirty: false };
  }

  const isDirty = !submissionValuesMatch(getSubmissionValues(card), getSavedSubmissionValues(card));
  setSubmissionDirtyState(card, isDirty);
  return { wasDirty, isDirty };
}

function getPendingPreloadedEditCount() {
  return getSubmissionCards().filter((card) => card.dataset.pendingSave === 'true').length;
}

function hasPendingPreloadedEdits() {
  return getPendingPreloadedEditCount() > 0;
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

function getComparisonSetupState() {
  const meaningfulRfiCount = getMeaningfulRfiCount();
  const hasRfi = meaningfulRfiCount > 0;
  const hasExport = parsedRecords.length > 0;
  const recognizedFieldCount = hasExport ? fileDiagnostics.recognizedFields : 0;
  const missingFieldCount = hasExport ? fileDiagnostics.missingFields.length : expectedFields.length;

  return {
    meaningfulRfiCount,
    hasRfi,
    hasExport,
    recognizedFieldCount,
    missingFieldCount,
    comparisonReady: hasRfi && hasExport
  };
}

function setResultsWorkspaceTab(tab) {
  const nextTab = ['results', 'rfi', 'salesforce'].includes(tab) ? tab : 'results';
  activeResultsWorkspaceTab = nextTab;

  resultsWorkspaceTabButtons.forEach((button) => {
    const active = button.dataset.resultsWorkspaceTab === nextTab;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  [
    { id: 'results-workspace-panel-results', tab: 'results' },
    { id: 'results-workspace-panel-rfi', tab: 'rfi' },
    { id: 'results-workspace-panel-salesforce', tab: 'salesforce' }
  ].forEach((panelConfig) => {
    const panel = document.getElementById(panelConfig.id);
    if (!panel) return;

    const active = panelConfig.tab === nextTab;
    panel.hidden = !active;
    panel.classList.toggle('active', active);
  });
}

function setAppView(view) {
  const nextView = ['dashboard', 'validation', 'rfi-inputs', 'salesforce-records', 'results', 'test-data-generator', 'history', 'profile'].includes(view)
    ? view
    : 'dashboard';
  dashboardView.hidden = nextView !== 'dashboard';
  if (validationView) {
    validationView.hidden = nextView !== 'validation';
  }
  rfiInputsView.hidden = nextView !== 'rfi-inputs';
  if (resultsView) {
    resultsView.hidden = nextView !== 'results';
  }
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
    name: '',
    role: '',
    avatar: '',
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

function normalizeProfile(profile) {
  return {
    name: String(profile?.name || '').trim(),
    role: String(profile?.role || '').trim(),
    avatar: String(profile?.avatar || '')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, 2),
    identifier: String(profile?.identifier || '').trim()
  };
}

function cloneProfile(profile) {
  return { ...normalizeProfile(profile) };
}

function profilesMatch(left, right) {
  return ['name', 'role', 'avatar', 'identifier'].every((field) => {
    return String(left?.[field] || '') === String(right?.[field] || '');
  });
}

function renderAppliedProfile(profile) {
  const nextProfile = normalizeProfile(profile);
  const nextNameDisplay = nextProfile.name || 'Workspace User';
  const nextRoleDisplay = nextProfile.role || 'Profile not set';
  const nextAvatar = normalizeAvatarInitials(nextProfile.avatar, nextProfile.name);

  if (topbarUserNameEl) topbarUserNameEl.textContent = nextNameDisplay;
  if (topbarUserRoleEl) topbarUserRoleEl.textContent = nextRoleDisplay;
  if (topbarAvatarEl) topbarAvatarEl.textContent = nextAvatar;
}

function renderProfileDraft(profile, { syncInputs = false } = {}) {
  const nextProfile = normalizeProfile(profile);
  const nextNameDisplay = nextProfile.name || 'Workspace User';
  const nextRoleDisplay = nextProfile.role || 'Profile not set';
  const nextAvatar = normalizeAvatarInitials(nextProfile.avatar, nextProfile.name);

  if (syncInputs && profileNameInput) profileNameInput.value = nextProfile.name;
  if (syncInputs && profileRoleInput) profileRoleInput.value = nextProfile.role;
  if (syncInputs && profileAvatarInput) profileAvatarInput.value = nextProfile.avatar;
  if (syncInputs && profileIdentifierInput) profileIdentifierInput.value = nextProfile.identifier;

  if (profilePreviewNameEl) profilePreviewNameEl.textContent = nextNameDisplay;
  if (profilePreviewRoleEl) profilePreviewRoleEl.textContent = nextRoleDisplay;
  if (profilePreviewAvatarEl) profilePreviewAvatarEl.textContent = nextAvatar;
}

function setProfileSaveState(message) {
  if (profileSaveStatusEl) {
    profileSaveStatusEl.textContent = message;
  }

  if (profileSaveButton) {
    profileSaveButton.disabled = profilesMatch(draftProfile, activeProfile);
  }
}

function renderProfile(profile) {
  draftProfile = cloneProfile(profile);
  renderProfileDraft(draftProfile, { syncInputs: true });
  renderAppliedProfile(activeProfile || draftProfile);
  const hasSavedProfileValues = Object.values(activeProfile || {}).some((value) => String(value || '').trim());
  setProfileSaveState(hasSavedProfileValues
    ? 'Profile saved locally for this browser.'
    : 'Save profile to update the workspace identity.');
}

function saveProfile() {
  activeProfile = cloneProfile(draftProfile);
  renderAppliedProfile(activeProfile);
  storeProfile(activeProfile);

  if (generatorIdentifierInput) {
    generatorIdentifierInput.value = activeProfile.identifier;
  }

  updateGeneratorIdentifierData();
  updateGeneratorEmailPreview();
  setProfileSaveState('Profile saved locally for this browser.');
}

function updateProfileDraftFromInputs() {
  draftProfile = getProfileFromInputs();
  renderProfileDraft(draftProfile);
  setProfileSaveState('Unsaved profile changes.');
}

function getProfileFromInputs() {
  return normalizeProfile({
    name: profileNameInput?.value,
    role: profileRoleInput?.value,
    avatar: profileAvatarInput?.value,
    identifier: profileIdentifierInput?.value
  });
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
  const currentName = String(activeProfile?.name || '').trim();
  if (currentName) return currentName;

  const initial = normalizeAvatarInitials(activeProfile?.avatar || '', activeProfile?.name || '');
  return initial && initial !== 'U' ? `User ${initial}` : 'Workspace user';
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
  setResultsWorkspaceTab('results');
  setAppView('results');
  resultsCard.focus({ preventScroll: true });
  resultsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderHistory() {
  if (!historyEntries.length) {
    historyEntriesEl.innerHTML = `
      <tr>
        <td colspan="9" class="history-empty-row">No validation runs yet. Run a comparison to populate history.</td>
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

  if (hasPendingPreloadedEdits()) {
    workflowSummaryEl.textContent = 'Save or cancel pending edits in preloaded RFI rows before running comparison.';
    return;
  }

  if (!parsedRecords.length) {
    if (!meaningfulRfiCount) {
      workflowSummaryEl.textContent = 'Import RFI bulk data or enter at least one row in RFI Inputs, then upload a Salesforce export to enable comparison.';
      return;
    }

    workflowSummaryEl.textContent = `${readyLabel} ready. Upload a Salesforce export from Compare or Salesforce Records to enable comparison.`;
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

function renderDashboardChartLegend(items) {
  if (!dashboardChartLegendEl) return;

  dashboardChartLegendEl.innerHTML = items.map((item) => `
    <div class="dashboard-chart-legend-row">
      <span class="dashboard-chart-swatch" style="--chart-swatch:${escapeHtml(item.color)}"></span>
      <div class="dashboard-chart-legend-copy">
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(item.detail)}</span>
      </div>
      <strong class="dashboard-chart-legend-value">${escapeHtml(item.value)}</strong>
    </div>
  `).join('');
}

function getDashboardFieldLabel(field) {
  if (field === 'Created Date') return 'RFI Date';
  if (field === 'Military Service') return 'Military';
  if (field === 'ASUO Origin URL') return 'Origin URL';
  return field;
}

function renderDashboardFieldRecognition() {
  if (!dashboardFieldBarsEl) return;
  const isInactive = parsedRecords.length === 0;

  const rows = expectedFields.map((field) => {
    const isRecognized = !fileDiagnostics.missingFields.includes(field);
    const fillWidth = isInactive ? 100 : (isRecognized ? 100 : 1);
    const toneClass = isInactive ? 'inactive' : (isRecognized ? 'recognized' : 'missing');
    const percent = isInactive ? '0%' : (isRecognized ? '100%' : '0%');

    return `
      <div class="dashboard-field-row ${toneClass}">
        <div class="dashboard-field-row-top">
          <span class="dashboard-field-name">${escapeHtml(getDashboardFieldLabel(field).toUpperCase())}</span>
          <span class="dashboard-field-percent">${percent}</span>
        </div>
        <div class="dashboard-field-meter">
          <span class="dashboard-field-meter-fill ${toneClass}" style="width:${fillWidth}%"></span>
        </div>
      </div>
    `;
  }).join('');

  dashboardFieldBarsEl.innerHTML = rows;
}

function renderDashboardHealthLegend(items) {
  if (!dashboardHealthLegendEl) return;

  dashboardHealthLegendEl.innerHTML = items.map((item) => `
    <span class="dashboard-health-legend-item">
      <span class="dashboard-health-dot ${escapeHtml(item.tone)}"></span>
      <span>${escapeHtml(item.label)}</span>
    </span>
  `).join('');
}

function renderDashboardAlerts(alerts) {
  if (!dashboardAlertsListEl) return;

  if (!alerts.length) {
    dashboardAlertsListEl.innerHTML = `
      <div class="dashboard-alert-row neutral">
        <span class="dashboard-alert-tag">READY</span>
        <span class="dashboard-alert-message">No issues are currently blocking attention.</span>
        <span class="dashboard-alert-status">Stable</span>
      </div>
    `;
    return;
  }

  dashboardAlertsListEl.innerHTML = alerts.map((alert) => `
    <div class="dashboard-alert-row ${escapeHtml(alert.tone)}">
      <span class="dashboard-alert-tag">${escapeHtml(alert.tag)}</span>
      <span class="dashboard-alert-message">${escapeHtml(alert.message)}</span>
      <span class="dashboard-alert-status">${escapeHtml(alert.status)}</span>
    </div>
  `).join('');
}

function updateDashboardEmptyState() {
  const { hasRfi, hasExport } = getComparisonSetupState();
  const isInactive = comparisonResults.length === 0 && !hasRfi && !hasExport;

  if (dashboardPageTitleEl) {
    dashboardPageTitleEl.textContent = isInactive ? 'Dashboard Overview' : 'Dashboard';
  }
  if (dashboardPageSubtitleEl) {
    dashboardPageSubtitleEl.textContent = isInactive
      ? 'System idle. Connect a data source to begin analysis.'
      : 'Comparison health, export readiness, and review attention from the current session.';
  }
  if (dashboardEmptyStateEl) {
    dashboardEmptyStateEl.hidden = !isInactive;
  }
  if (dashboardAnalyticsContentEl) {
    dashboardAnalyticsContentEl.hidden = isInactive;
  }

  dashboardView?.classList.toggle('dashboard-view-empty', isInactive);
}

function buildResultsSetupEmptyState() {
  const {
    meaningfulRfiCount,
    hasRfi,
    hasExport,
    recognizedFieldCount,
    missingFieldCount,
    comparisonReady
  } = getComparisonSetupState();

  let title = 'No comparison run yet';
  let message = 'Load both datasets in Compare to generate match results, review exceptions, and download a validation export.';
  let primaryAction = { action: 'validation', label: 'Open Compare' };
  let secondaryAction = { action: 'test-data-generator', label: 'Open Data Generator' };

  if (comparisonReady) {
    title = 'Inputs are ready. Run comparison to generate results';
    message = `${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'} and ${parsedRecords.length} Salesforce record${parsedRecords.length === 1 ? '' : 's'} are loaded. Return to Compare to run validation and populate this workspace.`;
    secondaryAction = { action: 'dashboard', label: 'Open Dashboard' };
  } else if (hasRfi && !hasExport) {
    title = 'Salesforce export still needs to be uploaded';
    message = `${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'} ${meaningfulRfiCount === 1 ? 'is' : 'are'} ready. Upload the Salesforce CSV in Compare to unlock matching.`;
    secondaryAction = { action: 'salesforce-records', label: 'Open Salesforce Records' };
  } else if (!hasRfi && hasExport) {
    title = 'RFI input data still needs to be added';
    message = `${parsedRecords.length} Salesforce record${parsedRecords.length === 1 ? '' : 's'} ${parsedRecords.length === 1 ? 'is' : 'are'} loaded with ${recognizedFieldCount}/${expectedFields.length} expected fields detected. Add RFI rows before running comparison.`;
    secondaryAction = { action: 'rfi-inputs', label: 'Open RFI Inputs' };
  }

  const steps = [
    {
      done: hasRfi,
      title: 'RFI inputs',
      detail: hasRfi
        ? `${meaningfulRfiCount} row${meaningfulRfiCount === 1 ? '' : 's'} prepared`
        : 'Import a CSV or enter manual rows'
    },
    {
      done: hasExport,
      title: 'Salesforce export',
      detail: hasExport
        ? `${parsedRecords.length} row${parsedRecords.length === 1 ? '' : 's'} loaded`
        : 'Upload the latest Salesforce CSV'
    },
    {
      done: false,
      title: 'Comparison run',
      detail: comparisonReady
        ? 'Ready to run from Compare'
        : `Unlocks after both datasets are ready${hasExport && missingFieldCount ? ` (${missingFieldCount} field${missingFieldCount === 1 ? '' : 's'} still missing)` : ''}`
    }
  ];

  return `
    <div class="results-empty-shell">
      <div class="results-empty-hero">
        <div class="results-empty-copy">
          <p class="section-label">Before Results</p>
          <h2>${escapeHtml(title)}</h2>
          <p>${escapeHtml(message)}</p>
        </div>
        <div class="results-empty-actions">
          <button class="primary-button results-empty-action-button" type="button" data-results-empty-action="${escapeHtml(primaryAction.action)}">${escapeHtml(primaryAction.label)}</button>
          <button class="ghost-button results-empty-action-button" type="button" data-results-empty-action="${escapeHtml(secondaryAction.action)}">${escapeHtml(secondaryAction.label)}</button>
        </div>
      </div>
      <div class="results-empty-step-grid">
        ${steps.map((step, index) => `
          <article class="results-empty-step${step.done ? ' is-complete' : ''}">
            <span class="results-empty-step-badge">${step.done ? '✓' : index + 1}</span>
            <div class="results-empty-step-copy">
              <strong>${escapeHtml(step.title)}</strong>
              <p>${escapeHtml(step.detail)}</p>
            </div>
          </article>
        `).join('')}
      </div>
    </div>
  `;
}

function updateDashboardSummary({
  meaningfulRfiCount,
  exactMatchCount,
  partialMatchCount,
  noMatchCount,
  totalResults,
  hasExport,
  comparisonReady,
  readinessScore
}) {
  const exactRate = totalResults ? Math.round((exactMatchCount / totalResults) * 100) : 0;
  const processedTotal = totalResults || meaningfulRfiCount;
  const alerts = [];

  if (dashboardStatSubmissionsEl) {
    dashboardStatSubmissionsEl.textContent = String(meaningfulRfiCount);
  }
  if (dashboardStatSubmissionsCopyEl) {
    dashboardStatSubmissionsCopyEl.textContent = `${meaningfulRfiCount} RFI row${meaningfulRfiCount === 1 ? '' : 's'} prepared`;
  }
  if (dashboardStatSalesforceEl) {
    dashboardStatSalesforceEl.textContent = String(parsedRecords.length);
  }
  if (dashboardStatSalesforceCopyEl) {
    dashboardStatSalesforceCopyEl.textContent = `${parsedRecords.length} Salesforce row${parsedRecords.length === 1 ? '' : 's'} loaded`;
  }
  if (dashboardStatExactEl) {
    dashboardStatExactEl.textContent = String(exactMatchCount);
  }
  if (dashboardStatExactCopyEl) {
    dashboardStatExactCopyEl.textContent = totalResults ? `${exactRate}% match rate` : 'No comparison run yet';
  }
  if (dashboardStatNoMatchEl) {
    dashboardStatNoMatchEl.textContent = String(noMatchCount);
  }
  if (dashboardStatNoMatchCopyEl) {
    dashboardStatNoMatchCopyEl.textContent = totalResults ? 'No record in export' : 'Awaiting comparison';
  }

  renderDashboardFieldRecognition();

  const exactPercent = totalResults ? Math.round((exactMatchCount / processedTotal) * 100) : 0;
  const partialPercent = totalResults ? Math.round((partialMatchCount / processedTotal) * 100) : 0;
  const noMatchPercent = totalResults ? Math.max(0, 100 - exactPercent - partialPercent) : 0;

  if (dashboardHealthExactSegmentEl) {
    dashboardHealthExactSegmentEl.style.width = `${exactPercent}%`;
  }
  if (dashboardHealthPartialSegmentEl) {
    dashboardHealthPartialSegmentEl.style.width = `${partialPercent}%`;
  }
  if (dashboardHealthNoMatchSegmentEl) {
    dashboardHealthNoMatchSegmentEl.style.width = `${noMatchPercent}%`;
  }

  renderDashboardHealthLegend([
    { tone: 'exact', label: `Exact ${exactPercent}%` },
    { tone: 'partial', label: `Partial ${partialPercent}%` },
    { tone: 'none', label: `No match ${noMatchPercent}%` }
  ]);

  if (dashboardHealthProcessedEl) {
    dashboardHealthProcessedEl.textContent = totalResults
      ? `${processedTotal} of ${processedTotal} processed`
      : `${processedTotal} staged for comparison`;
  }

  const firstNoMatch = comparisonResults.find((result) => result.status === 'No match');
  if (firstNoMatch) {
    alerts.push({
      tone: 'negative',
      tag: `RFI-${String(firstNoMatch.submissionNumber).padStart(3, '0')}`,
      message: 'No record found in Salesforce export',
      status: 'No match'
    });
  }

  if (fileDiagnostics.missingFields.length) {
    alerts.push({
      tone: 'warning',
      tag: 'FIELD',
      message: `${fileDiagnostics.missingFields.map(getDashboardFieldLabel).join(', ')} not recognized in current export`,
      status: 'Missing field'
    });
  }

  if (!meaningfulRfiCount) {
    alerts.push({
      tone: 'warning',
      tag: 'INPUT',
      message: 'No RFI submissions are prepared for comparison yet',
      status: 'Need RFI data'
    });
  }

  if (!hasExport) {
    alerts.push({
      tone: 'negative',
      tag: 'EXPORT',
      message: 'No Salesforce export has been uploaded in this session',
      status: 'Need export'
    });
  }

  renderDashboardAlerts(alerts.slice(0, 3));

  if (dashboardRunFooterEl) {
    dashboardRunFooterEl.textContent = totalResults
      ? `Current readiness: ${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'} and ${parsedRecords.length} Salesforce row${parsedRecords.length === 1 ? '' : 's'} loaded`
      : `Current readiness: ${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'} and ${parsedRecords.length} Salesforce row${parsedRecords.length === 1 ? '' : 's'} loaded`;
  }

  if (dashboardRunBadgeEl) {
    const hasWorkingData = meaningfulRfiCount > 0 || parsedRecords.length > 0 || totalResults > 0;
    dashboardRunBadgeEl.textContent = hasWorkingData ? 'Start New' : 'Awaiting inputs';
    dashboardRunBadgeEl.disabled = !hasWorkingData;
  }
}

function updateDashboardChart() {
  if (!dashboardChartRingEl || !dashboardChartValueEl || !dashboardChartValueLabelEl) return;

  updateDashboardEmptyState();
  const dashboardColors = getDashboardStatusColors();

  const meaningfulRfiCount = getMeaningfulRfiCount();
  const exactMatchCount = comparisonResults.filter((result) => result.status === 'Exact match').length;
  const partialMatchCount = comparisonResults.filter((result) => result.status === 'Partial match').length;
  const noMatchCount = comparisonResults.filter((result) => result.status === 'No match').length;
  const totalResults = comparisonResults.length;

  if (totalResults) {
    const exactPercent = Math.round((exactMatchCount / totalResults) * 100);
    const partialPercent = Math.round((partialMatchCount / totalResults) * 100);
    const noMatchPercent = Math.max(0, 100 - exactPercent - partialPercent);
    const chartAccentColor = exactPercent > 0
      ? dashboardColors.exact
      : partialPercent > 0
        ? dashboardColors.partial
        : dashboardColors.noMatch;

    dashboardChartTitleEl.textContent = 'Readiness Overview';
    dashboardChartValueEl.textContent = `${exactPercent}%`;
    dashboardChartValueLabelEl.textContent = 'MATCH';
    dashboardChartValueLabelEl.style.color = dashboardColors.exact;
    dashboardChartRingEl.style.setProperty('--dashboard-chart-fill', String(exactPercent));
    dashboardChartRingEl.style.setProperty('--dashboard-chart-color', chartAccentColor);
    dashboardChartRingEl.style.setProperty('--dashboard-chart-track', dashboardColors.track);
    renderDashboardChartLegend([
      { label: 'Exact match', detail: '', value: `${exactPercent}%`, color: dashboardColors.exact },
      { label: 'Partial match', detail: '', value: `${partialPercent}%`, color: dashboardColors.partial },
      { label: 'No match', detail: '', value: `${noMatchPercent}%`, color: dashboardColors.noMatch }
    ]);
    updateDashboardSummary({
      meaningfulRfiCount,
      exactMatchCount,
      partialMatchCount,
      noMatchCount,
      hasExport: parsedRecords.length > 0,
      comparisonReady: true,
      totalResults,
      readinessScore: exactPercent
    });
    return;
  }

  const hasRfi = meaningfulRfiCount > 0;
  const hasExport = parsedRecords.length > 0;
  const recognizedRatio = hasExport ? (fileDiagnostics.recognizedFields / expectedFields.length) : 0;
  const readinessScore = Math.round((((hasRfi ? 0.4 : 0) + (hasExport ? 0.4 : 0) + (0.2 * recognizedRatio)) * 100));

  dashboardChartTitleEl.textContent = 'Readiness Overview';
  dashboardChartValueEl.textContent = `${readinessScore}%`;
  dashboardChartValueLabelEl.textContent = 'READY';
  dashboardChartValueLabelEl.style.color = dashboardColors.setup;
  dashboardChartRingEl.style.setProperty('--dashboard-chart-fill', String(readinessScore));
  dashboardChartRingEl.style.setProperty('--dashboard-chart-color', dashboardColors.setup);
  dashboardChartRingEl.style.setProperty('--dashboard-chart-track', dashboardColors.track);
  renderDashboardChartLegend([
    { label: 'RFI inputs', detail: '', value: `${meaningfulRfiCount}`, color: dashboardColors.setup },
    { label: 'Salesforce export', detail: '', value: `${parsedRecords.length}`, color: dashboardColors.setup },
    { label: 'Recognized fields', detail: '', value: `${fileDiagnostics.recognizedFields}/${expectedFields.length}`, color: fileDiagnostics.missingFields.length ? dashboardColors.warning : dashboardColors.setup }
  ]);
  updateDashboardSummary({
    meaningfulRfiCount,
    exactMatchCount,
    partialMatchCount,
    noMatchCount,
    hasExport,
    comparisonReady: isComparisonReady(),
    totalResults,
    readinessScore
  });
}

function isComparisonReady() {
  return parsedRecords.length > 0
    && fileDiagnostics.recognizedFields > 0
    && getMeaningfulRfiCount() > 0;
}

function setValidationProgressStepState(element, isComplete, isActive) {
  if (!element) return;
  element.classList.toggle('is-complete', isComplete);
  element.classList.toggle('is-active', isActive);
}

function updateValidationProgress() {
  const meaningfulRfiCount = getMeaningfulRfiCount();
  const hasRfi = meaningfulRfiCount > 0;
  const hasExport = parsedRecords.length > 0;
  const pendingPreloadedEdits = hasPendingPreloadedEdits();
  const comparisonReady = isComparisonReady() && !pendingPreloadedEdits;
  const completedSteps = Number(hasRfi) + Number(hasExport) + Number(comparisonReady);
  const progressPercent = Math.round((completedSteps / 3) * 100);

  if (validationProgressFillEl) {
    validationProgressFillEl.style.width = `${progressPercent}%`;
  }

  setValidationProgressStepState(validationStepRfiEl, hasRfi, !hasRfi);
  setValidationProgressStepState(validationStepSalesforceEl, hasExport, hasRfi && !hasExport);
  setValidationProgressStepState(validationStepCompareEl, comparisonReady, hasRfi && hasExport && !comparisonReady);

  if (validationStepRfiTitleEl) {
    validationStepRfiTitleEl.textContent = hasRfi ? 'RFI data ready' : 'Add RFI data';
  }

  if (validationStepSalesforceTitleEl) {
    validationStepSalesforceTitleEl.textContent = hasExport ? 'Salesforce export loaded' : 'Upload Salesforce export';
  }

  if (validationStepCompareTitleEl) {
    validationStepCompareTitleEl.textContent = comparisonReady ? 'Ready for comparison' : 'Run comparison';
  }

  if (validationStepRfiDetailEl) {
    validationStepRfiDetailEl.textContent = hasRfi
      ? `${meaningfulRfiCount} RFI submission${meaningfulRfiCount === 1 ? '' : 's'} ready.`
      : 'Upload or enter at least one RFI row.';
  }

  if (validationStepSalesforceDetailEl) {
    validationStepSalesforceDetailEl.textContent = !hasExport
      ? 'Upload the current Salesforce CSV export.'
      : fileDiagnostics.recognizedFields === 0
        ? `${parsedRecords.length} row${parsedRecords.length === 1 ? '' : 's'} uploaded, but field mapping needs review.`
        : fileDiagnostics.missingFields.length
          ? `${parsedRecords.length} row${parsedRecords.length === 1 ? '' : 's'} uploaded with ${fileDiagnostics.missingFields.length} missing field(s).`
          : `${parsedRecords.length} row${parsedRecords.length === 1 ? '' : 's'} uploaded and mapped.`;
  }

  if (validationStepCompareDetailEl) {
    validationStepCompareDetailEl.textContent = comparisonReady
      ? 'Everything is ready. Run comparison now.'
      : pendingPreloadedEdits
        ? 'Save or cancel pending edits on preloaded RFI rows before comparison can run.'
      : !hasRfi && !hasExport
        ? 'Comparison unlocks after both datasets are prepared.'
        : !hasRfi
          ? 'Waiting for RFI data before comparison can run.'
          : !hasExport
            ? 'Waiting for Salesforce export before comparison can run.'
            : fileDiagnostics.recognizedFields === 0
              ? 'Expected export fields must be recognized before comparison can run.'
              : 'Comparison is available with the current uploaded data.';
  }
}

function updateCompareButtonState() {
  const comparisonReady = isComparisonReady();
  const pendingPreloadedEdits = hasPendingPreloadedEdits();

  compareButton.disabled = !comparisonReady || pendingPreloadedEdits;
  updateValidationProgress();
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
    updateDashboardChart();
    return;
  }

  if (hasPendingPreloadedEdits()) {
    setPreviewValidationState('Pending RFI save', 'warning-badge');
    previewDiagnosticsNoteEl.textContent = 'Save or cancel pending edits in preloaded RFI rows before comparing.';
    updateWorkflowSummary();
    updateDashboardChart();
    return;
  }

  if (fileDiagnostics.recognizedFields === 0) {
    setPreviewValidationState('Missing fields', 'error-badge');
    previewDiagnosticsNoteEl.textContent = 'No expected Salesforce comparison fields were recognized in the uploaded file.';
    updateWorkflowSummary();
    updateDashboardChart();
    return;
  }

  if (fileDiagnostics.missingFields.length) {
    setPreviewValidationState('Ready with warnings', 'warning-badge');
    previewDiagnosticsNoteEl.textContent = `Missing expected fields: ${fileDiagnostics.missingFields.join(', ')}.`;
    updateWorkflowSummary();
    updateDashboardChart();
    return;
  }

  setPreviewValidationState(currentPreviewStatus, 'success-badge');
  previewDiagnosticsNoteEl.textContent = `All ${expectedFields.length} expected comparison fields were recognized.`;
  updateWorkflowSummary();
  updateDashboardChart();
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
  renderResultsRfiWorkspace();
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

function createSubmissionCard(values = {}, insertAfterCard = null, { skipLimit = false, requiresExplicitSave = false } = {}) {
  if (!skipLimit) {
    validateRfiRowLimit(getCurrentRfiRowCount() + 1);
  }

  submissionCounter += 1;

  const fragment = submissionTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.submission-row');
  card.dataset.submissionId = String(submissionCounter);
  card.dataset.requiresExplicitSave = requiresExplicitSave ? 'true' : 'false';

  const initialValues = applySubmissionValuesToCard(card, values);
  if (requiresExplicitSave) {
    setSavedSubmissionValues(card, initialValues);
  } else {
    card.dataset.savedValues = '';
  }
  setSubmissionDirtyState(card, false);

  const removeButton = card.querySelector('.remove-submission-button');
  const duplicateButton = card.querySelector('.duplicate-submission-button');
  const saveButton = card.querySelector('.save-submission-button');
  const cancelButton = card.querySelector('.cancel-submission-button');

  duplicateButton.addEventListener('click', () => {
    try {
      createSubmissionCard(getCommittedSubmissionValues(card), card);
    } catch (error) {
      statusEl.textContent = error.message;
      return;
    }

    if (parsedRecords.length) {
      resetResults();
      statusEl.textContent = 'Duplicated an RFI submission. Compare again when ready.';
    }
  });

  if (saveButton) {
    saveButton.addEventListener('click', () => {
      const committedValues = applySubmissionValuesToCard(card, getSubmissionValues(card));
      setSavedSubmissionValues(card, committedValues);
      setSubmissionDirtyState(card, false);
      updateSubmissionControls();

      const remainingPendingEdits = getPendingPreloadedEditCount();
      if (remainingPendingEdits) {
        statusEl.textContent = `Saved this preloaded RFI row. ${remainingPendingEdits} pending edit${remainingPendingEdits === 1 ? '' : 's'} still need to be saved or canceled.`;
        return;
      }

      if (parsedRecords.length) {
        resetResults();
        statusEl.textContent = 'Saved changes to the preloaded RFI row. Compare again to refresh results.';
        return;
      }

      statusEl.textContent = 'Saved changes to the preloaded RFI row.';
    });
  }

  if (cancelButton) {
    cancelButton.addEventListener('click', () => {
      applySubmissionValuesToCard(card, getSavedSubmissionValues(card));
      setSubmissionDirtyState(card, false);
      updateSubmissionControls();

      const remainingPendingEdits = getPendingPreloadedEditCount();
      statusEl.textContent = remainingPendingEdits
        ? `Discarded edits for this row. ${remainingPendingEdits} pending preloaded edit${remainingPendingEdits === 1 ? '' : 's'} still need attention.`
        : 'Discarded unsaved edits for the preloaded RFI row.';
    });
  }

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

function replaceSingleEmptySubmissionCard(record, { requiresExplicitSave = false } = {}) {
  const card = getReplaceableSingleEmptySubmissionCard();
  if (!card) return false;

  card.dataset.requiresExplicitSave = requiresExplicitSave ? 'true' : 'false';
  const committedValues = applySubmissionValuesToCard(card, record);
  if (requiresExplicitSave) {
    setSavedSubmissionValues(card, committedValues);
  } else {
    card.dataset.savedValues = '';
  }
  setSubmissionDirtyState(card, false);

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
  const replacedExistingBlankRow = replaceSingleEmptySubmissionCard(firstRecord, { requiresExplicitSave: true });

  if (!replacedExistingBlankRow) {
    createSubmissionCard(firstRecord, null, { requiresExplicitSave: true });
  }

  remainingRecords.forEach((record) => createSubmissionCard(record, null, { requiresExplicitSave: true }));
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

function handleCommittedSubmissionChange(message = 'RFI submissions changed. Compare again to refresh results.') {
  updateSubmissionControls();
  if (!comparisonResults.length) return;
  resetResults();
  statusEl.textContent = message;
}

function handlePreloadedSubmissionDraftEdit(card) {
  const { wasDirty, isDirty } = syncSubmissionDraftState(card);
  updateSubmissionControls();

  if (!isDirty) {
    if (wasDirty && !hasPendingPreloadedEdits()) {
      statusEl.textContent = 'Preloaded RFI row matches the last saved version.';
    }
    return;
  }

  if (comparisonResults.length) {
    resetResults();
  }
  statusEl.textContent = 'Save or cancel edits to preloaded RFI rows before comparing.';
}

function buildRfiObjects() {
  return getSubmissionCards().map((card, index) => {
    const rfi = { submissionNumber: index + 1 };
    const committedValues = getCommittedSubmissionValues(card);

    expectedFields.forEach((field) => {
      rfi[field] = committedValues[field] || '';
    });

    return rfi;
  });
}

function getFilteredRfiWorkspaceRows() {
  const query = normalizeValue(resultsRfiSearchQuery);
  const rows = buildRfiObjects();
  if (!query) return rows;

  return rows.filter((row) => {
    const searchableValues = [
      row.submissionNumber,
      ...expectedFields.map((field) => displayFieldValue(row, field))
    ];

    return searchableValues.some((value) => normalizeValue(value).includes(query));
  });
}

function renderResultsRfiWorkspace() {
  if (!resultsRfiContainer) return;

  const rows = buildRfiObjects();
  const filteredRows = getFilteredRfiWorkspaceRows();

  if (!rows.length) {
    resultsRfiContainer.innerHTML = `
      <div class="results-workspace-empty-state">
        <p class="section-label">RFI Inputs</p>
        <h3>No RFI rows are available yet</h3>
        <p>Add rows from Compare or open the full RFI Inputs workspace to import a CSV and prepare submissions.</p>
        <div class="results-empty-actions">
          <button class="primary-button results-empty-action-button" type="button" data-results-empty-action="validation">Open Compare</button>
          <button class="ghost-button results-empty-action-button" type="button" data-results-empty-action="rfi-inputs">Open RFI Inputs</button>
        </div>
      </div>
    `;
    return;
  }

  const header = `
    <div class="preview-toolbar">
      <div class="preview-toolbar-copy">
        <strong>Current RFI inputs</strong>
        <span>Showing ${filteredRows.length} of ${rows.length} RFI row${rows.length === 1 ? '' : 's'}</span>
      </div>
      <label class="preview-search-field" for="results-rfi-search-input">
        <span class="preview-search-label">Search RFI rows</span>
        <input
          type="search"
          id="results-rfi-search-input"
          class="preview-search-input results-rfi-search-input"
          placeholder="Search RFI values"
          value="${escapeHtml(resultsRfiSearchQuery)}"
        />
      </label>
    </div>
  `;

  const columns = ['RFI #', 'Created Date', 'First Name', 'Last Name', 'Email', 'Phone Number', 'Military Service', 'ASUO Origin URL'];
  const body = filteredRows.map((row) => `
    <tr>
      <td>${escapeHtml(`#${row.submissionNumber}`)}</td>
      <td>${escapeHtml(displayFieldValue(row, 'Created Date') || '-')}</td>
      <td>${escapeHtml(row['First Name'] || '-')}</td>
      <td>${escapeHtml(row['Last Name'] || '-')}</td>
      <td>${escapeHtml(row['Email'] || '-')}</td>
      <td>${escapeHtml(row['Phone Number'] || '-')}</td>
      <td>${escapeHtml(displayFieldValue(row, 'Military Service') || '-')}</td>
      <td>${escapeHtml(row['ASUO Origin URL'] || '-')}</td>
    </tr>
  `).join('');

  const emptyState = `
    <tr>
      <td colspan="${columns.length}" class="preview-empty-row">No RFI rows match that search.</td>
    </tr>
  `;

  resultsRfiContainer.innerHTML = `
    ${header}
    <div class="table-shell">
      <table class="results-rfi-table">
        <thead>
          <tr>${columns.map((column) => `<th>${escapeHtml(column)}</th>`).join('')}</tr>
        </thead>
        <tbody>${body || emptyState}</tbody>
      </table>
    </div>
    <p>This table mirrors the current RFI values used for comparison.</p>
  `;
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
    if (previewContainer) {
      renderPreviewEmptyState(previewContainer);
    }

    if (salesforceRecordsContainer) {
      renderPreviewEmptyState(salesforceRecordsContainer, 'Upload a Salesforce file to review the imported record grid.');
    }

    if (resultsSalesforceContainer) {
      renderPreviewEmptyState(resultsSalesforceContainer, 'Upload a Salesforce file from Compare or Salesforce Records to review the imported record grid.');
    }
    return;
  }

  if (previewContainer) {
    previewContainer.innerHTML = buildPreviewMarkup(records, 'validation-preview-search-input');
  }

  if (salesforceRecordsContainer) {
    salesforceRecordsContainer.innerHTML = buildPreviewMarkup(records, 'salesforce-records-search-input');
  }

  if (resultsSalesforceContainer) {
    resultsSalesforceContainer.innerHTML = buildPreviewMarkup(records, 'results-salesforce-search-input');
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
          <button class="results-filter-button" type="button" aria-label="Filter results" title="Filter results">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16v2H4V6Zm3 5h10v2H7v-2Zm3 5h4v2h-4v-2Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
  `;

  if (!results.length) {
    resultsContainer.innerHTML = `
      ${buildResultsSetupEmptyState()}
    `;
    updateDashboardChart();
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
    updateDashboardChart();
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
  updateDashboardChart();
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

      if (hasPendingPreloadedEdits()) {
        statusEl.textContent = `Loaded ${parsedRecords.length} Salesforce record(s). Save or cancel pending edits in preloaded RFI rows before comparing.`;
      } else if (getMeaningfulRfiCount()) {
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

if (resultsRfiContainer) {
  resultsRfiContainer.addEventListener('input', (event) => {
    if (!event.target.classList.contains('results-rfi-search-input')) return;
    resultsRfiSearchQuery = event.target.value;
    renderResultsRfiWorkspace();
  });
}

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

submissionsContainer.addEventListener('input', (event) => {
  const card = event.target.closest('.submission-row');
  if (requiresExplicitSubmissionSave(card)) {
    handlePreloadedSubmissionDraftEdit(card);
    return;
  }

  handleCommittedSubmissionChange();
});

submissionsContainer.addEventListener('focusout', (event) => {
  const createdDateInput = event.target.closest('input[data-field="Created Date"]');
  if (!createdDateInput || !submissionsContainer.contains(createdDateInput)) return;

  const normalizedValue = normalizeCreatedDateInputValue(createdDateInput.value);
  if (normalizedValue === createdDateInput.value) return;

  createdDateInput.value = normalizedValue;
  const card = createdDateInput.closest('.submission-row');
  if (requiresExplicitSubmissionSave(card)) {
    handlePreloadedSubmissionDraftEdit(card);
    return;
  }

  handleCommittedSubmissionChange();
});

submissionsContainer.addEventListener('change', (event) => {
  const card = event.target.closest('.submission-row');
  if (requiresExplicitSubmissionSave(card)) {
    handlePreloadedSubmissionDraftEdit(card);
    return;
  }

  handleCommittedSubmissionChange();
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
      const replaced = replaceSingleEmptySubmissionCard(rfiData, { requiresExplicitSave: true });
      if (!replaced) {
        createSubmissionCard(rfiData, null, { requiresExplicitSave: true });
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
  setResultsWorkspaceTab('results');
  setAppView('results');
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
  appearanceButton.addEventListener('click', (event) => {
    const willOpen = appearancePanel.hidden;
    setAppearancePanelOpen(willOpen);

    if (willOpen && event.detail === 0) {
      focusAppearanceOption(getActiveAppearanceOption());
    }
  });

  appearanceOptions.forEach((option) => {
    option.addEventListener('click', (event) => {
      applyTheme(option.dataset.themeOption);
      setAppearancePanelOpen(false);
      if (event.detail === 0) {
        focusElement(appearanceButton);
      }
    });
    option.addEventListener('keydown', handleAppearanceOptionKeydown);
  });

  document.addEventListener('click', (event) => {
    if (appearancePanel.hidden) return;
    if (appearancePanel.contains(event.target) || appearanceButton.contains(event.target)) return;
    setAppearancePanelOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !appearancePanel.hidden) {
      setAppearancePanelOpen(false);
      if (appearancePanel.contains(document.activeElement)) {
        focusElement(appearanceButton);
      }
    }
  });
}

sidebarNav?.addEventListener('keydown', handleSidebarNavigationKeydown);
appearanceButton?.addEventListener('keydown', handleSidebarNavigationKeydown);

if (dashboardUploadRfiButton && rfiCsvInput) {
  dashboardUploadRfiButton.addEventListener('click', () => {
    rfiCsvInput.click();
  });
}

if (dashboardOpenRfiButton) {
  dashboardOpenRfiButton.addEventListener('click', () => {
    setAppView('rfi-inputs');
  });
}

if (dashboardUploadSalesforceButton && fileInput) {
  dashboardUploadSalesforceButton.addEventListener('click', () => {
    fileInput.click();
  });
}

if (dashboardOpenSalesforceButton) {
  dashboardOpenSalesforceButton.addEventListener('click', () => {
    setAppView('salesforce-records');
  });
}

resultsWorkspaceTabButtons.forEach((button) => {
  button.addEventListener('click', () => {
    setResultsWorkspaceTab(button.dataset.resultsWorkspaceTab);
  });
});

if (resultsOpenRfiPageButton) {
  resultsOpenRfiPageButton.addEventListener('click', () => {
    setAppView('rfi-inputs');
  });
}

if (resultsOpenSalesforcePageButton) {
  resultsOpenSalesforcePageButton.addEventListener('click', () => {
    setAppView('salesforce-records');
  });
}

if (dashboardEmptyStartButton) {
  dashboardEmptyStartButton.addEventListener('click', () => {
    setAppView('validation');
  });
}

if (dashboardRunBadgeEl) {
  dashboardRunBadgeEl.addEventListener('click', () => {
    if (dashboardRunBadgeEl.disabled) return;
    resetAllWorkingData();
    setAppView('validation');
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
  input.addEventListener('input', updateProfileDraftFromInputs);
});

if (profileSaveButton) {
  profileSaveButton.addEventListener('click', saveProfile);
}

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

resultsContainer.addEventListener('click', (event) => {
  const actionButton = event.target.closest('[data-results-empty-action]');
  if (!actionButton) return;

  const view = actionButton.dataset.resultsEmptyAction;
  if (!view) return;
  setAppView(view);
});

if (resultsRfiContainer) {
  resultsRfiContainer.addEventListener('click', (event) => {
    const actionButton = event.target.closest('[data-results-empty-action]');
    if (!actionButton) return;

    const view = actionButton.dataset.resultsEmptyAction;
    if (!view) return;
    setAppView(view);
  });
}

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
activeProfile = cloneProfile(storedProfile);
renderProfile(activeProfile);
if (generatorIdentifierInput) {
  generatorIdentifierInput.value = activeProfile.identifier;
}
applyTheme(getStoredTheme());
setAppearancePanelOpen(false);
renderResults([]);
renderPreview([]);
renderResultsRfiWorkspace();
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
setResultsWorkspaceTab('results');
setAppView('dashboard');
