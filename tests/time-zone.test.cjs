const { test } = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');

const exportsObject = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/timeZone.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText, { exports: exportsObject, Intl, Date });

const { formatSessionDate, formatSessionRange, timeZoneAbbreviation } = exportsObject;
const start = '2026-12-02T12:00:00+08:00';
const end = '2026-12-02T12:50:00+08:00';

test('formats one instant on the correct local calendar day', () => {
  assert.match(formatSessionDate(start, 'Asia/Taipei'), /2026\/12\/02/);
  assert.match(formatSessionDate(start, 'America/Los_Angeles'), /2026\/12\/01/);
});

test('session range includes the selected zone abbreviation', () => {
  assert.match(formatSessionRange(start, end, 'America/Los_Angeles'), /20:00–20:50 PST$/);
  assert.match(formatSessionRange(start, end, 'Asia/Taipei'), /12:00–12:50 UTC\+8$/);
});

test('abbreviation reflects daylight saving time', () => {
  assert.equal(timeZoneAbbreviation('America/Los_Angeles', '2026-01-15T12:00:00Z'), 'PST');
  assert.equal(timeZoneAbbreviation('America/Los_Angeles', '2026-07-15T12:00:00Z'), 'PDT');
});
