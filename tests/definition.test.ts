import { test } from 'node:test';
import assert from 'node:assert/strict';
import { displayDefinition } from '../lib/definition';

test('source list markers are removed without stripping meaningful underscores or wording', () => {
  assert.equal(displayDefinition('◦_ muito zangado'), 'muito zangado');
  assert.equal(
    displayDefinition('◦diz-se de alguém transtornado'),
    'diz-se de alguém transtornado',
  );
  assert.equal(displayDefinition(' ◦ _ muito zangado '), 'muito zangado');
  assert.equal(displayDefinition('texto_com_sublinhado'), 'texto_com_sublinhado');
  assert.equal(displayDefinition('_ texto'), '_ texto');
  assert.equal(displayDefinition(undefined), '');
});
