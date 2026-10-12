import { copyFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as sass from 'sass';

const root = dirname(fileURLToPath(import.meta.url));
const outDir = join(root, 'dist');
const isDev = process.argv.includes('--dev');

mkdirSync(outDir, { recursive: true });

// Compile SASS (Dart Sass) to CSS.
const sassResult = sass.compile(join(root, 'src', 'styles', 'main.scss'), {
  style: isDev ? 'expanded' : 'compressed',
  sourceMap: isDev,
  sourceMapIncludeSources: isDev,
});
writeFileSync(join(outDir, 'main.css'), sassResult.css);
if (sassResult.sourceMap) {
  writeFileSync(join(outDir, 'main.css.map'), JSON.stringify(sassResult.sourceMap));
}

// Copy static entry point.
copyFileSync(join(root, 'index.html'), join(outDir, 'index.html'));

// Bundle TypeScript with esbuild.
await build({
  entryPoints: [join(root, 'src', 'main.ts')],
  bundle: true,
  outfile: join(outDir, 'main.js'),
  format: 'esm',
  target: ['es2020'],
  minify: !isDev,
  sourcemap: isDev,
  logLevel: 'info',
});

console.log('Build complete.');
