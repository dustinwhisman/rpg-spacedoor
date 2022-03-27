const fs = require('fs');

module.exports = function(eleventyConfig) {
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('dist/404/index.html');
          // Provides the 404 content without redirect.
          res.write(content_404);
          // Add 404 http status code in request header.
          res.writeHead(404);
          res.end();
        });
      }
    },
    files: [
      'dist/**/*',
    ],
  });

  eleventyConfig.addWatchTarget('./src/scss/');
  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addPassthroughCopy({ 'src/manifest.json': 'manifest.json' });
  eleventyConfig.addPassthroughCopy({ 'src/splash_icon.png': 'splash_icon.png' });
  eleventyConfig.addPassthroughCopy({ 'src/maskable_icon.png': 'maskable_icon.png' });
  eleventyConfig.addPassthroughCopy({ 'src/service-worker.js': 'service-worker.js' });

  return {
    dir: {
      input: 'src/pages',
      output: 'dist',
      includes: '../partials',
    },
  };
};
