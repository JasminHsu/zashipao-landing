const test = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');
const context = { exports: {}, Intl, Date };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/weeklyTasks.ts','utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText, context);
const week = context.exports.taipeiWeek;
const zonedWeek = context.exports.weekStartInTimeZone;
const selectedWeek = context.exports.weekStartFromDate;
const moveWeek = context.exports.moveWeek;
test('Taiwan Monday boundary is independent of US Sunday', () => {
 assert.equal(week(new Date('2026-11-08T15:59:59Z')), '2026-11-02');
 assert.equal(week(new Date('2026-11-08T16:00:00Z')), '2026-11-09');
});
test('next week and year boundary', () => {
 assert.equal(week(new Date('2026-12-31T12:00:00Z')), '2026-12-28');
 assert.equal(week(new Date('2026-12-31T12:00:00Z'),1), '2027-01-04');
});
test('week boundary follows the selected timezone', () => {
 assert.equal(zonedWeek(new Date('2026-11-09T06:00:00Z'), 'America/Los_Angeles'), '2026-11-02');
 assert.equal(zonedWeek(new Date('2026-11-09T08:00:00Z'), 'America/Los_Angeles'), '2026-11-09');
});
test('selected calendar dates normalize to Monday', () => {
 assert.equal(selectedWeek('2026-11-15'), '2026-11-09');
 assert.equal(selectedWeek('2026-11-18'), '2026-11-16');
});
test('week navigation supports dates well beyond next week', () => {
 assert.equal(moveWeek('2026-11-09', 5), '2026-12-14');
 assert.equal(moveWeek('2026-11-09', -2), '2026-10-26');
});
