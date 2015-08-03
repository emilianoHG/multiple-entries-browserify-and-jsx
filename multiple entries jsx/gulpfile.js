var gulp = require('gulp');
var glob = require('glob');
var browserify  = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');

gulp.task('transpile-js', function() {
  var dir = './src/views/'; //main files directory
  var dest = './app/public/js'; //output directory
  var files = glob.sync(dir+'*.jsx');

  files.map(function (file) {
    var outfile = file.replace('.jsx','.js').replace(dir, ''); //rename this file
    return browserify({
      entries: file,
      extensions: ['.jsx'], //extension jsx
      debug: true,
      transform: [reactify] //transform jsx to js with reactify
    })
    .bundle()
    .pipe(source(outfile))
    .pipe(gulp.dest(dest))
    })

})

gulp.task('default', ['transpile-js']);
