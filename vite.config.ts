import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import fs from 'node:fs';
import os from 'node:os';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Custom plugin to ensure Vite resolves and loads local modules in both dev & build
 * even if a parent directory in the file system path contains the '#' character
 * (e.g., "D:/#My Project/...").
 */
function hashPathFixPlugin(): Plugin {
  const extensions = ['', '.tsx', '.ts', '.jsx', '.js', '.css', '.json'];

  function tryResolveFile(basePath: string): string | null {
    for (const ext of extensions) {
      const candidate = basePath + ext;
      if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
        return candidate.replace(/\\/g, '/');
      }
    }
    for (const ext of extensions) {
      if (!ext) continue;
      const indexCandidate = path.join(basePath, 'index' + ext);
      if (fs.existsSync(indexCandidate) && fs.statSync(indexCandidate).isFile()) {
        return indexCandidate.replace(/\\/g, '/');
      }
    }
    return null;
  }

  return {
    name: 'vite-plugin-hash-path-fix',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source.startsWith('\0') || source.includes('?')) return null;

      if (source.startsWith('/src/')) {
        return tryResolveFile(path.join(__dirname, source));
      }

      if ((source.startsWith('./') || source.startsWith('../')) && importer && !importer.startsWith('\0')) {
        const cleanImporter = importer.split('?')[0];
        const dir = path.dirname(cleanImporter);
        return tryResolveFile(path.resolve(dir, source));
      }

      return null;
    },
    load(id) {
      if (id.startsWith('\0') || !id.includes('#') || id.includes('node_modules')) return null;
      const cleanId = id.split('?')[0];
      if (fs.existsSync(cleanId) && fs.statSync(cleanId).isFile()) {
        return fs.readFileSync(cleanId, 'utf-8');
      }
      return null;
    },
  };
}

export default defineConfig({
  cacheDir: path.join(os.tmpdir(), 'vite-cache-ahmad-dzakiudin-portfolio'),
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-dom/client', 'react/jsx-runtime', 'react/jsx-dev-runtime'],
  },
  plugins: [hashPathFixPlugin(), react()],
});
