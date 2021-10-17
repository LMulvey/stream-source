const { build } = require('esbuild');
const chokidar = require('chokidar');
const liveServer = require('live-server');

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
    outfile: 'docs/bundle.js',
  });
  chokidar
    .watch('src/**/*.{ts,tsx}', {
      interval: 0, // No delay
    })
    .on('all', () => {
      builder.rebuild();
    });
  liveServer.start({
    open: true,
    port: +process.env.PORT || 8080,
    root: 'docs',
  });
})();
