import 'dotenv/config';
import { mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const url = process.env.DATABASE_URL || 'file:./storage/lexico.db';
if (!url.startsWith('file:')) throw new Error('DATABASE_URL must point to a SQLite file.');
mkdirSync(dirname(resolve(url.slice(5))), { recursive: true });
execFileSync('npx', ['--no-install', 'prisma', 'migrate', 'deploy'], { stdio: 'inherit' });
// Run through tsx so the same importer works in development and the container.
execFileSync('npx', ['--no-install', 'tsx', 'scripts/seed-if-empty.ts'], { stdio: 'inherit' });
