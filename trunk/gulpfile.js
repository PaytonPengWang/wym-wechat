const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const notify = require('gulp-notify');

gulp.task('controller',() => {
    return gulp.src('app/controller/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('www/controller'));
})

gulp.task('conf',() => {
    return gulp.src('app/conf/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('www/conf'));
})

gulp.task('lib',() => {
    return gulp.src('app/lib/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('www/lib'));
})



gulp.task('routes',() => {
    return gulp.src('app/routes/**/*.js')
        .pipe(babel())
        .pipe(gulp.dest('www/routes'));
})


gulp.task('app',() => {
    return gulp.src('app/*.js')
        .pipe(babel())
        .pipe(gulp.dest('www'));
})


gulp.task('json',() => {
    return gulp.src('app/package.json')
        .pipe(gulp.dest('www/'))
})

gulp.task('views',()=>{
  return gulp.src('app/views/**/*.html')
        .pipe(gulp.dest('www/views'))
})

gulp.task('css',()=>{
  return gulp.src('app/public/css/**/*.*')
        .pipe(gulp.dest('www/public/css'))
})

gulp.task('pjs',()=>{
  return gulp.src('app/public/js/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('www/public/js'))
})

gulp.task('images',() => {
    return gulp.src('app/public/images/**/*')
    .pipe(gulp.dest('www/public/images'))
})

gulp.task('init',['controller','conf','lib','routes','app','json','views','css','pjs','images']);

gulp.task('default',function(){
    try{
    gulp.watch('app/controller/**/*.js',['controller']);
    gulp.watch('app/public/css/**/*.*',['css']);
    gulp.watch('app/public/images/**/*',['images']);
    gulp.watch('app/conf/**/*.js',['conf']);
    gulp.watch('app/lib/**/*.js',['lib']);
    gulp.watch('app/routes/**/*.js',['routes']);
    gulp.watch('app/app.js',['app']);
    gulp.watch('app/package.json',['json']);
    gulp.watch('app/views/**/*.html',['views']);
    gulp.watch('app/public/js/**/*.js',['pjs']);
    gulp.watch('app/public/*',['site_info'])
  }catch(e){
    console.info(e);
  }
})
