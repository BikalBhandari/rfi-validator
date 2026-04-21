(function initRfiValidatorCore(root, factory) {
  const api = factory();

  if (typeof module === 'object' && module.exports) {
    module.exports = api;
  }

  root.RfiValidatorCore = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, () => {
  const expectedFields = [
    'Created Date',
    'First Name',
    'Last Name',
    'Email',
    'Phone Number',
    'Military Service',
    'ASUO Origin URL'
  ];

  const fieldWeights = {
    'Created Date': 1,
    'First Name': 1.25,
    'Last Name': 1.25,
    'Email': 3,
    'Phone Number': 1.5,
    'Military Service': 0.5,
    'ASUO Origin URL': 1
  };

  const statusPriority = {
    'Exact match': 0,
    'Partial match': 1,
    'No match': 2
  };

  const statusUtilityBase = {
    'Exact match': 3000000,
    'Partial match': 1000000,
    'No match': -1
  };

  function normalizeValue(value) {
    if (!value && value !== 0) return '';
    return String(value).trim().toLowerCase();
  }

  function collapseWhitespace(value) {
    return String(value || '').replace(/\s+/g, ' ').trim();
  }

  function simplifyText(value) {
    return collapseWhitespace(normalizeValue(value))
      .replace(/[^a-z0-9/\s.-]/g, '')
      .trim();
  }

  function normalizePhone(phone) {
    if (!phone) return '';
    return String(phone).replace(/[^0-9]/g, '').replace(/^1/, '');
  }

  function formatNormalizedDate(year, month, day) {
    return `${String(year)}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  function parseExcelSerialDate(value) {
    const serial = Number(value);
    if (!Number.isFinite(serial)) return null;

    const wholeDays = Math.floor(serial);
    if (wholeDays < 0) return null;

    const excelEpochUtc = Date.UTC(1899, 11, 30);
    const parsed = new Date(excelEpochUtc + (wholeDays * 86400000));
    if (Number.isNaN(parsed.getTime())) return null;

    return formatNormalizedDate(
      parsed.getUTCFullYear(),
      parsed.getUTCMonth() + 1,
      parsed.getUTCDate()
    );
  }

  function normalizeDate(value) {
    if (value instanceof Date && !Number.isNaN(value.getTime())) {
      return formatNormalizedDate(value.getFullYear(), value.getMonth() + 1, value.getDate());
    }

    if (typeof value === 'number') {
      const excelDate = parseExcelSerialDate(value);
      if (excelDate) return excelDate;
    }

    const raw = collapseWhitespace(value);
    if (!raw) return '';

    if (/^\d+(?:\.\d+)?$/.test(raw)) {
      const excelDate = parseExcelSerialDate(raw);
      if (excelDate) return excelDate;
    }

    const isoMatch = raw.match(/^(\d{4})[-/](\d{1,2})[-/](\d{1,2})(?:[T\s].*)?$/);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      return formatNormalizedDate(year, month, day);
    }

    const slashMatch = raw.match(/^(\d{1,2})[-/](\d{1,2})[-/](\d{2,4})(?:[T\s].*)?$/);
    if (slashMatch) {
      let [, month, day, year] = slashMatch;
      if (year.length === 2) year = `20${year}`;
      return formatNormalizedDate(year, month, day);
    }

    const parsed = new Date(raw);
    if (Number.isNaN(parsed.getTime())) return normalizeValue(raw);

    const hasExplicitTimezone = /(?:z|gmt|utc|[+-]\d{2}:?\d{2})$/i.test(raw);
    const month = String((hasExplicitTimezone ? parsed.getUTCMonth() : parsed.getMonth()) + 1).padStart(2, '0');
    const day = String(hasExplicitTimezone ? parsed.getUTCDate() : parsed.getDate()).padStart(2, '0');
    const year = String(hasExplicitTimezone ? parsed.getUTCFullYear() : parsed.getFullYear());
    return formatNormalizedDate(year, month, day);
  }

  function formatDateDisplay(value) {
    const normalized = normalizeDate(value);
    const isoMatch = normalized.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (!isoMatch) return collapseWhitespace(value);

    const [, year, month, day] = isoMatch;
    return `${month}/${day}/${year}`;
  }

  function normalizeUrl(value) {
    const raw = collapseWhitespace(value);
    if (!raw) return '';

    let candidate = raw;
    if (!/^[a-z]+:\/\//i.test(candidate)) {
      candidate = `https://${candidate}`;
    }

    try {
      const url = new URL(candidate);
      const hostname = url.hostname.replace(/^www\./, '').toLowerCase();
      const pathname = url.pathname.replace(/\/+$/, '').toLowerCase() || '/';
      return `${hostname}${pathname}`;
    } catch {
      return simplifyText(raw).replace(/^https?\s*\/\//, '').replace(/^www\./, '').replace(/\/+$/, '');
    }
  }

  function normalizeHeaderKey(header) {
    return normalizeValue(header).replace(/[^a-z0-9]/g, '');
  }

  function levenshteinDistance(left, right) {
    const a = String(left || '');
    const b = String(right || '');
    const matrix = Array.from({ length: a.length + 1 }, () => new Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i += 1) matrix[i][0] = i;
    for (let j = 0; j <= b.length; j += 1) matrix[0][j] = j;

    for (let i = 1; i <= a.length; i += 1) {
      for (let j = 1; j <= b.length; j += 1) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        );
      }
    }

    return matrix[a.length][b.length];
  }

  function getSimilarity(left, right) {
    const a = String(left || '');
    const b = String(right || '');
    if (!a || !b) return 0;
    if (a === b) return 1;
    const distance = levenshteinDistance(a, b);
    return 1 - (distance / Math.max(a.length, b.length));
  }

  function normalizeMilitaryStatus(value) {
    const normalized = normalizeValue(value);
    if (!normalized || normalized === 'blank') {
      return '';
    }
    if (normalized === 'false' || normalized === 'no' || normalized === 'n' || normalized === '0' || normalized === 'unchecked') {
      return 'false';
    }
    return 'true';
  }

  function normalizeRfiMilitaryRequirement(value) {
    return normalizeMilitaryStatus(value) === 'true' ? 'true' : '';
  }

  function canonicalFieldName(header) {
    const key = normalizeValue(header);
    const compact = normalizeHeaderKey(header);
    if (
      key.includes('created date') ||
      key.includes('creation date') ||
      key.includes('interaction: created date') ||
      compact === 'createddate' ||
      compact === 'interactioncreateddate' ||
      compact === 'datecreated'
    ) return 'Created Date';
    if (key.includes('first name') || compact === 'firstname' || compact === 'givenname') return 'First Name';
    if (key.includes('last name') || compact === 'lastname' || compact === 'surname' || compact === 'familyname') return 'Last Name';
    if (key.includes('email') || key.includes('e-mail') || compact === 'emailaddress') return 'Email';
    if (key.includes('phone') || compact === 'phonenumber' || compact === 'mobilephone' || compact === 'telephone') return 'Phone Number';
    if (
      key.includes('military service') ||
      key.includes('military status') ||
      compact === 'militaryservice' ||
      compact === 'militarystatus' ||
      compact === 'veteranstatus' ||
      compact === 'military'
    ) return 'Military Service';
    if (
      key.includes('origin url') ||
      key.includes('origin page') ||
      key.includes('source url') ||
      key.includes('landing page') ||
      compact === 'asuooriginurl' ||
      compact === 'asuooriginpageurl' ||
      compact === 'originurl' ||
      compact === 'pageurl'
    ) return 'ASUO Origin URL';
    return header;
  }

  function canonicalizeRecord(record) {
    return Object.keys(record).reduce((acc, key) => {
      const canonicalKey = canonicalFieldName(key);
      acc[canonicalKey] = record[key];
      return acc;
    }, {});
  }

  function parseCsv(text) {
    const rows = [];
    let row = [];
    let cell = '';
    let insideQuotes = false;

    const pushCell = () => {
      row.push(cell.trim());
      cell = '';
    };

    const pushRow = () => {
      pushCell();
      if (row.some((value) => value !== '')) {
        rows.push(row);
      }
      row = [];
    };

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];

      if (char === '"') {
        if (insideQuotes && text[index + 1] === '"') {
          cell += '"';
          index += 1;
          continue;
        }

        insideQuotes = !insideQuotes;
        continue;
      }

      if (char === ',' && !insideQuotes) {
        pushCell();
        continue;
      }

      if ((char === '\n' || char === '\r') && !insideQuotes) {
        pushRow();

        if (char === '\r' && text[index + 1] === '\n') {
          index += 1;
        }

        continue;
      }

      cell += char;
    }

    if (insideQuotes) {
      throw new Error('The CSV file contains an unterminated quoted field.');
    }

    if (cell !== '' || row.length) {
      pushRow();
    }

    if (!rows.length) {
      throw new Error('The CSV file is empty or missing a header row.');
    }

    const headerCells = rows.shift();
    if (!headerCells.length || headerCells.every((header) => !header)) {
      throw new Error('The CSV header row is empty.');
    }

    return rows.map((rowCells, rowIndex) => {
      if (rowCells.length !== headerCells.length) {
        throw new Error(`CSV row ${rowIndex + 2} has ${rowCells.length} column(s); expected ${headerCells.length}.`);
      }

      return headerCells.reduce((acc, key, index) => {
        acc[canonicalFieldName(key)] = rowCells[index] || '';
        return acc;
      }, {});
    });
  }

  function findField(record, fieldName) {
    const field = Object.keys(record).find((key) => key.toLowerCase() === fieldName.toLowerCase());
    if (field) return record[field];
    const alias = Object.keys(record).find((key) => canonicalFieldName(key) === fieldName);
    return alias ? record[alias] : '';
  }

  function displayFieldValue(record, fieldName) {
    const value = findField(record, fieldName);
    if (fieldName === 'Created Date') {
      return formatDateDisplay(value);
    }
    if (fieldName === 'Military Service') {
      const normalized = normalizeMilitaryStatus(value);
      if (normalized === 'true') return 'True';
      if (normalized === 'false') return 'False';
      return 'Blank';
    }
    return value;
  }

  function getEmptyFileDiagnostics() {
    return {
      recognizedFields: 0,
      missingFields: [...expectedFields]
    };
  }

  function calculateFileDiagnostics(records) {
    if (!records.length) return getEmptyFileDiagnostics();

    const headers = new Set();
    records.forEach((record) => {
      Object.keys(record).forEach((key) => headers.add(canonicalFieldName(key)));
    });

    return {
      recognizedFields: expectedFields.filter((field) => headers.has(field)).length,
      missingFields: expectedFields.filter((field) => !headers.has(field))
    };
  }

  function validateRecordCount(records, maxRecords = 500) {
    if (records.length > maxRecords) {
      throw new Error(`The uploaded file contains ${records.length} row(s), which exceeds the ${maxRecords}-row limit.`);
    }
  }

  function buildSubmissionValuesFromRecord(record) {
    return expectedFields.reduce((values, field) => {
      values[field] = findField(record, field) || '';
      return values;
    }, {});
  }

  function normalizeForComparison(field, value) {
    if (field === 'Phone Number') return normalizePhone(value);
    if (field === 'Military Service') return normalizeMilitaryStatus(value);
    if (field === 'Created Date') return normalizeDate(value);
    if (field === 'ASUO Origin URL') return normalizeUrl(value);
    if (field === 'Email') return normalizeValue(value);
    return simplifyText(value);
  }

  function compareFieldValue(field, sourceValue, rfiValue) {
    const normalizedRecord = normalizeForComparison(field, sourceValue);
    const normalizedRfi = field === 'Military Service'
      ? normalizeRfiMilitaryRequirement(rfiValue)
      : normalizeForComparison(field, rfiValue);
    const active = field === 'Military Service'
      ? (normalizedRfi === 'true' || normalizedRecord === 'true')
      : normalizedRfi !== '';

    if (!active) {
      return {
        field,
        sourceValue,
        active,
        matchType: 'inactive',
        score: 0,
        reason: 'No RFI value provided'
      };
    }

    if (!normalizedRecord) {
      return {
        field,
        sourceValue,
        active,
        matchType: 'missing',
        score: 0,
        reason: 'Field missing in Salesforce record'
      };
    }

    if (normalizedRecord === normalizedRfi) {
      return {
        field,
        sourceValue,
        active,
        matchType: 'exact',
        score: 1,
        reason: 'Exact normalized match'
      };
    }

    if (field === 'First Name' || field === 'Last Name') {
      const similarity = getSimilarity(normalizedRecord, normalizedRfi);
      if (similarity >= 0.86 || normalizedRecord.includes(normalizedRfi) || normalizedRfi.includes(normalizedRecord)) {
        return {
          field,
          sourceValue,
          active,
          matchType: 'fuzzy',
          score: similarity || 0.9,
          reason: `Close text match (${Math.round((similarity || 0.9) * 100)}%)`
        };
      }
    }

    if (field === 'ASUO Origin URL') {
      if (normalizedRecord && normalizedRfi && (normalizedRecord.startsWith(normalizedRfi) || normalizedRfi.startsWith(normalizedRecord))) {
        return {
          field,
          sourceValue,
          active,
          matchType: 'fuzzy',
          score: 0.92,
          reason: 'Normalized URL path overlap'
        };
      }
    }

    return {
      field,
      sourceValue,
      active,
      matchType: 'none',
      score: 0,
      reason: 'Values do not align'
    };
  }

  function hasMeaningfulSubmissionData(rfi) {
    return expectedFields.some((field) => {
      if (field === 'Military Service') return normalizeRfiMilitaryRequirement(rfi[field]) !== '';
      return normalizeForComparison(field, rfi[field]) !== '';
    });
  }

  function compareRecord(record, rfi, recordIndex = -1) {
    const fieldMatches = expectedFields.map((field) => compareFieldValue(field, findField(record, field), rfi[field]));
    const activeFields = fieldMatches.filter((item) => item.active);
    const emailField = fieldMatches.find((item) => item.field === 'Email');
    const hasActiveEmail = Boolean(emailField?.active);
    const emailMatchesExactly = emailField?.matchType === 'exact';
    const exactFields = activeFields.filter((item) => item.matchType === 'exact');
    const fuzzyFields = activeFields.filter((item) => item.matchType === 'fuzzy');
    const reviewReasons = activeFields
      .filter((item) => item.matchType === 'none' || item.matchType === 'missing')
      .map((item) => `${item.field}: ${item.reason}`);

    const possibleWeight = activeFields.reduce((total, item) => total + (fieldWeights[item.field] || 1), 0);
    let earnedWeight = exactFields.reduce((total, item) => total + (fieldWeights[item.field] || 1), 0);
    earnedWeight += fuzzyFields.reduce((total, item) => total + ((fieldWeights[item.field] || 1) * 0.7), 0);
    let confidenceScore = possibleWeight ? earnedWeight / possibleWeight : 0;

    let status = 'No match';
    let statusDetail = 'The record did not meet the Phase 2 matching threshold.';

    if (hasActiveEmail && !emailMatchesExactly) {
      confidenceScore = 0;
      reviewReasons.unshift('Email: Exact email match is required when an RFI email is provided.');
    } else if (activeFields.length > 0 && exactFields.length === activeFields.length) {
      status = 'Exact match';
      statusDetail = 'Every active comparison field matched exactly after normalization.';
    } else if (confidenceScore >= 0.82 && (exactFields.length + fuzzyFields.length) >= 2) {
      status = 'Partial match';
      statusDetail = 'The record met the partial-match threshold with exact and close field alignment.';
    } else if (confidenceScore >= 0.45 && (exactFields.length + fuzzyFields.length) >= 1) {
      status = 'Partial match';
      statusDetail = 'The record shows useful overlap, but it still needs manual review.';
    }

    return {
      record,
      recordIndex,
      rfi,
      submissionNumber: rfi.submissionNumber,
      status,
      statusDetail,
      matchedFields: exactFields.map((item) => item.field),
      fuzzyMatchedFields: fuzzyFields.map((item) => item.field),
      reviewReasons,
      activeFieldCount: activeFields.length,
      matchCount: exactFields.length + fuzzyFields.length,
      confidenceScore,
      fieldMatches
    };
  }

  function createUnmatchedResult(rfi) {
    return {
      record: {},
      recordIndex: -1,
      rfi,
      submissionNumber: rfi.submissionNumber,
      status: 'No match',
      statusDetail: 'No unique Salesforce record remained after integrity matching.',
      matchedFields: [],
      fuzzyMatchedFields: [],
      reviewReasons: ['No unique Salesforce record remained after integrity matching.'],
      activeFieldCount: expectedFields.filter((field) => normalizeForComparison(field, rfi[field]) !== '').length,
      matchCount: 0,
      confidenceScore: 0,
      fieldMatches: []
    };
  }

  function getMatchUtility(result) {
    const base = statusUtilityBase[result.status] ?? 0;
    if (base < 0) return base;
    return base + Math.round(result.confidenceScore * 1000) + result.matchCount;
  }

  function createEdge(graph, from, to, capacity, cost, meta = null) {
    const forward = { to, rev: graph[to].length, capacity, cost, flow: 0, meta };
    const backward = { to: from, rev: graph[from].length, capacity: 0, cost: -cost, flow: 0, meta: null };
    graph[from].push(forward);
    graph[to].push(backward);
  }

  function findShortestAugmentingPath(graph, source, sink) {
    const dist = Array(graph.length).fill(Infinity);
    const inQueue = Array(graph.length).fill(false);
    const previous = Array(graph.length).fill(null);
    const queue = [source];
    dist[source] = 0;
    inQueue[source] = true;

    while (queue.length) {
      const node = queue.shift();
      inQueue[node] = false;

      graph[node].forEach((edge, edgeIndex) => {
        if (edge.capacity - edge.flow <= 0) return;
        const nextDist = dist[node] + edge.cost;
        if (nextDist >= dist[edge.to]) return;

        dist[edge.to] = nextDist;
        previous[edge.to] = { node, edgeIndex };
        if (!inQueue[edge.to]) {
          queue.push(edge.to);
          inQueue[edge.to] = true;
        }
      });
    }

    if (!previous[sink]) return null;
    return previous;
  }

  function computeOptimalAssignments(candidateResults, rfis, records) {
    const rfiCount = rfis.length;
    const recordCount = records.length;
    const source = 0;
    const rfiOffset = 1;
    const recordOffset = rfiOffset + rfiCount;
    const sink = recordOffset + recordCount;
    const graph = Array.from({ length: sink + 1 }, () => []);

    rfis.forEach((_, index) => {
      createEdge(graph, source, rfiOffset + index, 1, 0);
      createEdge(graph, rfiOffset + index, sink, 1, 0, { type: 'unmatched', rfiIndex: index });
    });

    records.forEach((_, index) => {
      createEdge(graph, recordOffset + index, sink, 1, 0);
    });

    candidateResults.forEach((result) => {
      const utility = getMatchUtility(result);
      if (utility <= 0) return;
      createEdge(
        graph,
        rfiOffset + (result.submissionNumber - 1),
        recordOffset + result.recordIndex,
        1,
        -utility,
        {
          type: 'match',
          submissionNumber: result.submissionNumber,
          recordIndex: result.recordIndex
        }
      );
    });

    for (let flow = 0; flow < rfiCount; flow += 1) {
      const previous = findShortestAugmentingPath(graph, source, sink);
      if (!previous) break;

      let node = sink;
      while (node !== source) {
        const { node: prevNode, edgeIndex } = previous[node];
        const edge = graph[prevNode][edgeIndex];
        edge.flow += 1;
        graph[node][edge.rev].flow -= 1;
        node = prevNode;
      }
    }

    const selectedResults = [];

    rfis.forEach((rfi, index) => {
      const edges = graph[rfiOffset + index];
      const matchedEdge = edges.find((edge) => edge.meta?.type === 'match' && edge.flow > 0);
      if (!matchedEdge) {
        selectedResults.push(createUnmatchedResult(rfi));
        return;
      }

      const matchedResult = candidateResults.find((result) => (
        result.submissionNumber === matchedEdge.meta.submissionNumber &&
        result.recordIndex === matchedEdge.meta.recordIndex
      ));

      selectedResults.push(matchedResult || createUnmatchedResult(rfi));
    });

    return selectedResults;
  }

  function selectBestUniqueMatches(rfis, records) {
    const candidateResults = rfis.flatMap((rfi) => records.map((record, recordIndex) => compareRecord(record, rfi, recordIndex)));
    return computeOptimalAssignments(candidateResults, rfis, records);
  }

  function sortResults(results) {
    return [...results].sort((left, right) => {
      if (left.submissionNumber !== right.submissionNumber) return left.submissionNumber - right.submissionNumber;
      if (statusPriority[left.status] !== statusPriority[right.status]) return statusPriority[left.status] - statusPriority[right.status];
      if (right.confidenceScore !== left.confidenceScore) return right.confidenceScore - left.confidenceScore;
      return right.matchCount - left.matchCount;
    });
  }

  return {
    buildSubmissionValuesFromRecord,
    calculateFileDiagnostics,
    canonicalFieldName,
    canonicalizeRecord,
    collapseWhitespace,
    compareFieldValue,
    compareRecord,
    displayFieldValue,
    expectedFields,
    findField,
    formatDateDisplay,
    formatNormalizedDate,
    getEmptyFileDiagnostics,
    getSimilarity,
    hasMeaningfulSubmissionData,
    levenshteinDistance,
    normalizeDate,
    normalizeForComparison,
    normalizeHeaderKey,
    normalizeMilitaryStatus,
    normalizeRfiMilitaryRequirement,
    normalizePhone,
    normalizeUrl,
    normalizeValue,
    parseCsv,
    selectBestUniqueMatches,
    simplifyText,
    sortResults
    ,
    validateRecordCount
  };
}));
