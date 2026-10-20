import { execFileSync, spawn } from 'node:child_process';
execFileSync(process.execPath, ['scripts/prepare.mjs'], { stdio: 'inherit' });
const server = spawn(
  process.execPath,
  [
    'node_modules/vinext/dist/cli.js',
    'start',
    '--hostname',
    '0.0.0.0',
    '--port',
    process.env.PORT || '3000',
  ],
  { stdio: 'inherit' },
);
for (const signal of ['SIGTERM', 'SIGINT']) process.on(signal, () => server.kill(signal));
server.on('exit', (code) => process.exit(code ?? 0));
