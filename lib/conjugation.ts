import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { conjugate, initSync } from '@v4nn4/ablaut';

const require = createRequire(import.meta.url);
initSync({
  module: readFileSync(join(dirname(require.resolve('@v4nn4/ablaut')), 'ablaut_bg.wasm')),
});

export type Conjugation = { infinitive: string; gerund: string; pastParticiple: string } & Record<
  string,
  string | string[]
>;
export const groups = [
  {
    name: 'Indicativo',
    tenses: {
      present: 'Presente',
      imperfect: 'Pretérito imperfeito',
      preterite: 'Pretérito perfeito',
      pluperfect: 'Pretérito mais-que-perfeito',
      future: 'Futuro',
    },
  },
  {
    name: 'Conjuntivo',
    tenses: {
      subjunctivePresent: 'Presente',
      subjunctiveImperfect: 'Pretérito imperfeito',
      subjunctiveFuture: 'Futuro',
    },
  },
  {
    name: 'Condicional, imperativo e infinitivo',
    tenses: {
      conditional: 'Condicional',
      imperative: 'Imperativo afirmativo',
      personalInfinitive: 'Infinitivo pessoal',
    },
  },
  {
    name: 'Tempos compostos',
    tenses: {
      perfeitoComposto: 'Indicativo · Pretérito perfeito',
      maisQuePerfeitoComposto: 'Indicativo · Mais-que-perfeito',
      futuroComposto: 'Indicativo · Futuro',
      condicionalComposto: 'Condicional composto',
      conjuntivoPerfeito: 'Conjuntivo · Pretérito perfeito',
      conjuntivoMaisQuePerfeito: 'Conjuntivo · Mais-que-perfeito',
    },
  },
];
export function conjugation(verb: string): Conjugation | null {
  if (!/^[a-záéíóúâêôãõç]{0,37}(ar|er|ir|or|ôr)$/iu.test(verb)) return null;
  try {
    return conjugate(verb.toLowerCase(), 'pt') as Conjugation;
  } catch {
    return null;
  }
}
