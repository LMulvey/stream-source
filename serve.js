const { build } = require('esbuild');
const chokidar = require('chokidar');
const liveServer = require('live-server');
const fs = require('fs-extra');
const path = require('path');
const directory = './docs/js';

async function clearJSFolder() {
  const files = await fs.readdir(directory);
  for (const file of files) {
    await fs.unlink(path.join(directory, file)).catch((err) => {
      if (err) throw err;
    });
  }
}

async function grabBundleName() {
  const files = await fs.readdir(directory);
  const bundleFile = files.find((file) => file.startsWith('bundle-'));
  console.log({ bundleFile, files });
  return bundleFile;
}

async function buildHTML() {
  const bundleName = await grabBundleName();
  fs.readFile('templates/index-template.txt', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log({ bundleName });
    const result = data.replace(/\[BUNDLE-NAME\]/g, bundleName);
    fs.writeFile(`docs/index.html`, result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

// clear once

(async () => {
  // `esbuild` bundler for JavaScript / TypeScript.
  const builder = await build({
    bundle: true,
    define: {
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      ),
    },
    entryPoints: ['src/index.tsx'],
    incremental: true,
    minify: process.env.NODE_ENV === 'production',
    entryNames: '[dir]/[name]-[hash]',
    outfile: 'docs/js/bundle.js',
  });
  chokidar
    .watch('src/**/*.{ts,tsx}', {
      interval: 0, // No delay
    })
    .on('all', async () => {
      await clearJSFolder();
      await builder.rebuild();
      await buildHTML();
    });
  liveServer.start({
    open: true,
    port: +process.env.PORT || 8080,
    root: 'docs',
  });
})();
