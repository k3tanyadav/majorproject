const gulp = require('gulp');
const cssnano = require('gulp-cssnano');
const rev = require('gulp-rev');
const uglify = require( 'gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del =  require('del');

// for minifying the static css files
gulp.task('css', function(done){
    console.log('--------------- minifying css ------------------');

    // compress and rename the css files and store them in 'public/assets'
    gulp.src('./assets/**/*.css')
    .pipe(cssnano())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({//create a manifest(file keeping track of changes made to files names(kinda like package.json))
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
})

// for minifying the static js files
gulp.task('js', function(done){
    console.log('--------------- minifying js ------------------');

    gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
})

// for minifying the static js files
gulp.task('images', function(done){
    console.log('--------------- minifying images ------------------');

    gulp.src('./assets/**/*.+(png|jpg|jpeg|svg|gif)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd : 'public',
        merge : true
    }))
    .pipe(gulp.dest('./public/assets'));

    done();
})

//empty the 'public/assets' directory  
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
})

//task to run all the above tasks one after another
gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function(done){
    console.log('---------------------building assets--------------------');
    done();
})