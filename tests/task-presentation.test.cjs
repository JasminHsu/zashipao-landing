const test = require('node:test');
const assert = require('node:assert/strict');
const ts = require('typescript');
const fs = require('node:fs');
const vm = require('node:vm');

const context = { exports: {}, Date };
vm.runInNewContext(ts.transpileModule(fs.readFileSync('lib/taskPresentation.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS }
}).outputText, context);

test('recurring task title excludes generated occurrence metadata', () => {
  assert.equal(context.exports.taskDisplayTitle({
    title: '練習煮飯｜11/23 這週第3次', weeklyGoalId: 'goal'
  }), '練習煮飯');
});

test('recurring task metadata uses a date range and occurrence number', () => {
  assert.equal(context.exports.recurringTaskMeta({
    title: '練習煮飯｜11/23 這週第3次', weeklyGoalId: 'goal',
    occurrenceWeek: '2026-11-23', occurrenceNumber: 3
  }), '11/23–11/29 · 第 3 次');
});

test('one-time tasks do not receive recurring metadata', () => {
  assert.equal(context.exports.taskDisplayTitle({ title: '打哈哈' }), '打哈哈');
  assert.equal(context.exports.recurringTaskMeta({ title: '打哈哈' }), null);
});

test('legacy result snapshots hide generated weekly suffixes', () => {
  assert.equal(context.exports.snapshotTaskDisplayTitle('練習煮飯｜11/16 這週第1次'), '練習煮飯');
  assert.equal(context.exports.snapshotTaskDisplayTitle('reading for an hour | 11/16 這週第2次'), 'reading for an hour');
  assert.equal(context.exports.snapshotTaskDisplayTitle('自己寫的 | 標題'), '自己寫的 | 標題');
});
