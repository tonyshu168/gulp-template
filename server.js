const browserSync = require('browser-sync');
const bs = browserSync.create();

function serve() {
  bs.init({
    port: 10086,
    files: 'dist/**',
    server: {
      baseDir: ['dist', 'output', 'assets']
    }
  })
}

module.exports = {
  serve
}