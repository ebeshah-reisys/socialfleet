var gulp = require('gulp');
var webserver = require('gulp-webserver');
var mainBowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var del = require('del');

var paths ={
    temp:'temp',
    tempvendor:'temp/vendor',
    index:'app/index.html',
    tempIndex:'temp/index.html',
    appSrc: ['app/**/*','!app/index.html'],
    bowerSrc: 'bower_componens/**/*'
}
gulp.task('default', ['watch']);

gulp.task('scripts', function () {

    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    return gulp.src(paths.tempIndex)
    .pipe(inject(appFiles,{
        relative:true
    }))
    .pipe(gulp.dest(paths.temp));
});

gulp.task('vendors', function () {
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempvendor));
    return  gulp.src(paths.tempIndex)
    .pipe(inject(tempVendors,{relative:true, name:'verndorInject'}))
    .pipe(gulp.dest(paths.temp));
});

gulp.task('copyAll', function () {
    var tempVendors = gulp.src(mainBowerFiles()).pipe(gulp.dest(paths.tempvendor));
    var appFiles = gulp.src(paths.appSrc).pipe(gulp.dest(paths.temp));

    return gulp.src(paths.index)
    .pipe(gulp.dest(paths.temp))
    .pipe(inject(tempVendors,{relative:true, name:'verndorInject'}))
    .pipe(inject(appFiles,{relative:true}))
    .pipe(gulp.dest(paths.temp));
});

gulp.task('serve',['copyAll'], function () {
        console.log("setting proxies ...")
    gulp.src(paths.temp)
    .pipe(webserver({
        livereload: true,
        proxies: [{
            source: '/api',
            target: 'http://localhost:1337'
        }],
        port: 8080
    }));
    console.log("set proxies successfully!")
});
gulp.task('watch',['serve'], function () {
    gulp.watch(paths.appSrc, ['scripts']);
    gulp.watch(paths.bowerSrc, ['vendors']);
    gulp.watch(paths.index, ['copyAll']);
});

