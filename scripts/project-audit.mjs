import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
const required = ['react', 'react-native', '@react-navigation/native', '@react-navigation/native-stack'];
const missing = required.filter(name => !packageJson.dependencies?.[name]);
if (missing.length) throw new Error(`Missing required dependencies: ${missing.join(', ')}`);

const requiredPaths = [
  'App.tsx',
  'index.js',
  'android/settings.gradle',
  'android/app/build.gradle',
  'android/app/src/main/AndroidManifest.xml',
  'src/navigation/AppNavigator.tsx'
];
for (const relativePath of requiredPaths) {
  await readFile(path.join(root, relativePath));
}

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (['node_modules', '.git', 'build'].includes(entry.name)) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(fullPath));
    else files.push(fullPath);
  }
  return files;
}

const blockedScope = ['@', 'ex', 'po'].join('');
const blockedPackage = ['ex', 'po'].join('');
const blockedEnvPrefix = ['EX', 'PO', '_'].join('');
const textFiles = (await walk(root)).filter(file => !/\.(png|jpe?g|jar|keystore|zip)$/i.test(file));
const matches = [];
for (const file of textFiles) {
  const source = await readFile(file, 'utf8');
  const hasBlockedImport = source.includes(blockedScope) ||
    new RegExp(`[\\\"']${blockedPackage}(?:[-/]|[\\\"'])`, 'i').test(source) ||
    source.includes(blockedEnvPrefix);
  if (hasBlockedImport) matches.push(path.relative(root, file));
}
if (matches.length) throw new Error(`Disallowed framework references: ${matches.join(', ')}`);

console.log('Project audit passed. Native application shell and source tree are complete.');
