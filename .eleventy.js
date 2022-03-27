module.exports = function(eleventyConfig) {
  eleventyConfig.addWatchTarget('./src/scss/');
  eleventyConfig.addWatchTarget('./src/js/');

  eleventyConfig.addPassthroughCopy({ 'src/manifest.json': 'manifest.json' });
  eleventyConfig.addPassthroughCopy({ 'src/splash_icon.png': 'splash_icon.png' });
  eleventyConfig.addPassthroughCopy({ 'src/maskable_icon.png': 'maskable_icon.png' });

  return {
    dir: {
      input: 'src/pages',
      output: 'dist',
      includes: '../partials',
    },
  };
};
