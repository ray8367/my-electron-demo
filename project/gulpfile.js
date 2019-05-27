var gulp = require('gulp'),
    less = require('gulp-less'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    // 热加载（实时刷新）
    connect = require('gulp-connect'),
    // 压缩图片
    imagemin = require('gulp-imagemin'),
    //压缩html
    htmlmin = require('gulp-htmlmin'),
    // es6 转换 es5
    babel = require('gulp-babel')

var open = require('open');

// 编译less
gulp.task('less', function () {
    return (gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('./src/css'))
        .pipe(connect.reload()) //实时刷新
    )
})

// 处理js
gulp.task('js',function(){
    return (gulp.src('./src/js/*.js')
        .pipe(babel())
        .pipe(gulp.dest('./js'))
        .pipe(connect.reload()) //实时刷新
    )
})

// 合并压缩css
gulp.task('css', gulp.series('less', function () {
    return (gulp.src(['./src/css/variable.css','./src/css/base.css','./src/css/*.css'])
        .pipe(concat('style.css'))
        .pipe(gulp.dest('./css'))
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./css'))
        .pipe(connect.reload())
    )
}))



// 压缩图片
gulp.task('imagemin', function () {
    return (gulp.src('./src/test_data/img/**/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('./test_data/img'))
    )
})

// 处理html 
gulp.task('html', function () {
    var options = {
        // removeComments: true, //清除HTML注释
        // collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        // minifyJS: true, //压缩页面JS
        // minifyCSS: true //压缩页面CSS
    };
    return (gulp.src('./src/page/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('./')));
})

// 监听（实时刷新）
gulp.task('serve', function () {
    // 配置服务器选项
    connect.server({
        root: './',
        livereload: true,
        port: 5200,
        host: '0.0.0.0'
    })
    // 自动打开
    open('http://localhost:5200');
    // 监听less 和 css
    gulp.watch('./src/less/**/*.less', gulp.series('css'));
    // 监听js
    gulp.watch('./src/js/*.js',gulp.series('js'));
    gulp.watch('./src/js/*.js',gulp.series('js'));
   
})

// 默认任务
gulp.task('default', gulp.series('less', 'css','js', 'serve', (done) => {
    console.log('编译完成...')
    done();
}))